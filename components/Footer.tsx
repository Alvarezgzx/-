
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="container mx-auto py-6 px-6 text-center text-slate-500 text-sm">
        <p>Elaborado por Jesús Ángel Álvarez González, como un proyecto de demostración.</p>
        <p className="text-xs mt-2">
          &copy; 2025 Playbook de Lectoescritura. Todos los derechos reservados. | 
          <a 
            href="https://www.linkedin.com/in/angelalvarezg97/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-cyan-600 hover:underline ml-1"
          >
            Conecta en LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
};
