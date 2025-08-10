import axios from 'axios';
import { getAuthToken } from './auth';
import { BiomarkerData } from '../components/BiomarkerForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true, // Important for CORS with credentials
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response); // Debug logging
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    throw error;
  }
);

// Submit biomarker data
export const submitBiomarkerData = async (data: BiomarkerData): Promise<any> => {
  try {
    const response = await api.post('/biomarkers', data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to submit biomarker data');
  }
};

// Upload file
export const uploadFile = async (file: File, type: 'blood-test' | 'mri-scan'): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await api.post('/process_mri', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
};

// Get prediction results
export const getPredictionResults = async (predictionId: string): Promise<any> => {
  try {
    const response = await api.get(`/predictions/${predictionId}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to get prediction results');
  }
};