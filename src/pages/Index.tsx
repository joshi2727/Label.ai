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
    // <div className="min-h-screen bg-mesh">
    //   {/* Hero Section */}
    //   <section className="relative overflow-hidden">
    //     <div className="container mx-auto px-6 py-20">
    //       <div className="max-w-4xl mx-auto text-center">
    //         <div className="mb-8 animate-fade-in-up">
    //           <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-2xl text-sm font-medium mb-6">
    //             <Sparkles className="h-4 w-4" />
    //             AI-Powered Food Safety
    //           </div>
    //           <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
    //             <span className="text-gradient">Label.ai</span>
    //           </h1>
    //           <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
    //             Instantly analyze ingredient lists with AI-powered food safety scanning
    //           </p>
    //           <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
    //             Get personalized health insights, identify potential risks, and make informed food choices with our advanced AI technology.
    //           </p>
    //         </div>

    //         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
    //           <Button 
    //             variant="gradient" 
    //             size="xl" 
    //             onClick={() => setAppState('onboarding')}
    //             className="min-w-[200px] group"
    //           >
    //             <Camera className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
    //             Start Scanning
    //             <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    //           </Button>
    //           <Button 
    //             variant="outline" 
    //             size="xl"
    //             className="min-w-[200px] group"
    //           >
    //             <Brain className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
    //             Learn More
    //           </Button>
    //         </div>

    //         {/* Hero Image Placeholder */}
    //         <div className="relative max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
    //           <div className="bg-gradient-primary rounded-3xl p-8 shadow-large">
    //             <div className="bg-card rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
    //               <div className="text-center">
    //                 <div className="w-24 h-24 bg-primary-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
    //                   <Camera className="h-12 w-12 text-primary" />
    //                 </div>
    //                 <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Scanning</h3>
    //                 <p className="text-muted-foreground">Advanced OCR and machine learning for instant ingredient analysis</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    <div className="relative min-h-screen bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] text-white">
  {/* Dark overlay if needed */}
  <div className="absolute inset-0 bg-black/40 z-0" />

  <section className="relative z-10 overflow-hidden">
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-2xl text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Food Safety
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Label.ai</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            Instantly analyze ingredient lists with AI-powered food safety scanning
          </p>
          <p className="text-lg text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get personalized health insights, identify potential risks, and make informed food choices with our advanced AI technology.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Button 
            variant="gradient" 
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
            className="min-w-[200px] group border-white text-white hover:bg-white hover:text-black transition"
          >
            <Brain className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Learn More
          </Button>
        </div>

        {/* Hero Image Placeholder */}
        <div className="relative max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="bg-white/10 rounded-3xl p-8 shadow-large backdrop-blur-md">
            <div className="bg-white/5 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-yellow-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered Scanning</h3>
                <p className="text-neutral-300">Advanced OCR and machine learning for instant ingredient analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>


      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            How Label.ai Protects Your Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced AI technology meets personalized health insights to keep you informed about what you eat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Camera,
              title: "Smart Scanning",
              description: "Advanced OCR technology instantly extracts and identifies all ingredients from packaging",
              color: "bg-primary-muted text-primary"
            },
            {
              icon: Brain,
              title: "AI Analysis",
              description: "Comprehensive ingredient research using trusted health databases and scientific studies",
              color: "bg-accent-muted text-accent"
            },
            {
              icon: Shield,
              title: "Personal Safety",
              description: "Customized warnings based on your age, allergies, and health goals for maximum protection",
              color: "bg-warning-muted text-warning"
            },
            {
              icon: Zap,
              title: "Instant Results",
              description: "Get comprehensive health verdicts and alternative recommendations in seconds",
              color: "bg-success-muted text-success"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="pt-8">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl mx-auto mb-6 flex items-center justify-center`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-foreground leading-tight">
              Take Control of Your 
              <span className="text-gradient"> Food Safety</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Join thousands of health-conscious individuals who trust Label.ai to make informed food choices. 
              Our AI analyzes ingredients against your personal health profile to give you the confidence to eat safely.
            </p>
            
            <div className="space-y-4">
              {[
                "Personalized for your age and health goals",
                "Instant allergen and health risk detection",
                "Healthier alternative suggestions",
                "Science-backed ingredient analysis"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              onClick={() => setAppState('onboarding')}
              className="group"
            >
              <Users className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Start Your Health Journey
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <Card className="p-8 hover-lift">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Health Dashboard</h4>
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse-soft"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-success-muted rounded-xl">
                    <span className="text-success font-medium">Safe Ingredients</span>
                    <span className="text-success font-bold">87%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-warning-muted rounded-xl">
                    <span className="text-warning font-medium">Caution Items</span>
                    <span className="text-warning font-bold">10%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-destructive-muted rounded-xl">
                    <span className="text-destructive font-medium">Avoid</span>
                    <span className="text-destructive font-bold">3%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Real-time analysis of your food choices
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Products Scanned" },
              { number: "99.9%", label: "Accuracy Rate" },
              { number: "15K+", label: "Active Users" },
              { number: "24/7", label: "Health Protection" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-gradient mb-2">Label.ai</h4>
            <p className="text-muted-foreground">Your AI-powered food safety companion</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with advanced AI technology to protect your health and well-being.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;