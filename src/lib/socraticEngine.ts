import { socraticPrompts, biasPatterns } from './frameworks';
import { ThoughtSession } from '@/types';

export class SocraticEngine {
  static generatePrompt(input: string): string {
    const lowerInput = input.toLowerCase();
    
    // Find matching prompts based on trigger words
    const matchingPrompts = socraticPrompts.filter(prompt =>
      prompt.trigger.some(trigger => lowerInput.includes(trigger))
    );

    if (matchingPrompts.length > 0) {
      // Return a random matching prompt
      const randomPrompt = matchingPrompts[Math.floor(Math.random() * matchingPrompts.length)];
      return randomPrompt.question;
    }

    // Default prompts if no specific trigger
    const defaultPrompts = [
      'Can you elaborate on that thought?',
      'What led you to this conclusion?',
      'What assumptions are you making?',
      'How would you test this idea?',
      'What evidence would change your mind?'
    ];

    return defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];
  }

  static detectBiases(text: string): string[] {
    const detectedBiases: string[] = [];

    biasPatterns.forEach(({ pattern, bias, message }) => {
      if (pattern.test(text)) {
        detectedBiases.push(`${bias}: ${message}`);
      }
    });

    return detectedBiases;
  }

  static calculateDepthScore(text: string): number {
    let score = 0;

    // Length factor (more thoughtful responses tend to be longer)
    const wordCount = text.split(/\s+/).length;
    score += Math.min(wordCount / 50, 3);

    // Reasoning indicators
    const reasoningWords = ['because', 'therefore', 'thus', 'however', 'although', 'considering', 'given that'];
    reasoningWords.forEach(word => {
      if (text.toLowerCase().includes(word)) score += 0.5;
    });

    // Question marks (self-inquiry)
    const questionCount = (text.match(/\?/g) || []).length;
    score += Math.min(questionCount * 0.3, 2);

    // Specific examples
    if (/for example|such as|instance|specifically/i.test(text)) {
      score += 1;
    }

    // Multiple perspectives
    if (/on the other hand|alternatively|another view|conversely/i.test(text)) {
      score += 1.5;
    }

    return Math.min(Math.round(score * 10) / 10, 10);
  }

  static generateInsightPrompts(framework: string): string[] {
    const prompts: Record<string, string[]> = {
      'root-cause': [
        'What is the immediate symptom you observe?',
        'What causes this symptom?',
        'Why does that cause exist?',
        'What is the fundamental root cause?'
      ],
      'first-principles': [
        'What are you assuming to be true?',
        'What are the basic facts?',
        'Can you rebuild without assumptions?',
        'What new approach emerges?'
      ],
      'multi-step-logic': [
        'What is your starting premise?',
        'What follows from this premise?',
        'How do these steps connect?',
        'What is your conclusion?'
      ],
      'future-consequence': [
        'What happens immediately?',
        'What are the second-order effects?',
        'What could happen in 1 year?',
        'What are the long-term implications?'
      ],
      'opposing-viewpoint': [
        'What is your current position?',
        'What is the strongest counter-argument?',
        'What evidence supports the opposition?',
        'How does this change your view?'
      ]
    };

    return prompts[framework] || [
      'What is your main thought?',
      'What supports this?',
      'What challenges this?',
      'What is your refined conclusion?'
    ];
  }
}

export const storageKeys = {
  SESSIONS: 'cias_sessions',
  METRICS: 'cias_metrics',
  CURRENT_SESSION: 'cias_current_session'
};

export const saveSession = (session: ThoughtSession) => {
  const sessions = JSON.parse(localStorage.getItem(storageKeys.SESSIONS) || '[]');
  sessions.push(session);
  localStorage.setItem(storageKeys.SESSIONS, JSON.stringify(sessions));
};

export const getSessions = (): ThoughtSession[] => {
  return JSON.parse(localStorage.getItem(storageKeys.SESSIONS) || '[]');
};

export const clearSessions = () => {
  localStorage.removeItem(storageKeys.SESSIONS);
  localStorage.removeItem(storageKeys.METRICS);
  localStorage.removeItem(storageKeys.CURRENT_SESSION);
};