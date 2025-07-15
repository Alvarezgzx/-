
import React, { useState, useCallback } from 'react';
import { LessonPlanRequest, LessonPlan } from './types';
import { generateLessonPlan } from './services/geminiService';
import LessonPlanForm from './components/LessonPlanForm';
import LessonPlanDisplay from './components/LessonPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Bot, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (request: LessonPlanRequest) => {
    setIsLoading(true);
    setError(null);
    setLessonPlan(null);
    try {
      const result = await generateLessonPlan(request);
      setLessonPlan(result);
    } catch (e: any) {
      console.error(e);
      setError('Hubo un error al generar el plan de clase. Por favor, revisa la consola para más detalles o inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <LessonPlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
                <div className="flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-bold">Ocurrió un error</p>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}
            {lessonPlan && <LessonPlanDisplay plan={lessonPlan} />}
            {!isLoading && !error && !lessonPlan && (
              <div className="text-center bg-white p-12 rounded-xl shadow-lg border border-slate-100">
                 <Bot className="mx-auto h-16 w-16 text-cyan-500" strokeWidth={1.5} />
                <h2 className="mt-4 text-2xl font-bold text-slate-700">Tu Plan de Clase Personalizado Aparecerá Aquí</h2>
                <p className="mt-2 text-slate-500">Completa el formulario de arriba para que nuestra IA pedagógica diseñe una ruta de aprendizaje a medida, basada en el Playbook de Lectoescritura.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
