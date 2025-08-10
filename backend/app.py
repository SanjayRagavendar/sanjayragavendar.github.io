from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
import os
from werkzeug.utils import secure_filename
import numpy as np
import joblib
from models import db, User, BloodTestData, MriPrediction
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import pickle
# from tensorflow.keras.preprocessing.image import load_img, img_to_array
# from tensorflow.keras.models import load_model



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
db.init_app(app)
with app.app_context():
    db.create_all()
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Enable CORS pre-flight requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Secret key for JWT
SECRET_KEY = "adfadf!@#asf2394q1@asdf"  # In production, use a secure key and store it properly


# Create a directory for uploads if it doesn't exist
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

# Load or create mock model
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

# Load the models
with open("clf_status.pkl", "rb") as f:
    clf_status = pickle.load(f)

with open("clf_hist.pkl", "rb") as f:
    clf_hist = pickle.load(f)

# model_stage = load_model("model_stage.h5")

# # Load the image model
# image_model = load_model("image_model.h5")


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    print(data)
    
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # Generate JWT token
        payload = {
            'sub': str(user.id),
            'name': user.first_name + ' ' + user.last_name,
            'email': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.first_name + ' ' + user.last_name
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['sub'])
            if not current_user:
                raise Exception('User not found')
        except Exception as e:
            return jsonify({'error': 'Token is invalid', 'details': str(e)}), 401
        
        return f(*args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

@app.route('/api/process_mri', methods=['POST'])
@token_required
def upload_mri():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    file_type = request.form.get('type')
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    user_data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user_id = user_data['sub']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file_type:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        if file_type == 'image':
            try:
                # Load the model
                model = tf.keras.models.load_model('mri_model.h5')
                
                # Initialize label encoder
                label_encoder = LabelEncoder()
                label_encoder.fit(['Bengin cases', 'Malignant cases', 'Normal cases'])
                
                # Preprocess the image
                def preprocess_new_image(image_path, target_size=(150, 150)):
                    img = load_img(image_path, target_size=target_size)
                    img_array = img_to_array(img) / 255.0
                    img_array = img_array.flatten()
                    return img_array
                
                # Make prediction
                image_array = preprocess_new_image(file_path)
                img_reshaped = image_array.reshape((1, image_array.shape[0], 1))
                prediction = model.predict(img_reshaped)
                predicted_class_index = np.argmax(prediction, axis=1)[0]
                predicted_class = label_encoder.inverse_transform([predicted_class_index])[0]
                probability = float(prediction[0][predicted_class_index])
                
                # Save prediction to database
                mri_pred = MriPrediction(
                    user_id=user_id,
                    file_path=file_path,
                    prediction=predicted_class,
                    probability=probability,
                    timestamp=datetime.datetime.utcnow()
                )
                db.session.add(mri_pred)
                db.session.commit()
                
                return jsonify({
                    'success': True,
                    'message': 'File uploaded and processed successfully',
                    'fileId': filename,
                    'type': file_type,
                    'prediction': predicted_class,
                    'probability': probability
                })
            except Exception as e:
                return jsonify({'error': f'Error processing image: {str(e)}'}), 500
        
        return jsonify({
            'success': True,
            'message': 'File uploaded successfully',
            'fileId': filename,
            'type': file_type
        })
    
    return jsonify({'error': 'Invalid request'}), 400

@app.route('/api/biomarkers', methods=['POST'])
@token_required
def process_biomarkers():
    data = request.json
    try:
        # Prepare input data as a numpy array
        new_data = np.array([
            data.get('proline', 0),
            data.get('lKynurenine', 0),
            data.get('spermidine', 0),
            data.get('aminoHippuricAcid', 0),
            data.get('palmitoylLCarnitine', 0),
            data.get('taurine', 0),
            data.get('phenylalanine', 0),
            data.get('lValine', 0),
            data.get('oTyr', 0),
            data.get('carnitine', 0)
        ]).reshape(1, -1)  # Reshape to 2D array for the scaler
        
        # Scale the input data
        new_data_scaled = scaler.transform(new_data)
        
        # Make predictions using all models
        status_pred = clf_status.predict(new_data_scaled)[0]
        status_prob = clf_status.predict_proba(new_data_scaled)[0][1] if hasattr(clf_status, 'predict_proba') else 0.5
        stage_pred = np.argmax(model_stage.predict(new_data_scaled), axis=1)[0]
        hist_pred = clf_hist.predict(new_data_scaled)[0]
        
        # Determine risk level based on probability
        risk_level = "Low"
        if status_prob > 0.7:
            risk_level = "High"
        elif status_prob > 0.4:
            risk_level = "Medium"
        
        # Get user ID from token
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        user_data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        
        # Save prediction to database
        cancer_data = BloodTestData(
            user_id=user_data['sub'],
            histological_type=str(hist_pred),
            proline=data.get('proline', 0),
            l_kynurenine=data.get('lKynurenine', 0),
            spermidine=data.get('spermidine', 0),
            amino_hippuric_acid=data.get('aminoHippuricAcid', 0),
            palmitoyl_l_carnitine=data.get('palmitoylLCarnitine', 0),
            taurine=data.get('taurine', 0),
            phenylalanine=data.get('phenylalanine', 0),
            l_valine=data.get('lValine', 0),
            o_tyr=data.get('oTyr', 0),
            carnitine=data.get('carnitine', 0),
            prediction=int(status_pred)
        )
        db.session.add(cancer_data)
        db.session.commit()

        return jsonify({
            'success': True,
            'predictionId': f"pred_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}",
            'result': {
            'prediction': int(status_pred),
            'probability': float(status_prob),
            'stage': int(stage_pred),
            'histologicalType': str(hist_pred),
            'riskLevel': risk_level
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # with app.app_context():
    #     user = User(email='test@example.com', first_name='Test', last_name='User')
    #     user.set_password('password123')
    #     db.session.add(user)
    #     db.session.commit()
    app.run(debug=True, port=5000)