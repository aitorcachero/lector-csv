'use client';

// ELIMINAR esta línea:
// import Talent from './Talent.dbc'

import { useState, useCallback } from 'react';
import { parse } from 'csv-parse/browser/esm/sync';
import { useTheme } from './context/ThemeContext';
import { DBFFile } from 'dbffile';

export default function CSVViewer() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isCSV = fileName.endsWith('.csv');
    const isDBC = fileName.endsWith('.dbc') || fileName.endsWith('.dbf');

    if (!isCSV && !isDBC) {
      setError('Por favor, selecciona un archivo CSV o DBC válido.');
      return;
    }

    setIsLoading(true);
    setError('');
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let parsedData;

        if (isCSV) {
          // Lógica existente para CSV
          const csvText = e.target.result;
          parsedData = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            bom: true,
          });
        } else if (isDBC) {
          // Nueva lógica para DBC
          const buffer = e.target.result;
          // Aquí usarías la librería DBC para parsear
          // parsedData = parseDBCFile(buffer);
        }

        // Resto de la lógica existente...
        if (parsedData.length > 0) {
          const allHeaders = Object.keys(parsedData[0]);
          setHeaders(allHeaders);
          setCsvData(parsedData);
          setCurrentPage(1);

          if (allHeaders.length > 5) {
            setVisibleColumns(allHeaders.slice(0, 5));
            setShowColumnSelector(true);
          } else {
            setVisibleColumns(allHeaders);
          }
        } else {
          setError('El archivo está vacío o no tiene un formato válido.');
        }
      } catch (err) {
        setError('Error al procesar el archivo: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error al leer el archivo.');
      setIsLoading(false);
    };

    // Leer como texto para CSV, como ArrayBuffer para DBC
    if (isCSV) {
      reader.readAsText(file, 'UTF-8');
    } else {
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((col) => col !== column);
      } else {
        return [...prev, column];
      }
    });
  };

  const handleSelectAllColumns = () => {
    setVisibleColumns(headers);
  };

  const handleDeselectAllColumns = () => {
    setVisibleColumns([]);
  };

  const handleApplyColumnSelection = () => {
    setShowColumnSelector(false);
    setCurrentPage(1);
  };

  const filteredAndSortedData = csvData
    .filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key]?.toString() || '';
      const bValue = b[sortConfig.key]?.toString() || '';

      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue, undefined, { numeric: true });
      }
      return bValue.localeCompare(aValue, undefined, { numeric: true });
    });

  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const resetData = () => {
    setCsvData([]);
    setHeaders([]);
    setVisibleColumns([]);
    setFileName('');
    setError('');
    setCurrentPage(1);
    setSearchTerm('');
    setSortConfig({ key: null, direction: 'asc' });
    setShowColumnSelector(false);

    // Limpiar el valor del input para permitir cargar el mismo archivo
    const fileInput = document.getElementById('csv-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con botón de tema */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div></div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Lector CSV Profesional
              </h1>
              <p className="text-lg text-gray-600">
                Visualiza y analiza tus archivos CSV de manera profesional
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              title={
                isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
              }
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
              <label htmlFor="csv-upload" className="cursor-pointer">
                <span className="text-lg font-medium text-blue-600 hover:text-blue-500">
                  Selecciona un archivo CSV o DBC
                </span>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv,.dbc,.dbf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-gray-500 mt-2">o arrastra y suelta aquí</p>
            </div>
          </div>

          {fileName && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="text-blue-800 font-medium">📄 {fileName}</span>
              <button
                onClick={resetData}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Procesando archivo...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Modal de Selección de Columnas */}
        {showColumnSelector && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop con blur */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowColumnSelector(false)}
            ></div>

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div
                className="relative rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-200"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                }}
              >
                <div className="p-6 border-b border-gray-200">
                  <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    Seleccionar Columnas a Mostrar
                  </h2>
                  <p style={{ color: 'var(--color-gray-600)' }}>
                    Tu archivo tiene {headers.length} columnas. Selecciona
                    cuáles quieres visualizar:
                  </p>
                </div>

                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={handleSelectAllColumns}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors"
                    >
                      Seleccionar Todas
                    </button>
                    <button
                      onClick={handleDeselectAllColumns}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors"
                    >
                      Deseleccionar Todas
                    </button>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                      {visibleColumns.length} seleccionadas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {headers.map((header, index) => (
                      <label
                        key={index}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(header)}
                          onChange={() => handleColumnToggle(header)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {header}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={() => setShowColumnSelector(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleApplyColumnSelection}
                    disabled={visibleColumns.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Aplicar ({visibleColumns.length} columnas)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Display */}
        {csvData.length > 0 && !showColumnSelector && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-colors duration-300">
            {/* Stats and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-800 font-medium">
                      {filteredAndSortedData.length} filas
                    </span>
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-green-800 font-medium">
                      {visibleColumns.length} de {headers.length} columnas
                    </span>
                  </div>
                  <button
                    onClick={() => setShowColumnSelector(true)}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
                  >
                    ⚙️ Configurar Columnas
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar en los datos..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 bg-white text-gray-900 placeholder-gray-500"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {visibleColumns.map((header, index) => (
                      <th
                        key={index}
                        onClick={() => handleSort(header)}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                      >
                        <div className="flex items-center space-x-1">
                          <span>{header}</span>
                          {sortConfig.key === header && (
                            <span className="text-blue-600">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {visibleColumns.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {row[header] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando {startIndex + 1} a{' '}
                  {Math.min(
                    startIndex + rowsPerPage,
                    filteredAndSortedData.length
                  )}{' '}
                  de {filteredAndSortedData.length} resultados
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>

                  <span className="px-3 py-1 text-sm text-gray-700">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {csvData.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay datos para mostrar
            </h3>
            <p className="text-gray-600">
              Sube un archivo CSV para comenzar a visualizar tus datos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// En la función handleFileUpload, reemplazar la sección DBC:
else if (isDBC) {
  try {
    // Crear un blob temporal para DBFFile
    const blob = new Blob([buffer]);
    const file = new File([blob], fileName, { type: 'application/octet-stream' });

    // Crear una URL temporal para el archivo
    const tempUrl = URL.createObjectURL(file);

    // Usar DBFFile para leer el archivo
    const dbf = await DBFFile.open(tempUrl, { readMode: 'loose' });

    // Obtener los nombres de los campos
    const headers = dbf.fields.map(field => field.name);

    // Leer todos los registros
    const records = await dbf.readRecords();

    // Convertir a formato compatible con la tabla
    const data = records.map(record =>
      headers.map(header => {
        const value = record[header];
        return value !== null && value !== undefined ? String(value) : '';
      })
    );

    // Limpiar la URL temporal
    URL.revokeObjectURL(tempUrl);

    // Establecer los datos
    setHeaders(headers);
    setData(data);
    setVisibleColumns(headers.slice(0, 5)); // Mostrar primeras 5 columnas
    setFileName(fileName);
    setError('');

    // Mostrar selector de columnas si hay más de 5
    if (headers.length > 5) {
      setShowColumnSelector(true);
    }

  } catch (dbcError) {
    console.error('Error parsing DBC file:', dbcError);
    setError('Error al procesar el archivo DBC: ' + dbcError.message);
  }
}
