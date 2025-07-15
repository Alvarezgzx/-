
import React, { useState, useEffect } from 'react';
import { LessonPlanRequest } from '../types';

interface LessonPlanFormProps {
  onSubmit: (request: LessonPlanRequest) => void;
  isLoading: boolean;
}

const ageBasedObjectives: Record<string, string[]> = {
  '3-4': [
    'Desarrollar la motricidad fina y la pinza digital para el trazo.',
    'Introducir el reconocimiento de su propio nombre escrito.',
    'Fomentar la discriminación auditiva de sonidos del entorno.',
    'Estimular el vocabulario a través de cuentos y canciones.',
  ],
  '5-6': [
    'Mejorar la conciencia fonológica y el reconocimiento de sílabas.',
    'Introducir el alfabeto y la relación letra-sonido (grafema-fonema).',
    'Comenzar a formar y leer sílabas y palabras simples.',
    'Practicar trazos de letras y números.',
  ],
  '7-8': [
    'Mejorar la fluidez lectora y la entonación.',
    'Fomentar la comprensión lectora de textos más largos.',
    'Estimular la escritura creativa y la construcción de oraciones completas.',
    'Introducir reglas ortográficas básicas (mayúsculas, puntos).',
  ],
  '9-12': [
    'Desarrollar la comprensión lectora crítica y la inferencia.',
    'Escribir textos narrativos y descriptivos con estructura clara.',
    'Ampliar el vocabulario y mejorar la ortografía.',
    'Utilizar la lectura como herramienta de investigación.',
  ],
};

const getObjectivesForAge = (age: number): string[] => {
  if (age <= 4) return ageBasedObjectives['3-4'];
  if (age <= 6) return ageBasedObjectives['5-6'];
  if (age <= 8) return ageBasedObjectives['7-8'];
  return ageBasedObjectives['9-12'];
};


const LessonPlanForm: React.FC<LessonPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [age, setAge] = useState('5');
  const [sessions, setSessions] = useState('3');
  const [currentObjectives, setCurrentObjectives] = useState(() => getObjectivesForAge(Number(age)));
  const [objective, setObjective] = useState(currentObjectives[0]);

  useEffect(() => {
    const newObjectives = getObjectivesForAge(Number(age));
    setCurrentObjectives(newObjectives);
    setObjective(newObjectives[0]);
  }, [age]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && sessions && objective) {
      onSubmit({ age, sessions, objective });
    }
  };

  const sliderStyle = {
    accentColor: 'var(--cian-secundario)',
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold text-center mb-1 text-slate-700">Diseña tu Plan de Clase</h2>
      <p className="text-center text-slate-500 mb-6">Indica los detalles y la IA creará un plan de aprendizaje a medida.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="age" className="block text-sm font-medium text-slate-600">Edad del Alumno</label>
              <span className="text-sm font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md">{age} años</span>
            </div>
            <input
              type="range"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              min="3"
              max="12"
              style={sliderStyle}
              aria-label={`Edad del alumno, ${age} años`}
            />
          </div>
          {/* Sessions Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="sessions" className="block text-sm font-medium text-slate-600">Número de Sesiones</label>
              <span className="text-sm font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md">{sessions} sesiones</span>
            </div>
            <input
              type="range"
              id="sessions"
              value={sessions}
              onChange={(e) => setSessions(e.target.value)}
              required
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              min="1"
              max="10"
              style={sliderStyle}
              aria-label={`Número de sesiones, ${sessions}`}
            />
          </div>
        </div>
        {/* Objective Select */}
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-slate-600 mb-1">Objetivo Pedagógico Principal</label>
          <select
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          >
            {currentObjectives.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generando...' : 'Generar Plan de Clase'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonPlanForm;
