# LungAI Predict

A professional platform exclusively for healthcare professionals to analyze medical data for early lung cancer detection.

## Features

- Direct biomarker data entry for blood test analysis
- MRI scan upload and analysis
- AI-powered lung cancer prediction
- Secure authentication for healthcare professionals
- Detailed prediction results with risk assessment

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- JWT authentication

### Backend
- Flask Python server
- JWT for authentication
- scikit-learn for ML predictions
- Flask-CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)

### Installation

1. Clone the repository
2. Install frontend dependencies:
```
npm install
```

3. Install backend dependencies:
```
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the Flask backend:
```
cd backend
python app.py
```

2. In a separate terminal, start the React frontend:
```
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Usage

1. Sign in with your healthcare professional credentials
2. Enter blood test biomarker data or upload MRI scans
3. Submit for AI analysis
4. View detailed prediction results and risk assessment

## Security

- JWT authentication ensures only authorized healthcare professionals can access the system
- All API endpoints are protected
- Sensitive data is handled securely

## License

This project is licensed under the MIT License - see the LICENSE file for details.