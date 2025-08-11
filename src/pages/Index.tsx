import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { CameraScanner } from '@/components/CameraScanner';
import { IngredientAnalysis } from '@/components/IngredientAnalysis';
import { BentoGrid, BentoCard } from '@/components/BentoGrid';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Camera, Shield, Brain, Users, Zap, Scan, Star, Award, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-scan.jpg';
import healthyFoodsImage from '@/assets/mobile-scan-illustration.jpg';

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Label.ai
          </h1>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/5"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="mb-16 space-y-8">
                <h1 className="font-bold text-white mb-6 tracking-tight">
                  Label.ai
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 mb-6 font-medium">
                  Smart Food Safety Analysis
                </p>
                <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover what's really in your food with AI-powered ingredient analysis. Get personalized health insights tailored to your age and dietary needs.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={() => setAppState('onboarding')}
                  className="min-w-[220px] font-medium transform hover:scale-105 transition-all duration-200"
                >
                  <Camera className="mr-3 h-5 w-5" />
                  Start Scanning
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="min-w-[220px] font-medium transform hover:scale-105 transition-all duration-200"
                >
                  <Brain className="mr-3 h-5 w-5" />
                  See How It Works
                </Button>
              </div>
            </ScrollReveal>
            
            {/* Hero Image */}
            <ScrollReveal delay={400}>
              <div className="max-w-5xl mx-auto">
                <div className="relative">
                  <img 
                    src={heroImage} 
                    alt="Person scanning a food label with a phone - Label.ai" 
                    loading="eager"
                    decoding="async"
                    className="w-full rounded-lg shadow-large hover:shadow-glow transition-all duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-t from-primary/30 via-primary/10 to-transparent mix-blend-multiply"></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="container mx-auto px-6 py-24 lg:py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="font-bold mb-6 text-foreground tracking-tight">
              How Label.ai Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Advanced AI technology meets personalized health insights to give you complete transparency about your food choices.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <BentoGrid className="mb-20">
            <BentoCard size="md" className="bg-gradient-primary text-white">
              <div className="flex-1 flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl mb-6 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Smart Scanning</h3>
                <p className="text-white/80 leading-relaxed">
                  Capture ingredients instantly with our advanced OCR technology that reads any label with 99.9% accuracy
                </p>
              </div>
            </BentoCard>

            <BentoCard size="sm">
              <div className="flex-1 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">AI Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deep ingredient research using trusted databases
                </p>
              </div>
            </BentoCard>

            <BentoCard size="sm">
              <div className="flex-1 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Personalized Safety</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Customized warnings based on your profile
                </p>
              </div>
            </BentoCard>

            <BentoCard size="lg" className="bg-gradient-hero text-white">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl mb-6 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Instant Health Insights</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Get comprehensive health assessments and better alternatives in seconds. Our AI analyzes ingredients for safety, allergens, and nutritional value.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm text-white/70">Products Analyzed</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">15K+</div>
                    <div className="text-sm text-white/70">Happy Users</div>
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard size="sm">
              <div className="flex-1 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Scan className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Real-time Results</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instant analysis and recommendations
                </p>
              </div>
            </BentoCard>

            <BentoCard size="sm">
              <div className="flex-1 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">WCAG Compliant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accessible design for everyone
                </p>
              </div>
            </BentoCard>
          </BentoGrid>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={300}>
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <img 
                  src={healthyFoodsImage} 
                  alt="Mobile food label scanning illustration" 
                  loading="lazy"
                  className="w-full rounded-lg shadow-large group-hover:shadow-glow transition-all duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground leading-tight">
                  Take Control of Your
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">Food Choices</span>
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of health-conscious individuals who trust Label.ai to make informed food decisions. 
                  Our AI technology provides personalized insights that empower you to eat with confidence.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow"></div>
                  <span className="text-foreground">Personalized health recommendations</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow"></div>
                  <span className="text-foreground">Instant allergen detection</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow"></div>
                  <span className="text-foreground">Healthier alternative suggestions</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => setAppState('onboarding')}
                className="font-medium transform hover:scale-105 transition-all duration-200"
              >
                <Users className="mr-3 h-5 w-5" />
                Start Your Health Journey
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <BentoGrid className="!grid-cols-2 lg:!grid-cols-4 !auto-rows-[200px]">
              <BentoCard size="sm" className="!row-span-1 !col-span-1 text-center">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">50K+</div>
                  <div className="text-muted-foreground font-medium">Products Analyzed</div>
                </div>
              </BentoCard>
              <BentoCard size="sm" className="!row-span-1 !col-span-1 text-center">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">99.9%</div>
                  <div className="text-muted-foreground font-medium">Accuracy Rate</div>
                </div>
              </BentoCard>
              <BentoCard size="sm" className="!row-span-1 !col-span-1 text-center">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">15K+</div>
                  <div className="text-muted-foreground font-medium">Happy Users</div>
                </div>
              </BentoCard>
              <BentoCard size="sm" className="!row-span-1 !col-span-1 text-center">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">24/7</div>
                  <div className="text-muted-foreground font-medium">Health Protection</div>
                </div>
              </BentoCard>
            </BentoGrid>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h4 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">Label.ai</h4>
                <p className="text-xl text-muted-foreground">Your intelligent food safety companion</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Empowering healthier choices through advanced AI technology and personalized nutrition insights. 
                Join the future of food safety today.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                <span>&copy; 2024 Label.ai</span>
                <span>•</span>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
};

export default Index;