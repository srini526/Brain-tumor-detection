
import React from 'react';
import { BrainIcon } from './icons/BrainIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <BrainIcon className="h-10 w-10 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">AI Brain Tumor Detector</h1>
            <p className="text-sm text-gray-400">Demonstration using Gemini AI</p>
          </div>
        </div>
      </div>
    </header>
  );
};
