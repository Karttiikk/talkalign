import { useState } from 'react';
import { mockPatients, mockSessions } from '@/data/mockData';
import { PatientCard } from '@/components/PatientCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, TrendingUp, Plus, BarChart3, FileText } from 'lucide-react';

interface SLPDashboardProps {
  onNavigate: (page: string, patientId?: string) => void;
}

export function SLPDashboard({ onNavigate }: SLPDashboardProps) {
  const [patients] = useState(mockPatients);
  const recentSessions = mockSessions.slice(0, 3);
  
  const totalPatients = patients.length;
  const activeGoals = 8;
  const weeklyProgress = 23;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-light to-accent-light p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome back, Dr. Sarah Wilson
            </h2>
            <p className="text-muted-foreground">
              You have {totalPatients} active patients and {activeGoals} ongoing therapy goals.
            </p>
          </div>
          <Button 
            onClick={() => onNavigate('therapy-plan')}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Session Plan
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">Active this month</p>
          </CardContent>
        </Card>
        
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{activeGoals}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">+{weeklyProgress}%</div>
            <p className="text-xs text-muted-foreground">Average improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col space-y-2"
              onClick={() => onNavigate('therapy-plan')}
            >
              <Plus className="h-6 w-6" />
              <span>Create Therapy Plan</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col space-y-2"
              onClick={() => onNavigate('progress-tracker')}
            >
              <BarChart3 className="h-6 w-6" />
              <span>View Progress</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col space-y-2"
              onClick={() => onNavigate('session-summary')}
            >
              <FileText className="h-6 w-6" />
              <span>Session Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Patients</span>
            <Badge variant="secondary">{patients.length} active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewDetails={(id) => onNavigate('session-summary', id)}
                onStartSession={(id) => onNavigate('therapy-plan', id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Session Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session) => {
              const patient = patients.find(p => p.id === session.patientId);
              return (
                <div key={session.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{patient?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.date).toLocaleDateString()} • {session.duration} min
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-success-light text-success">
                    {session.progressScore}% progress
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}