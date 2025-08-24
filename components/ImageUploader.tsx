
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Upload MRI Scan</h2>
        <p className="text-gray-400 mb-8">Begin the analysis by providing a brain MRI image.</p>
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`relative w-full max-w-lg p-10 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging ? 'border-blue-400 bg-blue-900/30' : 'border-gray-600 bg-gray-900/30'}`}
        >
            <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
                <UploadIcon className={`w-16 h-16 transition-colors duration-300 ${isDragging ? 'text-blue-300' : 'text-gray-500'}`} />
                <p className="text-lg font-medium text-gray-300">
                    <span className="text-blue-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
            </label>
        </div>
    </div>
  );
};
