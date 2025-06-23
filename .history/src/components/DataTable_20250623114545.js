'use client';

const DataTable = ({
  headers,
  data,
  visibleColumns,
  sortConfig,
  onSort,
  fileName,
  onConfigureColumns,
}) => {
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

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  0 filas
                </span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {headers?.length || 0} columnas
                </span>
              </div>
            </div>
            {fileName && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                📄 {fileName}
              </div>
            )}
          </div>
        </div>
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No hay datos para mostrar
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Selecciona un archivo CSV para ver su contenido aquí
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      {/* Header mejorado */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                📊 {data.length.toLocaleString()} filas
              </span>
            </div>
            <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                📋 {visibleColumns.length} de {headers.length} columnas
              </span>
            </div>
            {fileName && (
              <div className="bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  📄 {fileName}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onConfigureColumns}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
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

      {/* Tabla mejorada */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {visibleColumns.map((header) => (
                <th
                  key={header}
                  className="group px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 select-none"
                  onClick={() => onSort(header)}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{header}</span>
                    <div className="flex items-center">
                      {getSortIcon(header)}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                {visibleColumns.map((header) => {
                  const columnIndex = headers.indexOf(header);
                  const cellValue = row[columnIndex];
                  return (
                    <td
                      key={header}
                      className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 border-r border-gray-100 dark:border-gray-700 last:border-r-0"
                    >
                      <div className="max-w-xs">
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
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
