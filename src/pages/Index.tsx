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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 animate-gradient-x"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-down">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-float">
                  label.ai
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                AI-Powered Food Safety Scanner
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
                Instantly analyze ingredient lists, identify health risks, and get personalized recommendations based on your age and health goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '600ms' }}>
              <Button 
                variant="scanner" 
                size="xl" 
                onClick={() => setAppState('onboarding')}
                className="min-w-[200px] hover:scale-105 transition-all duration-300 animate-shimmer bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%]"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Scanning
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-w-[200px] hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Brain className="mr-2 h-5 w-5" />
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative container mx-auto px-4 -mt-10">
          <div className="max-w-3xl mx-auto">
            <img 
              src={heroImage} 
              alt="AI-powered food scanning technology" 
              className="w-full rounded-2xl shadow-2xl animate-rotate-in border-4 border-white/20 hover:scale-105 transition-transform duration-500"
              style={{ animationDelay: '800ms' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            How label.ai Protects Your Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI technology meets personalized health insights to keep you informed about what you eat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-health group hover:scale-105 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-safe rounded-full mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle animate-morph">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Smart Scanning</h3>
              <p className="text-sm text-muted-foreground">
                Advanced OCR technology instantly extracts and identifies all ingredients from packaging
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-health group hover:scale-105 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-health rounded-full mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle animate-morph">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive ingredient research using trusted health databases and scientific studies
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-health group hover:scale-105 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-caution rounded-full mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle animate-morph">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Personal Safety</h3>
              <p className="text-sm text-muted-foreground">
                Customized warnings based on your age, allergies, and health goals for maximum protection
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-health group hover:scale-105 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle animate-morph">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive health verdicts and alternative recommendations in seconds
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-scale-in" style={{ animationDelay: '600ms' }}>
              <img 
                src={healthyFoodsImage} 
                alt="Healthy, natural food ingredients" 
                className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '700ms' }}>
            <h3 className="text-2xl md:text-3xl font-bold">
              Take Control of Your 
              <span className="bg-gradient-health bg-clip-text text-transparent"> Food Safety</span>
            </h3>
            <p className="text-muted-foreground">
              Join thousands of health-conscious individuals who trust label.ai to make informed food choices. 
              Our AI analyzes ingredients against your personal health profile to give you the confidence to eat safely.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Personalized for your age and health goals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Instant allergen and health risk detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Healthier alternative suggestions</span>
              </div>
            </div>

            <Button 
              variant="health" 
              size="lg" 
              onClick={() => setAppState('onboarding')}
              className="w-full sm:w-auto hover:scale-105 transition-all duration-300 animate-shimmer bg-gradient-to-r from-success via-primary to-success bg-[length:200%_100%]"
            >
              <Users className="mr-2 h-4 w-4" />
              Start Your Health Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-hero text-white py-16 animate-gradient-x">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-float">50K+</div>
              <div className="text-white/80">Products Scanned</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-float" style={{ animationDelay: '500ms' }}>99.9%</div>
              <div className="text-white/80">Accuracy Rate</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-float" style={{ animationDelay: '1s' }}>15K+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '400ms' }}>
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-float" style={{ animationDelay: '1.5s' }}>24/7</div>
              <div className="text-white/80">Health Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h4 className="text-lg font-semibold bg-gradient-hero bg-clip-text text-transparent">label.ai</h4>
            <p className="text-sm text-muted-foreground">Your AI-powered food safety companion</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with advanced AI technology to protect your health and well-being.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;