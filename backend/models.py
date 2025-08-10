from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class BloodTestData(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    histological_type = db.Column(db.Enum("Adenocarcinoma", "Squamous Cell Carcinoma","nil"), nullable=False, default="nil")
    proline = db.Column(db.Float)
    l_kynurenine = db.Column(db.Float)
    spermidine = db.Column(db.Float)
    amino_hippuric_acid = db.Column(db.Float)
    palmitoyl_l_carnitine = db.Column(db.Float)
    taurine = db.Column(db.Float)
    phenylalanine = db.Column(db.Float)
    l_valine = db.Column(db.Float)
    o_tyr = db.Column(db.Float)
    carnitine = db.Column(db.Float)
    prediction = db.Column(db.String(50))

    user = db.relationship('User', backref=db.backref('blood_test_data', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'histologicalType': self.histological_type,
            'proline': self.proline,
            'lKynurenine': self.l_kynurenine,
            'spermidine': self.spermidine,
            'aminoHippuricAcid': self.amino_hippuric_acid,
            'palmitoylLCarnitine': self.palmitoyl_l_carnitine,
            'taurine': self.taurine,
            'phenylalanine': self.phenylalanine,
            'lValine': self.l_valine,
            'oTyr': self.o_tyr,
            'carnitine': self.carnitine,
            'prediction': self.prediction
        }

class MriPrediction(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    prediction = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    user = db.relationship('User', backref=db.backref('mri_prediction', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'prediction': self.prediction,
            'imageUrl': self.image_url
        }

