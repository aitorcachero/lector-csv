'use client';

import { useCallback } from 'react';

const FileUploader = ({ onFileUpload, fileName, onReset, isLoading }) => {
  const handleFileChange = useCallback(
    (event) => {
      onFileUpload(event);
    },
    [onFileUpload]
  );

  const handleReset = useCallback(() => {
    // Limpiar el input file
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
    onReset();
  }, [onReset]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-colors duration-300 cursor-pointer">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Selecciona un archivo CSV
              </span>
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Archivos CSV hasta 10MB
            </p>
          </div>
        </div>
      </div>

      {fileName && (
        <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-blue-900">
            📄 {fileName}
          </span>
          <button
            onClick={handleReset}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
            disabled={isLoading}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
