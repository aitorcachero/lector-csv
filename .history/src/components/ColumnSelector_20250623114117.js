'use client';

import { useState, useEffect } from 'react';

const ColumnSelector = ({ 
  isOpen, 
  onClose, 
  headers, 
  visibleColumns, 
  onColumnsChange 
}) => {
  const [selectedColumns, setSelectedColumns] = useState(visibleColumns);

  useEffect(() => {
    setSelectedColumns(visibleColumns);
  }, [visibleColumns]);

  const handleColumnToggle = (column) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(col => col !== column)
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
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Seleccionar Columnas
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Elige qué columnas mostrar en la tabla ({selectedColumns.length} seleccionadas)
            </p>
          </div>
          
          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="flex gap-2 mb-4">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
              >
                Seleccionar todo
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Deseleccionar todo
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {headers.map((header) => (
                <label key={header} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(header)}
                    onChange={() => handleColumnToggle(header)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 truncate" title={header}>
                    {header}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-200"
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