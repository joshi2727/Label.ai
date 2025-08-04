import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { CameraScanner } from '@/components/CameraScanner';
import { IngredientAnalysis } from '@/components/IngredientAnalysis';
import { Camera, Shield, Brain, Users, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-scan.jpg';
import healthyFoodsImage from '@/assets/healthy-foods.jpg';

type AppState = 'landing' | 'onboarding' | 'scanner' | 'analysis';

interface UserData {
  name: string;
  age: number;
  healthGoals: string[];
  allergies: string[];
  dietaryRestrictions: string[];
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [scannedIngredients, setScannedIngredients] = useState<string[]>([]);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setAppState('scanner');
  };

  const handleScanComplete = (ingredients: string[]) => {
    setScannedIngredients(ingredients);
    setAppState('analysis');
  };

  const handleBackToScan = () => {
    setAppState('scanner');
  };

  if (appState === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'scanner') {
    return <CameraScanner onScanComplete={handleScanComplete} />;
  }

  if (appState === 'analysis') {
    return <IngredientAnalysis ingredients={scannedIngredients} onBackToScan={handleBackToScan} userAge={userData?.age} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/5"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up tracking-tight">
                Labal.ai
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6 animate-fade-in-up font-medium" style={{ animationDelay: '200ms' }}>
                Smart Food Safety Analysis
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '400ms' }}>
                Discover what's really in your food with AI-powered ingredient analysis. Get personalized health insights tailored to your age and dietary needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => setAppState('onboarding')}
                className="min-w-[220px] font-medium"
              >
                <Camera className="mr-3 h-5 w-5" />
                Start Scanning
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 min-w-[220px] font-medium"
              >
                <Brain className="mr-3 h-5 w-5" />
                See How It Works
              </Button>
            </div>
            
            {/* Hero Image */}
            <div className="max-w-4xl mx-auto animate-fade-in-scale" style={{ animationDelay: '800ms' }}>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="AI-powered food scanning interface" 
                  className="w-full rounded-3xl shadow-large hover:shadow-glow transition-all duration-500"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24 lg:py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            How Labal.ai Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced AI technology meets personalized health insights to give you complete transparency about your food choices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="text-center group hover:scale-[1.02] transition-all duration-300 border-0">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:animate-subtle-bounce shadow-soft">
                <Camera className="h-9 w-9 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Smart Scanning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Capture ingredients instantly with our advanced OCR technology that reads any label
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:scale-[1.02] transition-all duration-300 border-0">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:animate-subtle-bounce shadow-soft">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">AI Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deep ingredient research using trusted health databases and scientific literature
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:scale-[1.02] transition-all duration-300 border-0">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:animate-subtle-bounce shadow-soft">
                <Shield className="h-9 w-9 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Personalized Safety</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customized warnings based on your age, allergies, and dietary preferences
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:scale-[1.02] transition-all duration-300 border-0">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:animate-subtle-bounce shadow-soft">
                <Zap className="h-9 w-9 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Instant Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get comprehensive health assessments and better alternatives in seconds
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src={healthyFoodsImage} 
                alt="Fresh, healthy ingredients" 
                className="w-full rounded-3xl shadow-large"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Take Control of Your
                <span className="block bg-gradient-primary bg-clip-text text-transparent">Food Choices</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of health-conscious individuals who trust Labal.ai to make informed food decisions. 
                Our AI technology provides personalized insights that empower you to eat with confidence.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full shadow-glow"></div>
                <span className="text-foreground">Personalized health recommendations</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full shadow-glow"></div>
                <span className="text-foreground">Instant allergen detection</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full shadow-glow"></div>
                <span className="text-foreground">Healthier alternative suggestions</span>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => setAppState('onboarding')}
              className="font-medium"
            >
              <Users className="mr-3 h-5 w-5" />
              Start Your Health Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <Card className="p-8 border-0 bg-card hover:shadow-medium transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">50K+</div>
              <div className="text-muted-foreground font-medium">Products Analyzed</div>
            </Card>
            <Card className="p-8 border-0 bg-card hover:shadow-medium transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">99.9%</div>
              <div className="text-muted-foreground font-medium">Accuracy Rate</div>
            </Card>
            <Card className="p-8 border-0 bg-card hover:shadow-medium transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">15K+</div>
              <div className="text-muted-foreground font-medium">Happy Users</div>
            </Card>
            <Card className="p-8 border-0 bg-card hover:shadow-medium transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">24/7</div>
              <div className="text-muted-foreground font-medium">Health Protection</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h4 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">Labal.ai</h4>
            <p className="text-muted-foreground">Your intelligent food safety companion</p>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Empowering healthier choices through advanced AI technology and personalized nutrition insights.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;