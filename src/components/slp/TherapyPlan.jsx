import { useState } from 'react';
import { mockPatients, mockTherapyGoals } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Save, Plus, Target, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function TherapyPlan({ onNavigate, selectedPatientId }) {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState(selectedPatientId || '');
  const [goals, setGoals] = useState(mockTherapyGoals);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    patientId: selectedPatient
  });

  const patient = mockPatients.find(p => p.id === selectedPatient);
  const patientGoals = goals.filter(g => g.patientId === selectedPatient);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !selectedPatient) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a patient.",
        variant: "destructive"
      });
      return;
    }

    const goal: TherapyGoal = {
      id: Date.now().toString(),
      patientId: selectedPatient,
      title: newGoal.title,
      description: newGoal.description,
      targetDate: newGoal.targetDate,
      status: 'active',
      progress: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', targetDate: '', patientId: selectedPatient });
    
    toast({
      title: "Success",
      description: "Therapy goal created successfully!",
      className: "bg-success-light text-success border-success"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
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
            <h1 className="text-2xl font-bold text-foreground">Therapy Plan Management</h1>
            <p className="text-muted-foreground">Create and manage therapy goals for your patients</p>
          </div>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <span>Select Patient</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Choose a patient to create goals for" />
            </SelectTrigger>
            <SelectContent>
              {mockPatients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name} (Age {patient.age}) - {patient.condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {patient && (
            <div className="mt-4 p-4 bg-primary-light rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {patient.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {patient.condition} • Current Progress: {patient.progressScore}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Goals */}
      {selectedPatient && patientGoals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-secondary" />
              <span>Current Goals for {patient?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientGoals.map((goal) => (
                <div key={goal.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      <span>Created: {new Date(goal.createdDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create New Goal */}
      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-accent" />
              <span>Create New Therapy Goal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalTitle">Goal Title</Label>
                <Input
                  id="goalTitle"
                  placeholder="e.g., Improve /r/ sound production"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goalDescription">Goal Description & Objectives</Label>
              <Textarea
                id="goalDescription"
                placeholder="Describe the specific objectives, success criteria, and methodology for this therapy goal..."
                rows={4}
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setNewGoal({ title: '', description: '', targetDate: '', patientId: selectedPatient })}>
                Clear
              </Button>
              <Button onClick={handleAddGoal} className="bg-gradient-to-r from-primary to-secondary">
                <Save className="h-4 w-4 mr-2" />
                Save Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Notes Template */}
      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-warning" />
              <span>Session Planning Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Session Duration (minutes)</Label>
                <Select defaultValue="45">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Session Type</Label>
                <Select defaultValue="individual">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Therapy</SelectItem>
                    <SelectItem value="group">Group Session</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Session Objectives</Label>
              <Textarea
                placeholder="List the specific objectives for the upcoming session..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Materials & Activities</Label>
              <Textarea
                placeholder="Describe materials needed and planned activities..."
                rows={3}
              />
            </div>
            
            <Button className="w-full bg-gradient-to-r from-secondary to-accent">
              <Save className="h-4 w-4 mr-2" />
              Save Session Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
