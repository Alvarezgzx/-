
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg border border-slate-100">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-semibold">Creando un plan de aprendizaje increíble...</p>
    </div>
  );
};

export default LoadingSpinner;
