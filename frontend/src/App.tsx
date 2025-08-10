import React, { useState, useEffect } from 'react';
import { Stethoscope, Upload, FileText, Brain, MessageSquare, ClipboardList } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { FileUpload } from './components/FileUpload';
import { Button } from './components/ui/Button';
import { Login } from './components/Login';
import { Feedback } from './components/Feedback';
import { isAuthenticated, removeAuthToken, getUserInfo } from './services/auth';
import { BiomarkerForm, BiomarkerData } from './components/BiomarkerForm';
import { submitBiomarkerData } from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBiomarkerForm, setShowBiomarkerForm] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = isAuthenticated();
    setIsLoggedIn(authenticated);
    
    if (authenticated) {
      setUserInfo(getUserInfo());
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const handleBiomarkerSubmit = async (data: BiomarkerData) => {
    try {
      return await submitBiomarkerData(data);
    } catch (error) {
      console.error('Failed to submit biomarker data:', error);
      throw error;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => {
      setIsLoggedIn(true);
      setUserInfo(getUserInfo());
    }} />;
  }

  return (
    <div className="min-h-screen bg-red-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-red-600 dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">LungAI Predict</span>
          </div>
          <div className="flex items-center space-x-4">
            {userInfo && (
              <span className="text-white text-sm hidden md:inline-block">
                Welcome, {userInfo.name}
              </span>
            )}
            <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Lung Cancer Prediction
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A professional platform exclusively for healthcare professionals to upload and analyze medical reports for early lung cancer detection
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blood Test Data */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ClipboardList className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold">Blood Test Data</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enter biomarker values from blood test results for AI analysis
              </p>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setShowBiomarkerForm(true)}
              >
                Enter Biomarker Data
              </Button>
            </div>

            {/* MRI Scan Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold">MRI Scans</h2>
              </div>
              <FileUpload 
                acceptedTypes={{
                  'image/*': ['.jpg', '.jpeg', '.png']
                }}
                fileType="mri-scan"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Accepted formats: JPG, JPEG, PNG
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <ClipboardList className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium">Enter Data</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter biomarker values or upload MRI scans
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <Brain className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium">AI Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Advanced AI processes your data
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium">Get Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive detailed analysis
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <Feedback />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2025 LungAI Predict. For Healthcare Professionals Only. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Biomarker Form Modal */}
      {showBiomarkerForm && (
        <BiomarkerForm 
          onClose={() => setShowBiomarkerForm(false)} 
          onSubmit={handleBiomarkerSubmit}
        />
      )}
    </div>
  );
}

export default App;