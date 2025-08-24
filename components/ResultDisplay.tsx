import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const isTumorDetected = result.diagnosis.toLowerCase().includes('tumor detected');
  const confidencePercentage = (result.confidence * 100).toFixed(1);

  const diagnosisColor = isTumorDetected ? 'text-red-300' : 'text-green-300';
  const confidenceRingColor = isTumorDetected ? 'stroke-red-400' : 'stroke-green-400';
  const cardThemeClasses = isTumorDetected
    ? 'border-red-400 bg-red-500/25'
    : 'border-green-400 bg-green-500/25';

  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const strokeDashoffset = circumference - (result.confidence * circumference);

  return (
    <div className={`p-6 rounded-lg border w-full text-center animate-fade-in transition-colors duration-500 ${cardThemeClasses}`}>
      <h3 className="text-xl font-semibold text-blue-300 mb-6">Analysis Result</h3>
      
      <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={confidenceRingColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <span className="absolute text-3xl font-bold text-white">{confidencePercentage}%</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Diagnosis</p>
          <p className={`text-2xl font-bold ${diagnosisColor} flex items-center justify-center gap-2`}>
            {isTumorDetected ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{result.diagnosis}</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Confidence</p>
          <p className="text-lg font-medium text-white">{confidencePercentage}%</p>
        </div>
      </div>
    </div>
  );
};