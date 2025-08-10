import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface PredictionResultProps {
  result: {
    prediction: number;
    probability: number;
    stage: number;
    riskLevel: string;
    histologicalType: string;
  };
  onClose: () => void;
}

export function PredictionResult({ result, onClose }: PredictionResultProps) {
  const { prediction, probability, stage, riskLevel, histologicalType } = result;
  
  const getRiskIcon = () => {
    if (riskLevel === 'High') {
      return <XCircle className="h-12 w-12 text-red-600" />;
    } else if (riskLevel === 'Medium') {
      return <AlertCircle className="h-12 w-12 text-yellow-500" />;
    } else {
      return <CheckCircle className="h-12 w-12 text-green-500" />;
    }
  };
  
  const getRiskColor = () => {
    if (riskLevel === 'High') {
      return 'text-red-600';
    } else if (riskLevel === 'Medium') {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };
  
  const getStageText = () => {
    return `Stage ${stage}`;
  };

  const getStatusText = () => {
    if (histologicalType === "Maligant Tumor") {
      return "Malignant Tumor Detected";
    } else if (prediction === 1) {
      return "Positive";
    }
    return "Negative";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            {getRiskIcon()}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              Prediction Results
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className={`text-center ${getRiskColor()} font-bold text-xl`}>
                {riskLevel} Risk Level
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium">{getStatusText()}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Stage</p>
                <p className="font-medium">{getStageText()}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Histological Type</p>
                <p className="font-medium">{histologicalType}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Risk Assessment</p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    riskLevel === 'High' 
                      ? 'bg-red-600' 
                      : riskLevel === 'Medium' 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${probability * 100}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-right">{(probability * 100).toFixed(1)}%</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recommendation</p>
              <p className="text-sm">
                {riskLevel === 'High' 
                  ? 'Immediate medical attention required. Please consult with an oncologist as soon as possible.'
                  : riskLevel === 'Medium'
                    ? 'Follow-up examination recommended. Schedule a consultation with your healthcare provider.'
                    : 'Continue regular check-ups and maintain healthy lifestyle habits.'}
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}