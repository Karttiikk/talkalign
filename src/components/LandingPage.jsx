import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Stethoscope, 
  UserCircle, 
  TrendingUp, 
  Target, 
  Calendar,
  BarChart3,
  FileText,
  MessageSquare,
  CheckCircle,
  Star,
  ArrowRight,
  Play
} from 'lucide-react';

export function LandingPage({ onGetStarted }) {
  const features = [
    {
      icon: Target,
      title: 'Personalized Therapy Plans',
      description: 'Create custom therapy goals and track progress with AI-powered insights.',
      color: 'text-primary'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Visual charts and detailed reports to monitor improvement over time.',
      color: 'text-secondary'
    },
    {
      icon: MessageSquare,
      title: 'AI Session Summaries',
      description: 'Automatically generated session reports with professional insights.',
      color: 'text-accent'
    },
    {
      icon: Heart,
      title: 'Family Portal',
      description: 'Keep caregivers informed with progress updates and home practice tips.',
      color: 'text-success'
    },
    {
      icon: Calendar,
      title: 'Session Management',
      description: 'Schedule and organize therapy sessions with integrated planning tools.',
      color: 'text-warning'
    },
    {
      icon: CheckCircle,
      title: 'Goal Tracking',
      description: 'Set, monitor, and achieve speech therapy milestones effectively.',
      color: 'text-primary'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Speech-Language Pathologist',
      content: 'TalkAlign has transformed how I manage my patients. The AI summaries save me hours each week.',
      avatar: 'SM'
    },
    {
      name: 'Jennifer Rodriguez',
      role: 'Parent',
      content: 'Finally, I can see exactly how my daughter is progressing and what to practice at home.',
      avatar: 'JR'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Clinic Director',
      content: 'The progress tracking features have improved our patient outcomes significantly.',
      avatar: 'MC'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
                <p className="text-xs text-muted-foreground">Speech Therapy Platform</p>
              </div>
            </div>
            
            <Button onClick={onGetStarted} className="bg-gradient-to-r from-primary to-secondary">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light via-accent-light to-secondary-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary-glow text-primary" variant="secondary">
              ✨ Revolutionizing Speech Therapy
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Empower Speech Therapy with
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                AI-Driven Insights
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect speech-language pathologists with families through intelligent progress tracking, 
              personalized therapy plans, and seamless communication tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onGetStarted} 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 h-auto"
              >
                Start Free Demo
                <Play className="h-5 w-5 ml-2" />
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                <Stethoscope className="h-5 w-5 mr-2" />
                For Professionals
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">For SLPs</h3>
                <p className="text-muted-foreground">Professional tools for therapy management</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">For Families</h3>
                <p className="text-muted-foreground">Stay connected with your child's progress</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">AI-Powered</h3>
                <p className="text-muted-foreground">Intelligent insights and automation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Effective Speech Therapy
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed for both speech-language pathologists and families 
              to achieve better outcomes together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How TalkAlign Works</h2>
            <p className="text-xl text-muted-foreground">Simple, effective, and designed for results</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Create Therapy Plans</h3>
              <p className="text-muted-foreground leading-relaxed">
                SLPs design personalized therapy goals and session plans tailored to each patient's needs and progress level.
              </p>
            </div>
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full text-secondary-foreground font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI generates detailed session summaries and progress reports, making it easy to monitor improvement over time.
              </p>
            </div>
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full text-accent-foreground font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Engage Families</h3>
              <p className="text-muted-foreground leading-relaxed">
                Families stay informed with progress updates and receive specific home practice recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by Professionals</h2>
            <p className="text-xl text-muted-foreground">See what speech therapy professionals and families are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-accent fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Speech Therapy?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of professionals and families using TalkAlign to achieve better outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 h-auto bg-white text-primary hover:bg-white/90"
            >
              Try Demo Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
          
          <p className="text-white/80 mt-6 text-sm">
            No credit card required • Free demo credentials available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TalkAlign
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering speech therapy through intelligent technology and compassionate care.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 TalkAlign. Built with ❤️ for the speech therapy community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}