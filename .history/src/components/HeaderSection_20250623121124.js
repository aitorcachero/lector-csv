import { useTheme } from '../app/context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function HeaderSection() {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h1 className={`text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-400 to-purple-400' 
              : 'from-blue-600 to-purple-600'
          }`}>
            Lector de CSV
          </h1>
          <p className={`text-lg transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Carga, visualiza y analiza tus archivos CSV de forma sencilla
          </p>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
