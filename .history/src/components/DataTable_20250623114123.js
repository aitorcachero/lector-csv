'use client';

const DataTable = ({ 
  headers, 
  data, 
  visibleColumns, 
  sortConfig, 
  onSort, 
  fileName, 
  onConfigureColumns 
}) => {
  const getSortIcon = (column) => {
    if (sortConfig.column !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-800">
                {data.length} filas
              </span>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-green-800">
                {visibleColumns.length} columnas
              </span>
            </div>
          </div>
          <button
            onClick={onConfigureColumns}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200"
          >
            ⚙️ Configurar columnas
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => onSort(header)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {getSortIcon(header)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                {visibleColumns.map((header) => {
                  const columnIndex = headers.indexOf(header);
                  const cellValue = row[columnIndex] || '';
                  return (
                    <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay datos para mostrar</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;