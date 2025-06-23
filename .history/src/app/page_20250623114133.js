'use client';

import { useState, useCallback, useMemo } from 'react';
import { parse } from 'csv-parse/browser/esm/sync';

// Componentes
import FileUploader from '../components/FileUploader';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import ColumnSelector from '../components/ColumnSelector';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

export default function CSVViewer() {
  // Estados
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  
  const itemsPerPage = 10;

  // Funciones
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name;
    const isCSV = fileName.endsWith('.csv');

    if (!isCSV) {
      setError('Por favor, selecciona un archivo CSV válido.');
      return;
    }

    setIsLoading(true);
    setError('');
    setFileName(fileName);

    try {
      const text = await file.text();
      const parsedData = parse(text, {
        skip_empty_lines: true,
        trim: true
      });

      if (parsedData.length === 0) {
        setError('El archivo CSV está vacío.');
        return;
      }

      const headers = parsedData[0];
      const data = parsedData.slice(1);

      setHeaders(headers);
      setData(data);
      setVisibleColumns(headers.slice(0, 5));
      setCurrentPage(1);
      setSearchTerm('');
      setSortConfig({ column: null, direction: 'asc' });

      if (headers.length > 5) {
        setShowColumnSelector(true);
      }
    } catch (err) {
      console.error('Error parsing CSV:', err);
      setError('Error al procesar el archivo: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetData = useCallback(() => {
    setData([]);
    setHeaders([]);
    setVisibleColumns([]);
    setFileName('');
    setError('');
    setCurrentPage(1);
    setSearchTerm('');
    setSortConfig({ column: null, direction: 'asc' });
    setShowColumnSelector(false);
  }, []);

  const handleSort = useCallback((column) => {
    setSortConfig(prevConfig => ({
      column,
      direction: prevConfig.column === column && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  }, []);

  // Datos filtrados y ordenados
  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = data.filter(row =>
        row.some(cell =>
          cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Ordenar
    if (sortConfig.column) {
      const columnIndex = headers.indexOf(sortConfig.column);
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[columnIndex] || '';
        const bVal = b[columnIndex] || '';
        
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        return sortConfig.direction === 'asc' 
          ? aVal.toString().localeCompare(bVal.toString())
          : bVal.toString().localeCompare(aVal.toString());
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, headers]);

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Lector de CSV
              </h1>
              <p className="text-lg text-gray-600">
                Carga, visualiza y analiza tus archivos CSV de forma sencilla
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* File Uploader */}
        <FileUploader
          onFileUpload={handleFileUpload}
          fileName={fileName}
          onReset={resetData}
          isLoading={isLoading}
        />

        {/* Loading */}
        {isLoading && <LoadingSpinner message="Procesando archivo..." />}

        {/* Error */}
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError('')} 
        />

        {/* Column Selector Modal */}
        <ColumnSelector
          isOpen={showColumnSelector}
          onClose={() => setShowColumnSelector(false)}
          headers={headers}
          visibleColumns={visibleColumns}
          onColumnsChange={setVisibleColumns}
        />

        {/* Data Display */}
        {data.length > 0 && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar en los datos..."
              />
            </div>

            {/* Data Table */}
            <DataTable
              headers={headers}
              data={paginatedData}
              visibleColumns={visibleColumns}
              sortConfig={sortConfig}
              onSort={handleSort}
              fileName={fileName}
              onConfigureColumns={() => setShowColumnSelector(true)}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredAndSortedData.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
