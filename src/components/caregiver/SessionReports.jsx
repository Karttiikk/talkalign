import { useState } from 'react';
import { mockPatients, mockSessions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, TrendingUp, FileText, CheckCircle, Star, Heart } from 'lucide-react';

export function SessionReports({ onNavigate, selectedPatientId }) {
  const [selectedPatient, setSelectedPatient] = useState(selectedPatientId || '');
  
  const patient = mockPatients.find(p => p.id === selectedPatient);
  const patientSessions = mockSessions.filter(s => s.patientId === selectedPatient);

  const getProgressEmoji = (score) => {
    if (score >= 80) return '🌟';
    if (score >= 60) return '🎯';
    return '📈';
  };

  const getProgressMessage = (score) => {
    if (score >= 80) return 'Excellent progress! Keep up the great work!';
    if (score >= 60) return 'Good improvement! Continue practicing at home.';
    return 'Making steady progress. Keep encouraging!';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => onNavigate('caregiver-dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Session Reports</h1>
            <p className="text-muted-foreground">View detailed reports and progress updates</p>
          </div>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-secondary" />
            <span>Select Child</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Choose your child to view reports" />
            </SelectTrigger>
            <SelectContent>
              {mockPatients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name} (Age {patient.age})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {patient && (
            <div className="mt-4 p-4 bg-secondary-light rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  {patient.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                  <p className="text-muted-foreground">Age {patient.age} • {patient.condition}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className="bg-success-light text-success">
                      Overall Progress: {patient.progressScore}%
                    </Badge>
                    <span className="text-lg">{getProgressEmoji(patient.progressScore)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {patient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-accent" />
              <span>Progress Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-primary-light rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">{patientSessions.length}</div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
              <div className="text-center p-4 bg-success-light rounded-lg">
                <div className="text-3xl font-bold text-success mb-2">{patient.progressScore}%</div>
                <p className="text-sm text-muted-foreground">Current Progress</p>
              </div>
              <div className="text-center p-4 bg-accent-light rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">
                  {Math.round(patientSessions.reduce((sum, s) => sum + s.duration, 0) / 60)}h
                </div>
                <p className="text-sm text-muted-foreground">Total Therapy Time</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-success-light to-accent-light rounded-lg">
              <p className="text-center text-foreground font-medium">
                {getProgressMessage(patient.progressScore)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session History */}
      {selectedPatient && patientSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Session History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {patientSessions.map((session) => (
                <div key={session.id} className="border border-border rounded-lg p-6 hover:shadow-soft transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center font-semibold">
                        {new Date(session.date).getDate()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Session on {new Date(session.date).toLocaleDateString()}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{session.duration} minutes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{session.progressScore}% progress</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={
                          session.progressScore >= 80 
                            ? 'bg-success text-success-foreground' 
                            : session.progressScore >= 60 
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-primary text-primary-foreground'
                        }
                      >
                        {getProgressEmoji(session.progressScore)} {session.progressScore}%
                      </Badge>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-4">
                    <h5 className="font-medium text-foreground mb-2">What happened in this session:</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted p-3 rounded-lg">
                      {session.summary}
                    </p>
                  </div>

                  {/* Goals Worked On */}
                  <div className="mb-4">
                    <h5 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span>Goals Worked On:</span>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {session.goals.map((goal, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-accent-light p-4 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2">What to practice at home:</h5>
                    <ul className="space-y-1">
                      {session.nextSteps.map((step, index) => (
                        <li key={index} className="text-sm text-foreground flex items-start space-x-2">
                          <span className="text-accent font-bold">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!selectedPatient && (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Select Your Child</h3>
            <p className="text-muted-foreground">
              Choose your child from the dropdown above to view their session reports and progress.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedPatient && patientSessions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Sessions Yet</h3>
            <p className="text-muted-foreground">
              No therapy sessions have been recorded for {patient?.name} yet. 
              Sessions will appear here after they are completed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}