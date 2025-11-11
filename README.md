# CIAS - Cognitive Intelligence Augmentation System

![CIAS Banner](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=openai)
![Built with React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)

Enterprise-grade AI platform for enhancing human cognition through Socratic dialogue, structured reasoning frameworks, and advanced cognitive training.

## 🚀 Features

- **AI-Powered Socratic Dialogue** - Real-time intelligent questioning using Llama 3.1 8B Instant
- **Cognitive Bias Detection** - AI analyzes your thoughts for logical fallacies and biases
- **Insight Generation** - AI suggests key takeaways from your reasoning process
- **5 Thinking Frameworks** - Structured templates for problem-solving
- **Cognitive Exercises** - Mental workouts to strengthen reasoning abilities
- **Session History** - Track your cognitive progress over time
- **Premium Dark UI** - Big Tech-inspired design with glassmorphism and gradients

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui components
- **AI**: Groq API with Llama 3.1 8B Instant model
- **Storage**: LocalStorage (MVP)
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/abhi3114-glitch/CIAS.git
cd CIAS
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key from: [https://console.groq.com/keys](https://console.groq.com/keys)

4. **Start development server**
```bash
pnpm run dev
```

5. **Build for production**
```bash
pnpm run build
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abhi3114-glitch/CIAS)

### Manual Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Key: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key
4. Deploy!

## 📖 How to Use

### 1. Thought Workspace
- Write your thoughts (50+ words to trigger AI)
- Receive AI-generated Socratic questions
- Get real-time bias detection
- Build insights from your reasoning

### 2. Framework Library
- Browse 5 thinking frameworks:
  - Root Cause Analysis
  - First Principles Thinking
  - Multi-Step Logic Chain
  - Future Consequence Mapping
  - Opposing Viewpoint Analysis
- Apply structured approaches to problems

### 3. Cognitive Exercises
- Complete timed reasoning challenges
- Strengthen logical thinking
- Practice bias detection
- Improve decision-making

### 4. Session History
- Review past thinking sessions
- Track depth scores over time
- Analyze cognitive progress

## 🎨 Design Philosophy

CIAS features a premium dark theme inspired by leading tech companies:

- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Gradient Overlays** - Subtle color transitions
- **Smooth Animations** - Fade-in, slide-in effects
- **High Contrast** - Optimized for readability
- **Responsive** - Mobile-first design

## 🔧 Configuration

### AI Model Settings

The system uses Groq's Llama 3.1 8B Instant model with:
- Temperature: 0.7 (Socratic questions)
- Temperature: 0.3 (Bias detection)
- Temperature: 0.8 (Insight generation)
- Max tokens: 100-300

### Customization

Edit `/src/lib/groqClient.ts` to adjust:
- AI prompts
- Response formats
- Model parameters

## 📊 Project Structure

```
CIAS/
├── src/
│   ├── components/
│   │   ├── ThoughtWorkspace.tsx    # Main reasoning interface
│   │   ├── FrameworkLibrary.tsx    # Thinking frameworks
│   │   ├── CognitiveExercises.tsx  # Mental exercises
│   │   └── SessionHistory.tsx      # Progress tracking
│   ├── lib/
│   │   ├── groqClient.ts           # AI integration
│   │   ├── socraticEngine.ts       # Local logic
│   │   └── frameworks.ts           # Framework definitions
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── pages/
│       └── Index.tsx               # Main app
├── .env                            # Environment variables
├── vercel.json                     # Vercel config
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Groq** - For providing fast AI inference
- **shadcn/ui** - For beautiful UI components
- **Vercel** - For seamless deployment

## 📧 Contact

For questions or feedback, open an issue on GitHub.

---

**Built with ❤️ for better thinking**

[Live Demo](https://cias.vercel.app) | [Documentation](https://github.com/abhi3114-glitch/CIAS/wiki) | [Report Bug](https://github.com/abhi3114-glitch/CIAS/issues)