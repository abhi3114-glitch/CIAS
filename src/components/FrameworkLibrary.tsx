import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { frameworks } from '@/lib/frameworks';
import { Framework } from '@/types';
import { BookOpen, ChevronRight, Target, Lightbulb, Brain, Eye } from 'lucide-react';

export default function FrameworkLibrary() {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  const categories = ['analysis', 'decision', 'logic', 'perspective'] as const;

  const getFrameworksByCategory = (category: typeof categories[number]) => {
    return frameworks.filter(f => f.category === category);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      analysis: <Target className="h-5 w-5" />,
      decision: <Lightbulb className="h-5 w-5" />,
      logic: <Brain className="h-5 w-5" />,
      perspective: <Eye className="h-5 w-5" />
    };
    return icons[category] || <BookOpen className="h-5 w-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      analysis: 'bg-blue-100 text-blue-800 border-blue-300',
      decision: 'bg-green-100 text-green-800 border-green-300',
      logic: 'bg-purple-100 text-purple-800 border-purple-300',
      perspective: 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-purple-600" />
            Thinking Framework Library
          </CardTitle>
          <CardDescription className="text-base">
            Structured approaches to enhance your reasoning and problem-solving
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="flex items-center gap-2 capitalize data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
                >
                  {getCategoryIcon(cat)}
                  <span className="hidden sm:inline">{cat}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-4 mt-6">
                {getFrameworksByCategory(category).map(framework => (
                  <Card 
                    key={framework.id} 
                    className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{framework.name}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {framework.description}
                          </CardDescription>
                        </div>
                        <Badge className={`${getCategoryColor(framework.category)} border font-medium`}>
                          {framework.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="default" 
                            onClick={() => setSelectedFramework(framework)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            View Framework
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl flex items-center gap-2">
                              {getCategoryIcon(framework.category)}
                              {framework.name}
                            </DialogTitle>
                            <DialogDescription className="text-base pt-2">
                              {framework.description}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-8 mt-6">
                            <div>
                              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-600" />
                                Framework Steps
                              </h4>
                              <ol className="space-y-3">
                                {framework.steps.map((step, index) => (
                                  <li key={index} className="flex gap-4 group">
                                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold shadow-md group-hover:scale-110 transition-transform">
                                      {index + 1}
                                    </span>
                                    <span className="pt-1 text-base leading-relaxed">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Brain className="h-5 w-5 text-purple-600" />
                                Guiding Questions
                              </h4>
                              <ul className="space-y-3">
                                {framework.prompts.map((prompt, index) => (
                                  <li key={index} className="flex gap-3 group">
                                    <ChevronRight className="flex-shrink-0 h-5 w-5 text-purple-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                    <span className="text-base leading-relaxed">{prompt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <BookOpen className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-2 text-blue-900">How to Use Frameworks</h4>
              <p className="text-base text-blue-800 leading-relaxed">
                Select a framework that matches your thinking challenge. Follow the steps systematically, 
                and use the guiding questions to deepen your analysis. Frameworks are tools to structure 
                your thought process, not rigid formulas. Adapt them to your specific needs and combine 
                multiple frameworks for complex problems.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}