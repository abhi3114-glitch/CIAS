import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cognitiveExercises } from '@/lib/frameworks';
import { CognitiveExercise } from '@/types';
import { Dumbbell, Clock, Lightbulb, Trophy } from 'lucide-react';

export default function CognitiveExercises() {
  const [selectedExercise, setSelectedExercise] = useState<CognitiveExercise | null>(null);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const startExercise = (exercise: CognitiveExercise) => {
    setSelectedExercise(exercise);
    setAnswer('');
    setShowHints(false);
    setTimeLeft(exercise.timeLimit || null);
  };

  const submitAnswer = () => {
    if (selectedExercise && answer.trim()) {
      setCompleted([...completed, selectedExercise.id]);
      alert('Exercise completed! Your response has been recorded.');
      setSelectedExercise(null);
      setAnswer('');
      setTimeLeft(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const exercisesByType = (type: CognitiveExercise['type']) => {
    return cognitiveExercises.filter(ex => ex.type === type);
  };

  if (selectedExercise) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedExercise.title}</CardTitle>
                <CardDescription className="mt-2">
                  {selectedExercise.description}
                </CardDescription>
              </div>
              <Badge variant={
                selectedExercise.difficulty === 'easy' ? 'secondary' :
                selectedExercise.difficulty === 'medium' ? 'default' : 'destructive'
              }>
                {selectedExercise.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeLeft !== null && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Remaining
                  </span>
                  <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                </div>
                <Progress 
                  value={(timeLeft / (selectedExercise.timeLimit || 1)) * 100} 
                  className="h-2"
                />
              </div>
            )}

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm leading-relaxed">{selectedExercise.prompt}</p>
            </div>

            <Textarea
              placeholder="Write your response here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[200px]"
            />

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowHints(!showHints)}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                {showHints ? 'Hide' : 'Show'} Hints
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedExercise(null)}>
                  Cancel
                </Button>
                <Button onClick={submitAnswer} disabled={!answer.trim()}>
                  Submit Response
                </Button>
              </div>
            </div>

            {showHints && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Hints</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedExercise.hints.map((hint, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Cognitive Exercise Library
          </CardTitle>
          <CardDescription>
            Strengthen your thinking through targeted mental workouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reasoning" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
              <TabsTrigger value="logic">Logic</TabsTrigger>
              <TabsTrigger value="bias">Bias Detection</TabsTrigger>
              <TabsTrigger value="decision">Decision Making</TabsTrigger>
            </TabsList>

            {(['reasoning', 'logic', 'bias', 'decision'] as const).map(type => (
              <TabsContent key={type} value={type} className="space-y-4 mt-4">
                {exercisesByType(type).map(exercise => (
                  <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">{exercise.title}</CardTitle>
                            {completed.includes(exercise.id) && (
                              <Trophy className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <CardDescription>{exercise.description}</CardDescription>
                        </div>
                        <Badge variant={
                          exercise.difficulty === 'easy' ? 'secondary' :
                          exercise.difficulty === 'medium' ? 'default' : 'destructive'
                        }>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {exercise.timeLimit && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {Math.floor(exercise.timeLimit / 60)} minutes
                          </span>
                        )}
                        <Button onClick={() => startExercise(exercise)}>
                          Start Exercise
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Dumbbell className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-medium mb-2">Exercise Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Regular cognitive exercises strengthen your reasoning abilities, improve bias awareness, 
                and build mental endurance. Complete exercises consistently to see measurable improvements 
                in your thinking clarity and decision-making quality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}