export interface ThoughtSession {
  id: string;
  timestamp: Date;
  content: string;
  framework?: string;
  insights: InsightBlock[];
  biasFlags: string[];
  duration: number;
  depthScore: number;
}

export interface InsightBlock {
  id: string;
  content: string;
  reasoning: string;
  validated: boolean;
  timestamp: Date;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  steps: string[];
  prompts: string[];
  category: 'analysis' | 'decision' | 'creativity' | 'logic';
}

export interface CognitiveMetric {
  sessionId: string;
  thoughtDepthIndex: number;
  logicalStructureScore: number;
  biasReductionIndex: number;
  timeToClarity: number;
  decisionQualityScore: number;
}

export interface SocraticPrompt {
  id: string;
  question: string;
  category: 'clarification' | 'assumption' | 'evidence' | 'perspective' | 'implication';
  trigger: string[];
}

export interface CognitiveExercise {
  id: string;
  title: string;
  description: string;
  type: 'reasoning' | 'logic' | 'bias' | 'decision';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  prompt: string;
  hints: string[];
}