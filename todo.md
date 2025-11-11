# CIAS MVP Development Plan

## Project: Cognitive Intelligence Augmentation System

### Core Files to Create (Max 8 files)

1. **src/pages/Index.tsx** - Main application interface with tabbed navigation
   - Thought Workspace tab
   - Framework Library tab
   - Cognitive Exercises tab
   - Session History tab

2. **src/components/ThoughtWorkspace.tsx** - Primary reasoning interface
   - Text area for thought input
   - Socratic prompting display
   - Real-time bias detection alerts
   - Insight builder section

3. **src/components/FrameworkLibrary.tsx** - Thinking framework templates
   - Root cause analysis
   - First principles breakdown
   - Multi-step logic mapping
   - Future consequence analysis
   - Opposing viewpoint analysis

4. **src/components/CognitiveExercises.tsx** - Mental workout challenges
   - Timed reasoning tasks
   - Logic puzzles
   - Bias identification exercises
   - Decision-making scenarios

5. **src/components/SessionHistory.tsx** - Thought session logs
   - List of past sessions
   - Metrics dashboard
   - Progress tracking

6. **src/lib/socraticEngine.ts** - Socratic questioning logic
   - Question generation based on input
   - Cognitive prompts library
   - Bias detection patterns

7. **src/lib/frameworks.ts** - Framework templates and data
   - All thinking framework definitions
   - Mental models library
   - Prompt templates

8. **src/types/index.ts** - TypeScript interfaces
   - ThoughtSession
   - InsightBlock
   - Framework
   - CognitiveMetric

### Implementation Strategy

- Use localStorage for MVP (no backend initially)
- Simple, clean UI focused on thinking clarity
- Minimal distractions, text-focused interface
- No external API calls in MVP (pre-defined Socratic prompts)
- Focus on core thinking enhancement features

### Key Design Principles

- Minimalist interface to reduce cognitive load
- Clear visual hierarchy
- Ample whitespace for mental clarity
- Neutral color palette
- Typography optimized for reading and thinking