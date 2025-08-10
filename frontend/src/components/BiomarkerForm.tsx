import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { PredictionResult } from './PredictionResult';

interface BiomarkerFormProps {
  onClose: () => void;
  onSubmit: (data: BiomarkerData) => Promise<any>;
}

export interface BiomarkerData {
  proline: number | null;
  lKynurenine: number | null;
  spermidine: number | null;
  aminoHippuricAcid: number | null;
  palmitoylLCarnitine: number | null;
  taurine: number | null;
  phenylalanine: number | null;
  lValine: number | null;
  oTyr: number | null;
  carnitine: number | null;
}

const initialData: BiomarkerData = {
  proline: null,
  lKynurenine: null,
  spermidine: null,
  aminoHippuricAcid: null,
  palmitoylLCarnitine: null,
  taurine: null,
  phenylalanine: null,
  lValine: null,
  oTyr: null,
  carnitine: null
};

export function BiomarkerForm({ onClose, onSubmit }: BiomarkerFormProps) {
  const [formData, setFormData] = useState<BiomarkerData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' 
        ? (value === '' ? null : parseFloat(value))
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await onSubmit(formData);
      setPredictionResult(result.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process biomarker data');
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (predictionResult) {
    return <PredictionResult result={predictionResult} onClose={() => {
      setPredictionResult(null);
      onClose();
    }} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blood Test Biomarkers</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Proline (μmol/L)
                </label>
                <input
                  type="number"
                  name="proline"
                  value={formData.proline ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  L-Kynurenine (μmol/L)
                </label>
                <input
                  type="number"
                  name="lKynurenine"
                  value={formData.lKynurenine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Spermidine (μmol/L)
                </label>
                <input
                  type="number"
                  name="spermidine"
                  value={formData.spermidine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amino-Hippuric Acid (μmol/L)
                </label>
                <input
                  type="number"
                  name="aminoHippuricAcid"
                  value={formData.aminoHippuricAcid ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Palmitoyl-L-Carnitine (μmol/L)
                </label>
                <input
                  type="number"
                  name="palmitoylLCarnitine"
                  value={formData.palmitoylLCarnitine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Taurine (μmol/L)
                </label>
                <input
                  type="number"
                  name="taurine"
                  value={formData.taurine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phenylalanine (μmol/L)
                </label>
                <input
                  type="number"
                  name="phenylalanine"
                  value={formData.phenylalanine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  L-Valine (μmol/L)
                </label>
                <input
                  type="number"
                  name="lValine"
                  value={formData.lValine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  o-Tyr (μmol/L)
                </label>
                <input
                  type="number"
                  name="oTyr"
                  value={formData.oTyr ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Carnitine (μmol/L)
                </label>
                <input
                  type="number"
                  name="carnitine"
                  value={formData.carnitine ?? ''}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}