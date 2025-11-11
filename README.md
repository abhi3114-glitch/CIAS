# CIAS - Cognitive Intelligence Augmentation System

A human thinking enhancement platform powered by AI that strengthens reasoning, problem-solving, and decision-making through Socratic dialogue and cognitive frameworks.

## Features

- **AI-Powered Thought Workspace** - Real-time Socratic questioning using Llama3-8b-instant
- **Bias Detection** - AI analyzes your thoughts for cognitive biases and logical fallacies
- **Framework Library** - 5 structured thinking templates (Root Cause Analysis, First Principles, etc.)
- **Cognitive Exercises** - Mental workouts to strengthen reasoning abilities
- **Session History** - Track your cognitive progress over time
- **Insight Generation** - AI suggests key takeaways from your reasoning

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **AI**: Groq API with Llama3-8b-instant model
- **Storage**: LocalStorage (MVP)
- **Build**: Vite

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure API Key

Create a `.env` file in the root directory:

```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key from: https://console.groq.com/keys

### 3. Start Development Server

```bash
pnpm run dev
```

### 4. Build for Production

```bash
pnpm run build
```

## Environment Variables

- `VITE_GROQ_API_KEY` - Your Groq API key for Llama3-8b-instant access

## How to Use

1. **Thought Workspace**: Write your thoughts (50+ words) to trigger AI-powered Socratic questions
2. **Framework Library**: Browse and apply structured thinking templates
3. **Cognitive Exercises**: Complete timed challenges to strengthen reasoning
4. **Session History**: Review past sessions and track cognitive metrics

## AI Features

- **Dynamic Socratic Questioning**: AI generates contextual questions based on your specific thoughts
- **Bias Analysis**: Detects cognitive biases and logical fallacies in real-time
- **Insight Suggestions**: AI recommends key takeaways from your reasoning process

## Project Structure

```
src/
├── components/          # React components
│   ├── ThoughtWorkspace.tsx
│   ├── FrameworkLibrary.tsx
│   ├── CognitiveExercises.tsx
│   └── SessionHistory.tsx
├── lib/                 # Utilities and logic
│   ├── groqClient.ts    # AI integration
│   ├── socraticEngine.ts
│   └── frameworks.ts
├── types/              # TypeScript definitions
└── pages/              # Main pages
```

## Notes

- Minimum 50 words required to trigger AI analysis
- API calls are made client-side (dangerouslyAllowBrowser: true)
- All session data stored locally in browser
- No backend required for MVP

## Future Enhancements

- Backend integration with Supabase/Firebase
- Real-time collaborative reasoning sessions
- Advanced cognitive metrics and visualizations
- Mobile app version
- Voice-based thinking mode