import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { uploadFile } from '../services/api';
import { PredictionResult } from './PredictionResult';

interface FileUploadProps {
  acceptedTypes?: Record<string, string[]>;
  fileType: 'blood-test' | 'mri-scan';
}

export function FileUpload({ 
  fileType,
  acceptedTypes = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
  } 
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsUploading(true);
    try {
      const file = acceptedFiles[0];
      const result = await uploadFile(file, fileType);
      setUploadSuccess(true);
      setPredictionResult({
        prediction: result.prediction === "Maligant Tumor" ? 1 : 0,
        probability: result.probability,
        stage: 1,
        riskLevel: result.probability > 0.7 ? "High" : result.probability > 0.4 ? "Medium" : "Low",
        histologicalType: result.prediction
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [fileType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    multiple: false,
  });

  const handleClose = () => {
    setPredictionResult(null);
    setUploadSuccess(false);
  };

  return (
    <>
      {predictionResult ? (
        <PredictionResult
          result={predictionResult}
          onClose={handleClose}
        />
      ) : (
        <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                : 'border-gray-300 dark:border-gray-700 hover:border-red-500'
            } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mb-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
              </div>
            ) : uploadSuccess ? (
              <div className="flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 mb-2">
                  <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  File uploaded successfully!
                </p>
                <Button 
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadSuccess(false);
                  }}
                >
                  Upload Another
                </Button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? 'Drop the file here...'
                    : 'Drag & drop file here, or click to select file'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Supported formats: JPG, JPEG, PNG
                </p>
              </>
            )}
          </div>
          
          {uploadError && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              Error: {uploadError}
            </div>
          )}
        </>
      )}
    </>
  );
}