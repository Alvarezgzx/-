
export interface LessonPlanRequest {
  age: string;
  sessions: string;
  objective: string;
}

export interface Activity {
  title:string;
  description: string;
}

export interface Session {
  sessionNumber: number;
  objective: string;
  materials: string[];
  warmUp: Activity;
  mainActivity: Activity;
  closingActivity: Activity;
}

export interface LessonPlan {
  planTitle: string;
  recommendedMethod: string;
  methodJustification: string;
  sessions: Session[];
}
