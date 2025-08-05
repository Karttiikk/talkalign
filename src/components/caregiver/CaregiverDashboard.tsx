import { useState } from 'react';
import { mockPatients, mockSessions } from '@/data/mockData';
import { PatientCard } from '@/components/PatientCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Clock, TrendingUp, FileText, MessageSquare } from 'lucide-react';

interface CaregiverDashboardProps {
  onNavigate: (page: string, patientId?: string) => void;
}

export function CaregiverDashboard({ onNavigate }: CaregiverDashboardProps) {
  const [patients] = useState(mockPatients);
  const recentSessions = mockSessions.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-secondary-light to-success-light p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center space-x-3">
              <Heart className="h-6 w-6 text-secondary" />
              <span>Welcome to Your Care Portal</span>
            </h2>
            <p className="text-muted-foreground">
              Stay connected with your child's speech therapy progress and upcoming sessions.
            </p>
          </div>
          <Button 
            onClick={() => onNavigate('session-reports')}
            className="bg-secondary hover:bg-secondary/90"
          >
            <FileText className="h-4 w-4 mr-2" />
            View All Reports
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Heart className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{patients.length}</div>
            <p className="text-xs text-muted-foreground">Under your care</p>
          </CardContent>
        </Card>
        
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">4</div>
            <p className="text-xs text-muted-foreground">Completed sessions</p>
          </CardContent>
        </Card>
        
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(patients.reduce((sum, p) => sum + p.progressScore, 0) / patients.length)}%
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Children/Patients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-secondary" />
              <span>Your Children</span>
            </span>
            <Badge variant="secondary">{patients.length} active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewDetails={(id) => onNavigate('session-reports', id)}
                showActions={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Session Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session) => {
              const patient = patients.find(p => p.id === session.patientId);
              return (
                <div key={session.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center font-semibold">
                        {patient?.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{patient?.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                        </p>
                        <p className="text-sm text-foreground line-clamp-2">
                          {session.summary.substring(0, 120)}...
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <Badge className="bg-success-light text-success">
                            {session.progressScore}% progress
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onNavigate('session-reports', patient?.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Home Practice Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span>Home Practice Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">This Week's Focus</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Daily /r/ sound practice</p>
                    <p className="text-xs text-muted-foreground">Practice for 10 minutes each day using picture cards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Vocabulary building</p>
                    <p className="text-xs text-muted-foreground">Introduce 3 new words related to daily activities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Reading together</p>
                    <p className="text-xs text-muted-foreground">Spend 15 minutes reading picture books</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Helpful Resources</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Home Exercise Sheets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Progress Tracking Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Communication Tips
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}