import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { CameraScanner } from '@/components/CameraScanner';
import { IngredientAnalysis } from '@/components/IngredientAnalysis';
import { Camera, Shield, Brain, Users, Zap, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-mesh">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Brand */}
            <div className="mb-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  label.ai
                </h1>
              </div>
              <p className="text-lg text-muted-foreground mb-2">
                AI-Powered Food Safety Scanner
              </p>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Instantly analyze ingredient lists, identify health risks, and get personalized recommendations based on your profile.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Button 
                variant="scanner" 
                size="xl" 
                onClick={() => setAppState('onboarding')}
                className="min-w-[200px] group"
              >
                <Camera className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Scanning
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="min-w-[200px] group"
              >
                <Brain className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                How It Works
              </Button>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="bg-card rounded-2xl p-8 shadow-soft-lg border">
                <div className="flex items-center justify-center h-48 bg-muted rounded-xl mb-4">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Point camera at ingredient list</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-soft-pulse"></div>
                  AI analyzing ingredients...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-foreground">
            How label.ai Protects Your Health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced AI technology meets personalized health insights to keep you informed about what you eat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: Camera,
              title: "Smart Scanning",
              description: "Advanced OCR technology instantly extracts and identifies all ingredients from packaging",
              delay: "0ms"
            },
            {
              icon: Brain,
              title: "AI Analysis",
              description: "Comprehensive ingredient research using trusted health databases and scientific studies",
              delay: "100ms"
            },
            {
              icon: Shield,
              title: "Personal Safety",
              description: "Customized warnings based on your age, allergies, and health goals for maximum protection",
              delay: "200ms"
            },
            {
              icon: Zap,
              title: "Instant Results",
              description: "Get comprehensive health verdicts and alternative recommendations in seconds",
              delay: "300ms"
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className="text-center group hover:scale-[1.02] transition-all duration-200 animate-fade-in-up" 
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <h3 className="text-2xl font-semibold text-foreground">
              Take Control of Your Food Safety
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Join thousands of health-conscious individuals who trust label.ai to make informed food choices. 
              Our AI analyzes ingredients against your personal health profile.
            </p>
            
            <div className="space-y-4">
              {[
                "Personalized for your age and health goals",
                "Instant allergen and health risk detection",
                "Healthier alternative suggestions"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="default" 
              size="lg" 
              onClick={() => setAppState('onboarding')}
              className="group"
            >
              <Users className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Start Your Health Journey
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Health Score</span>
                  <span className="text-2xl font-bold text-success">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-success rounded-full"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-success">Safe</div>
                    <div className="text-xs text-muted-foreground">8 ingredients</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-warning">Caution</div>
                    <div className="text-xs text-muted-foreground">2 ingredients</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-destructive">Warning</div>
                    <div className="text-xs text-muted-foreground">0 ingredients</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Products Scanned" },
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "15K+", label: "Active Users" },
              { value: "24/7", label: "Health Protection" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">label.ai</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your AI-powered food safety companion</p>
            <p className="text-xs text-muted-foreground">
              Built with advanced AI technology to protect your health and well-being.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;