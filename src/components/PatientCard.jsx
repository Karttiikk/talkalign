import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, TrendingUp, Clock } from 'lucide-react';

export function PatientCard({ patient, onViewDetails, onStartSession, showActions = true }) {
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-primary text-primary-foreground';
  };

  const getProgressText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Improving';
  };

  return (
    <Card className="hover:shadow-soft transition-all duration-300 hover:-translate-y-1 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 bg-primary-light">
            <AvatarFallback className="text-primary font-semibold">
              {patient.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">Age {patient.age} • {patient.condition}</p>
          </div>
          <Badge className={getProgressColor(patient.progressScore)}>
            {patient.progressScore}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last session: {new Date(patient.lastSession).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success font-medium">{getProgressText(patient.progressScore)}</span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${patient.progressScore}%` }}
          />
        </div>
        
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(patient.id)}
              className="flex-1"
            >
              View Details
            </Button>
            {onStartSession && (
              <Button 
                size="sm" 
                onClick={() => onStartSession(patient.id)}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Clock className="h-4 w-4 mr-1" />
                New Session
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}