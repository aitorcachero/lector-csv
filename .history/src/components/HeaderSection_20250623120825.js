import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function HeaderSection() {
  return (
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
  );
}
