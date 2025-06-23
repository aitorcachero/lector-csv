# 📊 CSV Reader

Una aplicación web moderna y elegante para cargar, visualizar y analizar archivos CSV de forma sencilla e intuitiva.

![CSV Reader](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características

- 🚀 **Carga rápida de archivos**: Soporte para archivos CSV y DBF
- 🎨 **Interfaz moderna**: Diseño elegante con gradientes y animaciones suaves
- 🌙 **Modo oscuro**: Tema claro/oscuro con transiciones fluidas
- 📱 **Responsive**: Optimizado para dispositivos móviles y desktop
- 🔍 **Búsqueda avanzada**: Busca en todo el archivo, no solo en la página actual
- 📋 **Gestión de columnas**: Selecciona qué columnas mostrar u ocultar
- 📄 **Paginación inteligente**: Navega por grandes datasets con opciones de 10, 20 o 50 elementos por página
- 🔄 **Ordenamiento**: Ordena por cualquier columna de forma ascendente o descendente
- ⚡ **Rendimiento optimizado**: Carga y renderizado eficiente de grandes archivos

## 🛠️ Tecnologías

- **Frontend**: Next.js 15.3.4 con React 19
- **Estilos**: Tailwind CSS 4.0
- **Procesamiento CSV**: csv-parse
- **Soporte DBF**: dbffile, node-dbf
- **Desarrollo**: ESLint, Turbopack

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### Pasos

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/lector-csv.git
cd lector-csv
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. **Inicia el servidor**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. **Abre tu navegador**
   Visita http://localhost:3000 para ver la aplicación.

## 📖 Uso

### Cargar un archivo

1. Haz clic en el área de carga o arrastra y suelta tu archivo CSV/DBF
2. El archivo se procesará automáticamente
3. Los datos se mostrarán en una tabla interactiva

### Funcionalidades disponibles

- 🔍 Buscar : Usa la barra de búsqueda para filtrar datos en todo el archivo
- 🔄 Ordenar : Haz clic en los encabezados de columna para ordenar
- 👁️ Columnas : Usa el botón "Configurar Columnas" para mostrar/ocultar columnas
- 📄 Paginación : Navega entre páginas y ajusta elementos por página
- 🌙 Tema : Alterna entre modo claro y oscuro con el botón en la esquina superior

## 🏗️ Estructura del Proyecto

```bash
lector-csv/
├── src/
│   ├── app/
│   │   ├── context/
│   │   │   └── ThemeContext.js     # Contexto para manejo de temas
│   │   ├── globals.css             # Estilos globales
│   │   ├── layout.js               # Layout principal
│   │   └── page.js                 # Página principal
│   └── components/
│       ├── ColumnSelector.js       # Selector de columnas
│       ├── DataTable.js            # Tabla de datos principal
│       ├── ErrorMessage.js         # Componente de errores
│       ├── FileUploader.js         # Cargador de archivos
│       ├── HeaderSection.js        # Encabezado con gradientes
│       ├── LoadingSpinner.js       # Indicador de carga
│       ├── Pagination.js           # Controles de paginación
│       ├── SearchBar.js            # Barra de búsqueda
│       └── ThemeToggle.js          # Botón de cambio de tema
├── public/                         # Archivos estáticos
├── package.json                    # Dependencias y scripts
└── README.md                       # Este archivo

```

## 🎨 Características de Diseño

- Gradientes modernos : Fondos con gradientes elegantes que se adaptan al tema
- Animaciones suaves : Transiciones y efectos hover sutiles
- Tipografía clara : Fuentes optimizadas para legibilidad
- Espaciado consistente : Diseño equilibrado y profesional
- Accesibilidad : Contraste adecuado y navegación por teclado

## 📋 Scripts Disponibles

- npm run dev - Inicia el servidor de desarrollo con Turbopack
- npm run build - Construye la aplicación para producción
- npm run start - Inicia el servidor de producción
- npm run lint - Ejecuta el linter para verificar el código

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature ( git checkout -b feature/AmazingFeature )
3. Commit tus cambios ( git commit -m 'Add some AmazingFeature' )
4. Push a la rama ( git push origin feature/AmazingFeature )
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- Next.js por el framework
- Tailwind CSS por los estilos
- csv-parse por el procesamiento de CSV
- React por la biblioteca de UI
  ⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
