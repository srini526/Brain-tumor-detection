
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="bg-yellow-900/50 border-2 border-yellow-500 text-yellow-200 rounded-lg p-4 text-center">
          <h3 className="font-bold text-lg">⚠️ Disclaimer</h3>
          <p className="text-sm">
            This is a technology demonstration and is NOT a medical device. The analysis provided is simulated by a general AI model and should not be used for real medical diagnosis. Always consult a qualified healthcare professional for any medical concerns.
          </p>
        </div>
      </div>
    </footer>
  );
};
