import { Framework, SocraticPrompt, CognitiveExercise } from '@/types';

export const frameworks: Framework[] = [
  {
    id: 'root-cause',
    name: 'Root Cause Analysis',
    description: 'Identify the fundamental cause of a problem by asking "why" repeatedly',
    category: 'analysis',
    steps: [
      'State the problem clearly',
      'Ask why the problem occurs',
      'For each answer, ask why again',
      'Continue until you reach the root cause',
      'Verify the root cause with evidence'
    ],
    prompts: [
      'What is the specific problem you are trying to solve?',
      'Why does this problem exist?',
      'What evidence supports this cause?',
      'If you solved this cause, would the problem disappear?',
      'Are there other contributing factors?'
    ]
  },
  {
    id: 'first-principles',
    name: 'First Principles Thinking',
    description: 'Break down complex problems to their fundamental truths and rebuild from there',
    category: 'analysis',
    steps: [
      'Identify your current assumptions',
      'Break down the problem to fundamental truths',
      'Question each assumption',
      'Rebuild the solution from basic principles',
      'Test your new approach'
    ],
    prompts: [
      'What do you currently assume to be true?',
      'What are the fundamental facts that cannot be disputed?',
      'Why do you believe this assumption is necessary?',
      'What would happen if this assumption were false?',
      'How can you rebuild this without the assumption?'
    ]
  },
  {
    id: 'multi-step-logic',
    name: 'Multi-Step Logic Mapping',
    description: 'Create a clear chain of reasoning from premise to conclusion',
    category: 'logic',
    steps: [
      'State your conclusion',
      'Identify the premises needed',
      'Map the logical connections',
      'Check for gaps or leaps',
      'Validate each step'
    ],
    prompts: [
      'What conclusion are you trying to reach?',
      'What facts or premises support this?',
      'How does premise A lead to premise B?',
      'Are there any logical gaps in your reasoning?',
      'What evidence would disprove your conclusion?'
    ]
  },
  {
    id: 'future-consequence',
    name: 'Future Consequence Analysis',
    description: 'Explore potential outcomes and second-order effects of decisions',
    category: 'decision',
    steps: [
      'Define the decision or action',
      'List immediate consequences',
      'Identify second-order effects',
      'Consider third-order implications',
      'Evaluate probability and impact'
    ],
    prompts: [
      'What decision are you considering?',
      'What will happen immediately after?',
      'What will those consequences lead to?',
      'Who else will be affected?',
      'What could go wrong in 6 months? 1 year? 5 years?'
    ]
  },
  {
    id: 'opposing-viewpoint',
    name: 'Opposing Viewpoint Analysis',
    description: 'Challenge your position by exploring alternative perspectives',
    category: 'perspective',
    steps: [
      'State your current position',
      'Identify the strongest opposing view',
      'Argue for the opposing side',
      'Find common ground',
      'Refine your original position'
    ],
    prompts: [
      'What is your current belief or position?',
      'What would someone who disagrees say?',
      'What is the strongest argument against your view?',
      'What evidence supports the opposing view?',
      'How would you argue if you held the opposite position?'
    ]
  }
];

export const socraticPrompts: SocraticPrompt[] = [
  {
    id: 'clarify-1',
    question: 'What exactly do you mean by that?',
    category: 'clarification',
    trigger: ['vague', 'unclear', 'general']
  },
  {
    id: 'clarify-2',
    question: 'Can you give me a specific example?',
    category: 'clarification',
    trigger: ['abstract', 'theoretical']
  },
  {
    id: 'assumption-1',
    question: 'What are you assuming here?',
    category: 'assumption',
    trigger: ['believe', 'think', 'assume']
  },
  {
    id: 'assumption-2',
    question: 'Why do you think this assumption is valid?',
    category: 'assumption',
    trigger: ['must', 'should', 'always']
  },
  {
    id: 'evidence-1',
    question: 'What evidence supports this claim?',
    category: 'evidence',
    trigger: ['claim', 'fact', 'true']
  },
  {
    id: 'evidence-2',
    question: 'How do you know this is accurate?',
    category: 'evidence',
    trigger: ['know', 'certain', 'sure']
  },
  {
    id: 'perspective-1',
    question: 'How might someone else view this differently?',
    category: 'perspective',
    trigger: ['obvious', 'clearly', 'everyone']
  },
  {
    id: 'perspective-2',
    question: 'What would the opposing argument be?',
    category: 'perspective',
    trigger: ['right', 'wrong', 'best']
  },
  {
    id: 'implication-1',
    question: 'What are the consequences of this reasoning?',
    category: 'implication',
    trigger: ['therefore', 'so', 'thus']
  },
  {
    id: 'implication-2',
    question: 'If this is true, what else must be true?',
    category: 'implication',
    trigger: ['if', 'then', 'because']
  }
];

export const cognitiveExercises: CognitiveExercise[] = [
  {
    id: 'bias-1',
    title: 'Confirmation Bias Detection',
    description: 'Identify instances of confirmation bias in reasoning',
    type: 'bias',
    difficulty: 'easy',
    timeLimit: 300,
    prompt: 'Read this scenario: "Sarah believes that organic food is always healthier. She reads an article about pesticides in conventional farming and shares it with friends, saying it proves her point. She ignores studies showing similar nutritional content between organic and conventional produce." What cognitive bias is Sarah displaying? How could she think more objectively?',
    hints: [
      'Consider what information Sarah is seeking vs. ignoring',
      'Think about how she interprets evidence',
      'What would balanced thinking look like?'
    ]
  },
  {
    id: 'logic-1',
    title: 'Logical Fallacy Hunt',
    description: 'Identify the logical fallacy in an argument',
    type: 'logic',
    difficulty: 'medium',
    timeLimit: 240,
    prompt: 'Analyze this argument: "Everyone I know loves this restaurant, so it must be the best restaurant in the city." What logical fallacy is present? Why is this reasoning flawed?',
    hints: [
      'Consider the sample size',
      'Think about generalization',
      'What evidence would be more convincing?'
    ]
  },
  {
    id: 'reasoning-1',
    title: 'Causal Chain Analysis',
    description: 'Build a complete causal chain for a complex outcome',
    type: 'reasoning',
    difficulty: 'hard',
    timeLimit: 600,
    prompt: 'Trace the causal chain: How did the invention of the printing press lead to the scientific revolution? Identify at least 5 intermediate steps with clear causal links.',
    hints: [
      'Think about information accessibility',
      'Consider literacy rates',
      'Examine the spread of ideas',
      'Look at institutional changes'
    ]
  },
  {
    id: 'decision-1',
    title: 'Multi-Criteria Decision Making',
    description: 'Evaluate a decision using multiple perspectives',
    type: 'decision',
    difficulty: 'medium',
    timeLimit: 480,
    prompt: 'You must decide whether to accept a job offer in a new city. The salary is 30% higher, but you would leave family and friends. Analyze this decision using at least 4 different criteria (financial, social, career growth, lifestyle). What additional information would help you decide?',
    hints: [
      'Consider short-term vs. long-term effects',
      'Think about reversibility',
      'Evaluate opportunity costs',
      'Consider your values and priorities'
    ]
  }
];

export const biasPatterns = [
  {
    pattern: /\b(always|never|everyone|no one|all|none)\b/gi,
    bias: 'Overgeneralization',
    message: 'Be cautious of absolute statements. Consider exceptions and nuance.'
  },
  {
    pattern: /\b(obviously|clearly|certainly|definitely)\b/gi,
    bias: 'Certainty Bias',
    message: 'Strong certainty language may indicate unexamined assumptions.'
  },
  {
    pattern: /\b(feel|believe|think)\b(?!.*because)/gi,
    bias: 'Unsupported Opinion',
    message: 'Consider backing your belief with reasoning or evidence.'
  },
  {
    pattern: /\b(they|people) (say|think|believe)\b/gi,
    bias: 'Appeal to Popularity',
    message: 'Who specifically? What is their expertise? Verify the source.'
  }
];