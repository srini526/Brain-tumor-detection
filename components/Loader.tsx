
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
      <h3 className="text-lg font-semibold text-blue-300">Analyzing Scan...</h3>
      <p className="text-sm text-gray-400 max-w-xs">
        The AI is processing the image. This may take a moment.
      </p>
    </div>
  );
};
