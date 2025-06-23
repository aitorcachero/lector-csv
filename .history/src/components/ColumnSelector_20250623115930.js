'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../app/context/ThemeContext';

const ColumnSelector = ({
  isOpen,
  onClose,
  headers,
  visibleColumns,
  onColumnsChange,
}) => {
  const { isDarkMode } = useTheme();
  const [selectedColumns, setSelectedColumns] = useState(visibleColumns);

  useEffect(() => {
    setSelectedColumns(visibleColumns);
  }, [visibleColumns]);

  const handleColumnToggle = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleSelectAll = () => {
    setSelectedColumns(headers);
  };

  const handleDeselectAll = () => {
    setSelectedColumns([]);
  };

  const handleApply = () => {
    onColumnsChange(selectedColumns);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col border transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600'
              : 'bg-white border-gray-200'
          }`}
          style={{
            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
            borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`p-6 border-b transition-colors duration-300 ${
              isDarkMode ? 'border-gray-600' : 'border-gray-200'
            }`}
          >
            <h3
              className={`text-lg font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Seleccionar Columnas
            </h3>
            <p
              className={`mt-1 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-500'
              }`}
            >
              Elige qué columnas mostrar en la tabla ({selectedColumns.length}{' '}
              seleccionadas)
            </p>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="flex gap-2 mb-4">
              <button
                onClick={handleSelectAll}
                className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-blue-900 text-blue-200 hover:bg-blue-800'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Seleccionar todo
              </button>
              <button
                onClick={handleDeselectAll}
                className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Deseleccionar todo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {headers.map((header) => (
                <label
                  key={header}
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(header)}
                    onChange={() => handleColumnToggle(header)}
                    className={`rounded text-blue-600 focus:ring-blue-500 ${
                      isDarkMode
                        ? 'border-gray-500 bg-gray-700'
                        : 'border-gray-300 bg-white'
                    }`}
                  />
                  <span
                    className={`text-sm truncate transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-700'
                    }`}
                    title={header}
                  >
                    {header}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`p-6 border-t flex justify-end gap-3 transition-colors duration-300 ${
              isDarkMode ? 'border-gray-600' : 'border-gray-200'
            }`}
          >
            <button
              onClick={onClose}
              className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm font-medium text-white bg-green-800 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelector;
