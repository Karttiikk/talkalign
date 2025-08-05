import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Stethoscope, UserCircle, Eye, EyeOff, ArrowLeft, Lock, Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLogin: (role: 'slp' | 'caregiver') => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<'slp' | 'caregiver'>('slp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials
  const demoCredentials = {
    slp: {
      email: 'dr.wilson@talkalign.com',
      password: 'slp123',
      name: 'Dr. Sarah Wilson'
    },
    caregiver: {
      email: 'parent@talkalign.com',
      password: 'parent123',
      name: 'Parent Portal'
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const credentials = demoCredentials[selectedRole];
    
    if (email === credentials.email && password === credentials.password) {
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${credentials.name}`,
        className: "bg-success-light text-success border-success"
      });
      
      setTimeout(() => {
        onLogin(selectedRole);
      }, 500);
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password, or use the demo credentials.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    const credentials = demoCredentials[selectedRole];
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-accent-light to-secondary-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="absolute top-6 left-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TalkAlign
              </h1>
              <p className="text-sm text-muted-foreground">Speech Therapy Platform</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border border-border shadow-soft">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your TalkAlign account</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={selectedRole === 'slp' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('slp')}
                  className="h-16 flex flex-col space-y-1"
                >
                  <Stethoscope className="h-5 w-5" />
                  <span className="text-xs">Speech Therapist</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === 'caregiver' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('caregiver')}
                  className="h-16 flex flex-col space-y-1"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="text-xs">Parent/Caregiver</span>
                </Button>
              </div>
            </div>

            {/* Demo Credentials Banner */}
            <div className="bg-accent-light border border-accent/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-accent text-accent-foreground">Demo Mode</Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fillDemoCredentials}
                  className="text-xs"
                >
                  Use Demo Credentials
                </Button>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">
                  {selectedRole === 'slp' ? 'Speech Therapist' : 'Parent/Caregiver'} Demo:
                </p>
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {demoCredentials[selectedRole].email}
                </p>
                <p className="text-muted-foreground">
                  <strong>Password:</strong> {demoCredentials[selectedRole].password}
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {selectedRole === 'slp' ? <Stethoscope className="h-4 w-4" /> : <UserCircle className="h-4 w-4" />}
                    <span>Sign In as {selectedRole === 'slp' ? 'Therapist' : 'Caregiver'}</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="text-center space-y-2">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot your password?
              </Button>
              <p className="text-xs text-muted-foreground">
                New to TalkAlign? <Button variant="link" className="text-xs p-0 h-auto">Request access</Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 This is a demo environment. No real patient data is stored.
          </p>
        </div>
      </div>
    </div>
  );
}