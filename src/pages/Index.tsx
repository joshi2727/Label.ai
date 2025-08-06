
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/DashboardLayout';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { CameraScanner } from '@/components/CameraScanner';
import { IngredientAnalysis } from '@/components/IngredientAnalysis';
import { BentoGrid, BentoCard } from '@/components/BentoGrid';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Camera, Shield, Brain, Users, Zap, Scan, CheckCircle, Star, Award } from 'lucide-react';
import heroImage from '@/assets/hero-ghibli.jpg';
import mobileImage from '@/assets/mobile-scanning-clean.jpg';

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
    <DashboardLayout currentPage="home">
      <div className="min-h-screen bg-[hsl(var(--surface-0))]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/5"></div>
          
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left">
                <ScrollReveal>
                  <div className="space-y-6">
                    <h1 className="font-bold text-white mb-4 tracking-tight">
                      Label.ai
                    </h1>
                    <p className="text-xl text-white/90 mb-6 leading-relaxed">
                      Smart food safety analysis powered by AI. Get personalized health insights tailored to your age and dietary needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button 
                        variant="hero" 
                        size="lg" 
                        onClick={() => setAppState('onboarding')}
                        className="min-w-[180px]"
                      >
                        <Camera className="mr-3 h-5 w-5" />
                        Start Scanning
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="min-w-[180px]"
                      >
                        <Brain className="mr-3 h-5 w-5" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column - Hero Image */}
              <ScrollReveal delay={200}>
                <div className="relative">
                  <img 
                    src={heroImage} 
                    alt="AI-powered food scanning interface" 
                    className="w-full rounded-xl shadow-large hover:shadow-glow transition-all duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-bold mb-6 text-[hsl(var(--text-primary))] tracking-tight">
                  How Label.ai Works
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Advanced AI technology meets personalized health insights to give you complete transparency about your food choices.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <BentoGrid className="mb-16">
                <BentoCard size="lg" className="bg-gradient-primary text-white">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Smart Scanning</h3>
                      <p className="text-white/90 leading-relaxed mb-6">
                        Capture ingredients instantly with our advanced OCR technology that reads any label with 99.9% accuracy
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">50K+</div>
                        <div className="text-sm text-white/70">Products Analyzed</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">99.9%</div>
                        <div className="text-sm text-white/70">Accuracy Rate</div>
                      </div>
                    </div>
                  </div>
                </BentoCard>

                <BentoCard size="sm">
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">AI Analysis</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Deep ingredient research using trusted databases
                    </p>
                  </div>
                </BentoCard>

                <BentoCard size="sm">
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">Safety First</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Personalized warnings based on your profile
                    </p>
                  </div>
                </BentoCard>

                <BentoCard size="md" className="bg-gradient-hero text-white">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Instant Health Insights</h3>
                    <p className="text-white/90 leading-relaxed">
                      Get comprehensive health assessments and better alternatives in seconds. Our AI analyzes ingredients for safety, allergens, and nutritional value.
                    </p>
                  </div>
                </BentoCard>

                <BentoCard size="sm">
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">WCAG Compliant</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Accessible design for everyone
                    </p>
                  </div>
                </BentoCard>
              </BentoGrid>
            </ScrollReveal>

            {/* CTA Section */}
            <ScrollReveal delay={300}>
              <Card className="bg-gradient-card border-0 shadow-large p-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <img 
                      src={mobileImage} 
                      alt="Clean mobile food label scanning" 
                      className="w-full rounded-lg shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-8 order-1 lg:order-2">
                    <div className="space-y-6">
                      <h3 className="font-bold text-[hsl(var(--text-primary))] leading-tight">
                        Take Control of Your
                        <span className="block text-[hsl(var(--brand-500))]">Food Choices</span>
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Join thousands of health-conscious individuals who trust Label.ai to make informed food decisions.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-200">
                        <div className="w-3 h-3 bg-[hsl(var(--brand-500))] rounded-full shadow-glow"></div>
                        <span className="text-[hsl(var(--text-primary))]">Personalized health recommendations</span>
                      </div>
                      <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-200">
                        <div className="w-3 h-3 bg-[hsl(var(--brand-500))] rounded-full shadow-glow"></div>
                        <span className="text-[hsl(var(--text-primary))]">Instant allergen detection</span>
                      </div>
                      <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-200">
                        <div className="w-3 h-3 bg-[hsl(var(--brand-500))] rounded-full shadow-glow"></div>
                        <span className="text-[hsl(var(--text-primary))]">Healthier alternative suggestions</span>
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
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <ScrollReveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center p-6 bg-gradient-card border-0 hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="pt-4">
                    <div className="text-4xl font-bold mb-2 text-[hsl(var(--brand-500))]">50K+</div>
                    <div className="text-muted-foreground font-medium">Products Analyzed</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 bg-gradient-card border-0 hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="pt-4">
                    <div className="text-4xl font-bold mb-2 text-[hsl(var(--brand-500))]">99.9%</div>
                    <div className="text-muted-foreground font-medium">Accuracy Rate</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 bg-gradient-card border-0 hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="pt-4">
                    <div className="text-4xl font-bold mb-2 text-[hsl(var(--brand-500))]">15K+</div>
                    <div className="text-muted-foreground font-medium">Happy Users</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 bg-gradient-card border-0 hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="pt-4">
                    <div className="text-4xl font-bold mb-2 text-[hsl(var(--brand-500))]">24/7</div>
                    <div className="text-muted-foreground font-medium">Health Protection</div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
