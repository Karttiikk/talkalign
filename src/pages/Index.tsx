import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';
import { Navigation } from '@/components/ui/navigation';
import { SLPDashboard } from '@/components/slp/SLPDashboard';
import { TherapyPlan } from '@/components/slp/TherapyPlan';
import { SessionSummary } from '@/components/slp/SessionSummary';
import { ProgressTracker } from '@/components/slp/ProgressTracker';
import { CaregiverDashboard } from '@/components/caregiver/CaregiverDashboard';
import { SessionReports } from '@/components/caregiver/SessionReports';

type UserRole = 'slp' | 'caregiver';
type Page = 'landing' | 'login' | 'dashboard' | 'therapy-plan' | 'session-summary' | 'progress-tracker' | 'caregiver-dashboard' | 'session-reports';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('slp');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    setCurrentPage(role === 'slp' ? 'dashboard' : 'caregiver-dashboard');
    setSelectedPatientId('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    setCurrentRole('slp');
    setSelectedPatientId('');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentPage(role === 'slp' ? 'dashboard' : 'caregiver-dashboard');
    setSelectedPatientId('');
  };

  const handleNavigation = (page: string, patientId?: string) => {
    setCurrentPage(page as Page);
    if (patientId) {
      setSelectedPatientId(patientId);
    }
  };

  // Landing page
  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Login page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={handleBackToLanding} />;
  }

  // Main application (authenticated)
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <SLPDashboard onNavigate={handleNavigation} />;
      case 'therapy-plan':
        return <TherapyPlan onNavigate={handleNavigation} selectedPatientId={selectedPatientId} />;
      case 'session-summary':
        return <SessionSummary onNavigate={handleNavigation} selectedPatientId={selectedPatientId} />;
      case 'progress-tracker':
        return <ProgressTracker onNavigate={handleNavigation} />;
      case 'caregiver-dashboard':
        return <CaregiverDashboard onNavigate={handleNavigation} />;
      case 'session-reports':
        return <SessionReports onNavigate={handleNavigation} selectedPatientId={selectedPatientId} />;
      default:
        return <SLPDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentRole={currentRole} 
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
