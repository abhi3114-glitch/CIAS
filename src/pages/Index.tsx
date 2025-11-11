import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ThoughtWorkspace from '@/components/ThoughtWorkspace';
import FrameworkLibrary from '@/components/FrameworkLibrary';
import CognitiveExercises from '@/components/CognitiveExercises';
import SessionHistory from '@/components/SessionHistory';
import { Brain, BookOpen, Dumbbell, History, Sparkles, Lightbulb, Zap } from 'lucide-react';

export default function Index() {
  const [activeTab, setActiveTab] = useState('workspace');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950">
      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-purple-600/20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-12 max-w-7xl">
        {/* Premium Header */}
        <div className="mb-16 text-center animate-in fade-in slide-in-from-top duration-1000">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50 animate-pulse" />
              <Brain className="relative h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent tracking-tight">
              CIAS
            </h1>
          </div>
          <p className="text-3xl font-semibold text-gray-200 mb-4 tracking-tight">
            Cognitive Intelligence Augmentation System
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Enterprise-grade AI platform for enhancing human cognition through Socratic dialogue, 
            structured reasoning frameworks, and advanced cognitive training.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-full shadow-2xl">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-gray-200 tracking-wide">Powered by Llama 3.1 8B Instant</span>
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>

        {/* Premium Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 h-16 p-1.5 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <TabsTrigger 
              value="workspace" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl text-gray-400 hover:text-gray-200"
            >
              <Brain className="h-5 w-5" />
              <span className="hidden sm:inline font-semibold">Workspace</span>
            </TabsTrigger>
            <TabsTrigger 
              value="frameworks" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl text-gray-400 hover:text-gray-200"
            >
              <BookOpen className="h-5 w-5" />
              <span className="hidden sm:inline font-semibold">Frameworks</span>
            </TabsTrigger>
            <TabsTrigger 
              value="exercises" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl text-gray-400 hover:text-gray-200"
            >
              <Dumbbell className="h-5 w-5" />
              <span className="hidden sm:inline font-semibold">Exercises</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl text-gray-400 hover:text-gray-200"
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline font-semibold">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workspace" className="animate-in fade-in slide-in-from-bottom duration-700">
            <ThoughtWorkspace />
          </TabsContent>

          <TabsContent value="frameworks" className="animate-in fade-in slide-in-from-bottom duration-700">
            <FrameworkLibrary />
          </TabsContent>

          <TabsContent value="exercises" className="animate-in fade-in slide-in-from-bottom duration-700">
            <CognitiveExercises />
          </TabsContent>

          <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom duration-700">
            <SessionHistory />
          </TabsContent>
        </Tabs>

        {/* Premium Footer */}
        <Card className="mt-16 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
          <CardContent className="relative pt-10 pb-10">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-blue-400" />
                <h3 className="font-bold text-2xl text-gray-100">Think Better, Not Faster</h3>
              </div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                CIAS strengthens your cognitive abilities through deliberate practice and structured reasoning. 
                Unlike AI assistants that provide answers, we help you develop the capacity to think independently 
                and critically. Our AI-powered Socratic dialogue adapts to your thoughts, challenging assumptions 
                and deepening your understanding.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-200">AI-Powered Questions</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-semibold text-gray-200">Bias Detection</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow">
                  <Lightbulb className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-semibold text-gray-200">Insight Generation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}