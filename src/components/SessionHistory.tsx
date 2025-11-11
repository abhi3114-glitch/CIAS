import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSessions, clearSessions } from '@/lib/socraticEngine';
import { ThoughtSession } from '@/types';
import { History, TrendingUp, Brain, Clock, Trash2 } from 'lucide-react';

export default function SessionHistory() {
  const [sessions, setSessions] = useState<ThoughtSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ThoughtSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const loadedSessions = getSessions();
    setSessions(loadedSessions.reverse()); // Most recent first
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all session history? This cannot be undone.')) {
      clearSessions();
      setSessions([]);
      setSelectedSession(null);
    }
  };

  const calculateAverageDepth = () => {
    if (sessions.length === 0) return 0;
    const total = sessions.reduce((sum, s) => sum + s.depthScore, 0);
    return (total / sessions.length).toFixed(1);
  };

  const getTotalThinkingTime = () => {
    const total = sessions.reduce((sum, s) => sum + s.duration, 0);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedSession) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedSession(null)}>
            ← Back to History
          </Button>
          <Badge variant="outline">
            Depth Score: {selectedSession.depthScore}/10
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>
              {formatDate(selectedSession.timestamp)} • {Math.floor(selectedSession.duration / 60)} minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Thought Content:</h4>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedSession.content}
                </p>
              </div>
            </div>

            {selectedSession.insights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Insights Captured:</h4>
                <div className="space-y-2">
                  {selectedSession.insights.map(insight => (
                    <Card key={insight.id}>
                      <CardContent className="pt-4">
                        <p className="text-sm">{insight.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedSession.biasFlags.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Cognitive Biases Detected:</h4>
                <ul className="space-y-1">
                  {selectedSession.biasFlags.map((bias, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {bias}
                    </li>
                  ))}
                </ul>
              </div>
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Session History
              </CardTitle>
              <CardDescription>
                Review your thinking sessions and track cognitive progress
              </CardDescription>
            </div>
            {sessions.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Sessions Yet</h3>
              <p className="text-sm text-muted-foreground">
                Start thinking in the Thought Workspace to build your session history
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sessions.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Depth Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {calculateAverageDepth()}/10
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Thinking Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {getTotalThinkingTime()}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map(session => (
                  <Card 
                    key={session.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedSession(session)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm line-clamp-2 mb-2">
                            {session.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formatDate(session.timestamp)}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {Math.floor(session.duration / 60)}m
                            </span>
                            <span className="flex items-center gap-1">
                              <Brain className="h-3 w-3" />
                              {session.insights.length} insights
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {session.depthScore}/10
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}