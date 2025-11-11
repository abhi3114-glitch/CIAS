import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Lightbulb, AlertTriangle, Save, Sparkles, Loader2, Zap } from 'lucide-react';
import { SocraticEngine, saveSession } from '@/lib/socraticEngine';
import { generateSocraticQuestion, analyzeBiasesWithAI, generateInsightSuggestion } from '@/lib/groqClient';
import { ThoughtSession, InsightBlock } from '@/types';

export default function ThoughtWorkspace() {
  const [thought, setThought] = useState('');
  const [socraticPrompt, setSocraticPrompt] = useState('');
  const [promptCategory, setPromptCategory] = useState<string>('');
  const [promptReasoning, setPromptReasoning] = useState('');
  const [biases, setBiases] = useState<string[]>([]);
  const [insights, setInsights] = useState<InsightBlock[]>([]);
  const [currentInsight, setCurrentInsight] = useState('');
  const [depthScore, setDepthScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [isLoadingBias, setIsLoadingBias] = useState(false);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [insightSuggestion, setInsightSuggestion] = useState('');

  useEffect(() => {
    if (thought.length > 50) {
      generateAIPrompt();
      analyzeBiases();
      
      const score = SocraticEngine.calculateDepthScore(thought);
      setDepthScore(score);
    } else {
      setSocraticPrompt('');
      setBiases([]);
      setInsightSuggestion('');
    }
  }, [thought]);

  const generateAIPrompt = async () => {
    setIsLoadingPrompt(true);
    try {
      const response = await generateSocraticQuestion(thought);
      setSocraticPrompt(response.question);
      setPromptCategory(response.category);
      setPromptReasoning(response.reasoning);
    } catch (error) {
      console.error('Error generating prompt:', error);
      setSocraticPrompt('What assumptions are you making in your reasoning?');
      setPromptCategory('assumption');
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const analyzeBiases = async () => {
    setIsLoadingBias(true);
    try {
      const detectedBiases = await analyzeBiasesWithAI(thought);
      setBiases(detectedBiases);
    } catch (error) {
      console.error('Error analyzing biases:', error);
      const localBiases = SocraticEngine.detectBiases(thought);
      setBiases(localBiases);
    } finally {
      setIsLoadingBias(false);
    }
  };

  const getSuggestion = async () => {
    setIsLoadingSuggestion(true);
    try {
      const suggestion = await generateInsightSuggestion(thought);
      setInsightSuggestion(suggestion);
    } catch (error) {
      console.error('Error getting suggestion:', error);
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const addInsight = () => {
    if (currentInsight.trim()) {
      const newInsight: InsightBlock = {
        id: Date.now().toString(),
        content: currentInsight,
        reasoning: thought,
        validated: false,
        timestamp: new Date()
      };
      setInsights([...insights, newInsight]);
      setCurrentInsight('');
      setInsightSuggestion('');
    }
  };

  const saveThoughtSession = () => {
    const session: ThoughtSession = {
      id: Date.now().toString(),
      timestamp: new Date(),
      content: thought,
      insights,
      biasFlags: biases,
      duration: Math.floor((Date.now() - startTime) / 1000),
      depthScore
    };
    
    saveSession(session);
    
    setThought('');
    setInsights([]);
    setBiases([]);
    setSocraticPrompt('');
    setDepthScore(0);
    setInsightSuggestion('');
    
    alert('Session saved successfully! 🎉');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      clarification: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      assumption: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      evidence: 'bg-green-500/20 text-green-300 border-green-500/50',
      perspective: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      implication: 'bg-pink-500/20 text-pink-300 border-pink-500/50'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Card className="border border-gray-700/50 bg-gray-900/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />
        <CardHeader className="relative border-b border-gray-700/50 bg-gray-800/30">
          <CardTitle className="flex items-center gap-3 text-2xl text-gray-100">
            <Brain className="h-7 w-7 text-blue-400" />
            Thought Workspace
          </CardTitle>
          <CardDescription className="text-base text-gray-400">
            Express your thoughts freely. AI will guide your reasoning with Socratic questions.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-6 pt-8">
          <div>
            <Textarea
              placeholder="What are you thinking about? Describe a problem, decision, or idea you want to explore deeply..."
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              className="min-h-[240px] text-base leading-relaxed border-2 border-gray-700/50 bg-gray-800/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:bg-gray-800/70 transition-all rounded-xl"
            />
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-400">{thought.split(/\s+/).filter(Boolean).length} words</span>
              <Badge 
                variant={depthScore > 5 ? 'default' : 'secondary'}
                className={`text-sm px-4 py-1.5 ${depthScore > 5 ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-700'} text-white border-0`}
              >
                <Zap className="h-3 w-3 mr-1" />
                Depth Score: {depthScore}/10
              </Badge>
            </div>
          </div>

          {isLoadingPrompt && (
            <Alert className="border border-blue-500/30 bg-blue-950/30 backdrop-blur-sm rounded-xl">
              <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              <AlertDescription className="font-medium text-blue-300">
                AI is analyzing your thought...
              </AlertDescription>
            </Alert>
          )}

          {socraticPrompt && !isLoadingPrompt && (
            <Alert className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm shadow-xl rounded-xl">
              <Brain className="h-6 w-6 text-blue-400" />
              <AlertDescription className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-xl text-blue-100 leading-relaxed">{socraticPrompt}</p>
                  <Badge className={`${getCategoryColor(promptCategory)} border font-medium`}>
                    {promptCategory}
                  </Badge>
                </div>
                {promptReasoning && (
                  <p className="text-sm text-blue-300 italic">{promptReasoning}</p>
                )}
              </AlertDescription>
            </Alert>
          )}

          {isLoadingBias && (
            <Alert className="border border-orange-500/30 bg-orange-950/30 backdrop-blur-sm rounded-xl">
              <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
              <AlertDescription className="font-medium text-orange-300">
                Analyzing for cognitive biases...
              </AlertDescription>
            </Alert>
          )}

          {biases.length > 0 && !isLoadingBias && (
            <Alert className="border-2 border-red-500/50 bg-gradient-to-br from-red-950/50 to-orange-950/50 backdrop-blur-sm shadow-xl rounded-xl">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <AlertDescription>
                <div className="font-semibold mb-4 text-lg text-red-100">⚠️ Potential Cognitive Biases Detected:</div>
                <ul className="space-y-3">
                  {biases.map((bias, index) => (
                    <li key={index} className="text-sm bg-red-900/30 p-3 rounded-lg border border-red-500/30 text-red-200">
                      {bias}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="border border-gray-700/50 bg-gray-900/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 pointer-events-none" />
        <CardHeader className="relative border-b border-gray-700/50 bg-gray-800/30">
          <CardTitle className="flex items-center gap-3 text-xl text-gray-100">
            <Lightbulb className="h-6 w-6 text-green-400" />
            Insight Builder
          </CardTitle>
          <CardDescription className="text-gray-400">
            Capture key insights from your reasoning process
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-5 pt-8">
          <div className="space-y-4">
            <Textarea
              placeholder="What insight have you gained from this thought process?"
              value={currentInsight}
              onChange={(e) => setCurrentInsight(e.target.value)}
              className="min-h-[140px] border-2 border-gray-700/50 bg-gray-800/50 text-gray-100 placeholder:text-gray-500 focus:border-green-500/50 focus:bg-gray-800/70 transition-all rounded-xl"
            />
            
            {thought.length > 50 && !insightSuggestion && (
              <Button 
                onClick={getSuggestion} 
                variant="outline"
                disabled={isLoadingSuggestion}
                className="w-full bg-gray-800/50 border-gray-700/50 text-gray-200 hover:bg-gray-700/50 hover:text-white transition-all"
              >
                {isLoadingSuggestion ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting AI Suggestion...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Insight Suggestion
                  </>
                )}
              </Button>
            )}

            {insightSuggestion && (
              <Alert className="border border-green-500/50 bg-green-950/30 backdrop-blur-sm rounded-xl">
                <Sparkles className="h-5 w-5 text-green-400" />
                <AlertDescription>
                  <p className="font-medium text-green-100 mb-3">AI Suggestion:</p>
                  <p className="text-sm text-green-200 mb-3">{insightSuggestion}</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCurrentInsight(insightSuggestion)}
                    className="bg-green-900/30 border-green-500/50 text-green-200 hover:bg-green-800/50"
                  >
                    Use This Insight
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Button 
            onClick={addInsight} 
            disabled={!currentInsight.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            Add Insight
          </Button>

          {insights.length > 0 && (
            <div className="space-y-4 mt-8">
              <h4 className="font-semibold text-base text-gray-200">Your Insights ({insights.length}):</h4>
              {insights.map((insight) => (
                <Card key={insight.id} className="border-l-4 border-l-green-500 bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow rounded-lg">
                  <CardContent className="pt-5">
                    <p className="text-sm leading-relaxed text-gray-200">{insight.content}</p>
                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                      <Lightbulb className="h-3 w-3" />
                      {new Date(insight.timestamp).toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={saveThoughtSession} 
          disabled={!thought.trim()} 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl px-8 py-6 text-base"
        >
          <Save className="mr-2 h-5 w-5" />
          Save Session
        </Button>
      </div>
    </div>
  );
}