import { useTheme } from '../app/context/ThemeContext';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  onItemsPerPageChange
}) => {
  const { isDarkMode } = useTheme();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const itemsPerPageOptions = [10, 20, 50];

  return (
    <div className={`px-6 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-300 ${
      isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
    }`}>
      <div className={`text-sm transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Mostrando <span className="font-medium">{startItem}</span> a{' '}
        <span className="font-medium">{endItem}</span> de{' '}
        <span className="font-medium">{totalItems}</span> resultados
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Selector de elementos por página */}
        <div className="flex items-center gap-2">
          <label className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Mostrar:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className={`px-2 py-1 text-sm border rounded-md transition-colors duration-200 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            por página
          </span>
        </div>

        {/* Controles de paginación */}
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm border rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Anterior
          </button>
          <span className={`px-3 py-1 text-sm border rounded-md ${
            isDarkMode
              ? 'bg-blue-900 border-blue-700 text-blue-200'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm border rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;