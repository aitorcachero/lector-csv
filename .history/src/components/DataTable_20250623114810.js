'use client';

import { useTheme } from '../app/context/ThemeContext';

const DataTable = ({
  headers,
  data,
  visibleColumns,
  sortConfig,
  onSort,
  fileName,
  onConfigureColumns,
}) => {
  const { isDarkMode } = useTheme();

  // Estilos inline que funcionan inmediatamente
  const containerStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    color: isDarkMode ? '#f9fafb' : '#111827'
  };

  const headerStyle = {
    backgroundColor: isDarkMode ? '#374151' : '#f8fafc',
    borderColor: isDarkMode ? '#4b5563' : '#e5e7eb'
  };

  const tableHeaderStyle = {
    backgroundColor: isDarkMode ? '#4b5563' : '#f9fafb',
    color: isDarkMode ? '#d1d5db' : '#374151'
  };

  const rowHoverStyle = {
    backgroundColor: isDarkMode ? '#374151' : '#f9fafb'
  };

  const getSortIcon = (column) => {
    if (sortConfig.column !== column) {
      return (
        <svg
          className="w-4 h-4 text-gray-400 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg
        className="w-4 h-4 text-blue-600 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-blue-600 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  const formatCellValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic text-xs">Sin datos</span>;
    }

    // Si es un número, formatearlo apropiadamente
    if (!isNaN(value) && !isNaN(parseFloat(value))) {
      const num = parseFloat(value);
      if (Number.isInteger(num)) {
        return num.toLocaleString();
      } else {
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
      }
    }

    // Si es texto muy largo, truncarlo
    const stringValue = String(value);
    if (stringValue.length > 50) {
      return (
        <span title={stringValue} className="cursor-help">
          {stringValue.substring(0, 47)}...
        </span>
      );
    }

    return stringValue;
  };

  // Clases dinámicas basadas en el tema
  const containerClasses = `rounded-lg shadow-md overflow-hidden transition-colors duration-300 ${
    isDarkMode ? 'bg-gray-800' : 'bg-white'
  }`;

  const headerClasses = `p-6 border-b transition-colors duration-300 ${
    isDarkMode
      ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700'
      : 'border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50'
  }`;

  const tableHeaderClasses = `group px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-200 select-none h-12 ${
    isDarkMode
      ? 'text-gray-300 hover:bg-gray-600'
      : 'text-gray-700 hover:bg-gray-100'
  }`;

  const tableHeaderBgClasses = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';

  const tableBodyClasses = `divide-y transition-colors duration-300 ${
    isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
  }`;

  const rowClasses = `transition-colors duration-200 group h-12 ${
    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  }`;

  const cellClasses = `px-6 py-3 text-sm border-r last:border-r-0 h-12 align-middle ${
    isDarkMode
      ? 'text-gray-100 border-gray-700'
      : 'text-gray-900 border-gray-100'
  }`;

  const footerClasses = `px-6 py-3 border-t transition-colors duration-300 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-gray-400'
      : 'bg-gray-50 border-gray-200 text-gray-500'
  }`;

  if (!data || data.length === 0) {
    return (
      <div className={containerClasses}>
        <div className={headerClasses}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div
                className={`px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  0 filas
                </span>
              </div>
              <div
                className={`px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {headers?.length || 0} columnas
                </span>
              </div>
            </div>
            {fileName && (
              <div
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                📄 {fileName}
              </div>
            )}
          </div>
        </div>
        <div className="text-center py-16">
          <div
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3
            className={`text-lg font-medium mb-2 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            No hay datos para mostrar
          </h3>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            Selecciona un archivo CSV para ver su contenido aquí
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-lg shadow-md overflow-hidden transition-colors duration-300"
      style={containerStyle}
    >
      <div 
        className="p-6 border-b"
        style={headerStyle}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-800'
                }`}
              >
                📊 {data.length.toLocaleString()} filas
              </span>
            </div>
            <div
              className={`px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-green-200' : 'text-green-800'
                }`}
              >
                📋 {visibleColumns.length} de {headers.length} columnas
              </span>
            </div>
            {fileName && (
              <div
                className={`px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-purple-200' : 'text-purple-800'
                  }`}
                >
                  📄 {fileName}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onConfigureColumns}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200 shadow-sm ${
              isDarkMode
                ? 'text-blue-400 bg-gray-700 border-blue-600 hover:bg-gray-600'
                : 'text-blue-600 bg-white border-blue-200 hover:bg-blue-50'
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
            Configurar columnas
          </button>
        </div>
      </div>

      {/* Tabla con altura uniforme en filas */}
      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y ${
            isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
          }`}
        >
          <thead className={tableHeaderBgClasses}>
            <tr>
              {visibleColumns.map((header) => (
                <th
                  key={header}
                  className={tableHeaderClasses}
                  onClick={() => onSort(header)}
                >
                  <div className="flex items-center justify-between h-full">
                    <span className="truncate">{header}</span>
                    <div className="flex items-center">
                      {getSortIcon(header)}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={tableBodyClasses}>
            {data.map((row, index) => (
              <tr key={index} className={rowClasses}>
                {visibleColumns.map((header) => {
                  const columnIndex = headers.indexOf(header);
                  const cellValue = row[columnIndex];
                  return (
                    <td key={header} className={cellClasses}>
                      <div className="max-w-xs truncate leading-tight">
                        {formatCellValue(cellValue)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con información adicional */}
      <div className={footerClasses}>
        <div className="flex items-center justify-between text-xs">
          <span>Mostrando {data.length.toLocaleString()} filas</span>
          <span>
            {visibleColumns.length} de {headers.length} columnas visibles
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
