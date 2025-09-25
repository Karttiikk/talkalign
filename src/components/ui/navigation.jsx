import { useState } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { UserCircle, Stethoscope, Heart, LogOut } from 'lucide-react';

export function Navigation({ currentRole, onRoleChange, onLogout, isAuthenticated = true }) {
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
          
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-success-light text-success flex items-center space-x-2">
                  {currentRole === 'slp' ? (
                    <>
                      <Stethoscope className="h-4 w-4" />
                      <span>Dr. Sarah Wilson</span>
                    </>
                  ) : (
                    <>
                      <UserCircle className="h-4 w-4" />
                      <span>Parent Portal</span>
                    </>
                  )}
                </Badge>
                
                {onLogout && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}