import { useState } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { UserCircle, Stethoscope, Heart } from 'lucide-react';

interface NavigationProps {
  currentRole: 'slp' | 'caregiver';
  onRoleChange: (role: 'slp' | 'caregiver') => void;
}

export function Navigation({ currentRole, onRoleChange }: NavigationProps) {
  return (
    <header className="bg-card shadow-soft border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TalkAlign
              </h1>
              <p className="text-sm text-muted-foreground">Speech Therapy Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
              <Button
                variant={currentRole === 'slp' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onRoleChange('slp')}
                className="flex items-center space-x-2"
              >
                <Stethoscope className="h-4 w-4" />
                <span>SLP</span>
              </Button>
              <Button
                variant={currentRole === 'caregiver' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onRoleChange('caregiver')}
                className="flex items-center space-x-2"
              >
                <UserCircle className="h-4 w-4" />
                <span>Caregiver</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-success-light text-success">
                {currentRole === 'slp' ? 'Dr. Sarah Wilson' : 'Parent Portal'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}