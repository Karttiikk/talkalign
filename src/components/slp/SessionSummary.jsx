import { useState } from 'react';
import { mockPatients, mockSessions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, FileText, Clock, TrendingUp, MessageSquare, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SessionSummary({ onNavigate, selectedPatientId }) {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState(selectedPatientId || '');
  const [selectedSession, setSelectedSession] = useState('');
  const [slpNotes, setSlpNotes] = useState('');

  const patient = mockPatients.find(p => p.id === selectedPatient);
  const patientSessions = mockSessions.filter(s => s.patientId === selectedPatient);
  const session = patientSessions.find(s => s.id === selectedSession);

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "SLP notes have been saved successfully.",
      className: "bg-success-light text-success border-success"
    });
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-primary text-primary-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Session Summaries</h1>
            <p className="text-muted-foreground">Review AI-generated summaries and add professional notes</p>
          </div>
        </div>
      </div>

      {/* Patient & Session Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {patient && (
              <div className="mt-4 p-4 bg-primary-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {patient.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">Age {patient.age} • {patient.condition}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Session</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedSession} 
              onValueChange={setSelectedSession}
              disabled={!selectedPatient}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a session" />
              </SelectTrigger>
              <SelectContent>
                {patientSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {new Date(session.date).toLocaleDateString()} - {session.duration} min
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {patientSessions.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {patientSessions.length} session(s) available
                </p>
                <div className="flex flex-wrap gap-2">
                  {patientSessions.map((s) => (
                    <Badge 
                      key={s.id} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setSelectedSession(s.id)}
                    >
                      {new Date(s.date).toLocaleDateString()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Session Details */}
      {session && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>AI-Generated Session Summary</span>
                  <Badge className="bg-accent-light text-accent">Auto-Generated</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">{session.summary}</p>
                </div>
              </CardContent>
            </Card>

            {/* Goals Addressed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span>Goals Addressed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {session.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-secondary-light rounded-lg">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-foreground">{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  <span>Recommended Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {session.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Session Metrics & SLP Notes */}
          <div className="space-y-6">
            {/* Session Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Session Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <span className="font-semibold">{session.duration} min</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Progress Score</span>
                  </div>
                  <Badge className={getProgressColor(session.progressScore)}>
                    {session.progressScore}%
                  </Badge>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${session.progressScore}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SLP Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <span>SLP Professional Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your professional observations, modifications to treatment plan, clinical insights..."
                  rows={8}
                  value={slpNotes || session.slpNotes || ''}
                  onChange={(e) => setSlpNotes(e.target.value)}
                />
                
                <Button 
                  onClick={handleSaveNotes}
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Professional Notes
                </Button>
              </CardContent>
            </Card>

            {/* Session Notes from AI */}
            {session.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Session Observations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {session.notes}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!session && selectedPatient && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Session Selected</h3>
            <p className="text-muted-foreground">
              Select a session from the dropdown to view the AI-generated summary and add your professional notes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}