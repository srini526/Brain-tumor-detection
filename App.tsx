
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { analyzeMriScan } from './services/geminiService';
import type { AnalysisResult } from './types';
import { AppStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setStatus(AppStatus.IDLE);
    setAnalysisResult(null);
    setError(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove the data URL prefix
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError('Please select an MRI scan to analyze.');
      return;
    }

    setStatus(AppStatus.ANALYZING);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeMriScan(base64Image);
      setAnalysisResult(result);
      setStatus(AppStatus.RESULT);
    } catch (err) {
      console.error('Analysis failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during analysis.';
      setError(`Analysis Failed: ${errorMessage}`);
      setStatus(AppStatus.ERROR);
    }
  }, [imageFile]);
  
  const handleReset = () => {
    setImageFile(null);
    setImageUrl(null);
    setAnalysisResult(null);
    setError(null);
    setStatus(AppStatus.IDLE);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-blue-900/50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700/50 overflow-hidden">
          <div className="p-8 md:p-12">
            {!imageUrl ? (
              <ImageUploader onImageSelect={handleImageSelect} />
            ) : (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">MRI Scan Preview</h3>
                  <img src={imageUrl} alt="MRI Scan Preview" className="rounded-lg shadow-lg max-h-80 object-contain border-2 border-gray-600" />
                </div>
                <div className="flex flex-col justify-center items-center h-full">
                  {status === AppStatus.IDLE && (
                     <button
                        onClick={handleAnalyze}
                        disabled={!imageFile}
                        className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                      >
                        Analyze Scan
                      </button>
                  )}
                  {status === AppStatus.ANALYZING && <Loader />}
                  {(status === AppStatus.RESULT || status === AppStatus.ERROR) && (
                    <div className="w-full">
                      {analysisResult && <ResultDisplay result={analysisResult} />}
                      {error && <p className="text-red-400 text-center bg-red-900/50 p-4 rounded-lg">{error}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {imageUrl && (
            <div className="bg-gray-900/50 px-8 py-4 border-t border-gray-700/50 text-center">
              <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                  Upload a different scan
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
