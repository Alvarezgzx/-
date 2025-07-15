
import React from 'react';
import { LessonPlan, Session } from '../types';
import { BookOpen, CheckCircle, Lightbulb, Package, Target, ToyBrick, Milestone, Globe } from 'lucide-react';

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${className}`}>
        {children}
    </div>
);

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode;}> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        {icon}
        <div>
            <h4 className="font-bold text-slate-700">{title}</h4>
            <div className="text-slate-600 prose prose-sm max-w-none">{children}</div>
        </div>
    </div>
);


const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-shadow hover:shadow-2xl">
            <div className="flex items-center mb-4 pb-4 border-b border-slate-200">
                <IconWrapper className="bg-cyan-100 text-cyan-600">
                    <Milestone className="w-6 h-6" />
                </IconWrapper>
                <div className="ml-4">
                    <h3 className="text-xl font-bold text-cyan-700">Sesión {session.sessionNumber}</h3>
                    <p className="text-sm font-semibold text-slate-500">{session.objective}</p>
                </div>
            </div>

            <div className="space-y-6">
                 <Section icon={<IconWrapper className="bg-amber-100 text-amber-600"><Package className="w-6 h-6" /></IconWrapper>} title="Materiales">
                     <ul className="list-disc pl-5 space-y-1">
                        {session.materials?.map((material, index) => <li key={index}>{material}</li>)}
                    </ul>
                </Section>
                 <Section icon={<IconWrapper className="bg-lime-100 text-lime-600"><ToyBrick className="w-6 h-6" /></IconWrapper>} title={session.warmUp?.title || 'Calentamiento'}>
                    <p>{session.warmUp?.description}</p>
                </Section>
                 <Section icon={<IconWrapper className="bg-rose-100 text-rose-600"><Target className="w-6 h-6" /></IconWrapper>} title={session.mainActivity?.title || 'Actividad Principal'}>
                    <p>{session.mainActivity?.description}</p>
                </Section>
                <Section icon={<IconWrapper className="bg-violet-100 text-violet-600"><CheckCircle className="w-6 h-6" /></IconWrapper>} title={session.closingActivity?.title || 'Actividad de Cierre'}>
                    <p>{session.closingActivity?.description}</p>
                </Section>
            </div>
        </div>
    );
}

interface LessonPlanDisplayProps {
  plan: LessonPlan;
}

const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="animate-fadeIn space-y-8">
        <header className="text-center bg-white p-8 rounded-xl shadow-lg border border-slate-100">
            <BookOpen className="mx-auto h-12 w-12 text-cyan-500 mb-2" strokeWidth={1.5}/>
            <h2 className="text-3xl font-extrabold text-slate-800">{plan.planTitle}</h2>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mt-8">
            <div className="flex items-start space-x-4">
                <IconWrapper className="bg-fuchsia-100 text-fuchsia-600">
                    <Lightbulb className="w-6 h-6"/>
                </IconWrapper>
                <div>
                    <h3 className="text-lg font-bold text-fuchsia-800">Método Pedagógico Recomendado: {plan.recommendedMethod}</h3>
                    <p className="mt-1 text-slate-600">{plan.methodJustification}</p>
                </div>
            </div>
        </div>

      <div className="space-y-6 mt-8">
        {plan.sessions?.map((session, index) => (
          <SessionCard key={session.sessionNumber || index} session={session} />
        ))}
      </div>
    </div>
  );
};


// Simple fade-in animation
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default LessonPlanDisplay;
