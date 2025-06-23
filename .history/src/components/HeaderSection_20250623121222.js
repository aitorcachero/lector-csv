import { useTheme } from '../app/context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function HeaderSection() {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative overflow-hidden mb-12">
      {/* Fondo con gradiente moderno */}
      <div
        className={`relative rounded-2xl p-8 transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl shadow-gray-900/50'
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl shadow-blue-200/30'
        }`}
      >
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div
            className={`absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl opacity-30 animate-pulse ${
              isDarkMode ? 'bg-blue-500' : 'bg-purple-400'
            }`}
          ></div>
          <div
            className={`absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-xl opacity-20 animate-pulse ${
              isDarkMode ? 'bg-purple-500' : 'bg-blue-400'
            }`}
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-2xl opacity-10 ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gradient-to-r from-purple-400 to-blue-400'
            }`}
            style={{ animation: 'spin 20s linear infinite' }}
          ></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {/* Título simple con gradiente elegante */}
              <h1
                className={`text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode
                    ? 'from-blue-400 to-purple-400'
                    : 'from-blue-600 to-purple-600'
                }`}
              >
                CSV Reader
              </h1>

              {/* Subtítulo moderno */}
              <p
                className={`text-xl md:text-2xl font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Carga, visualiza y analiza tus archivos CSV
                <span className="inline-block ml-2">📊</span>
              </p>

              {/* Línea decorativa */}
              <div
                className={`mt-4 h-1 w-32 rounded-full bg-gradient-to-r ${
                  isDarkMode
                    ? 'from-blue-500 to-purple-500'
                    : 'from-purple-500 to-blue-500'
                }`}
              ></div>
            </div>

            {/* Toggle con hover mejorado */}
            <div className="transform hover:scale-110 transition-transform duration-300">
              <ThemeToggle />
            </div>
          </div>

          {/* Indicadores de características */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: '⚡', text: 'Rápido' },
              { icon: '🎨', text: 'Moderno' },
              { icon: '📱', text: 'Responsive' },
              { icon: '🌙', text: 'Modo Oscuro' },
            ].map((feature) => (
              <div
                key={feature.text}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDarkMode
                    ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-600/50'
                    : 'bg-white/70 text-gray-700 border border-gray-200/50 hover:bg-white/90'
                }`}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sombra inferior */}
      <div
        className={`absolute -bottom-2 left-4 right-4 h-4 rounded-full blur-lg opacity-30 ${
          isDarkMode
            ? 'bg-gradient-to-r from-gray-800 to-gray-900'
            : 'bg-gradient-to-r from-blue-200 to-purple-200'
        }`}
      ></div>
    </div>
  );
}
