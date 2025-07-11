import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, User, Target, Shield, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
}

interface UserData {
  name: string;
  age: number;
  healthGoals: string[];
  allergies: string[];
  dietaryRestrictions: string[];
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 0,
    healthGoals: [],
    allergies: [],
    dietaryRestrictions: []
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateHealthGoals = (goal: string, checked: boolean) => {
    setUserData(prev => ({
      ...prev,
      healthGoals: checked 
        ? [...prev.healthGoals, goal]
        : prev.healthGoals.filter(g => g !== goal)
    }));
  };

  const updateAllergies = (allergy: string, checked: boolean) => {
    setUserData(prev => ({
      ...prev,
      allergies: checked 
        ? [...prev.allergies, allergy]
        : prev.allergies.filter(a => a !== allergy)
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary-muted text-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                Welcome to Label.ai!
              </CardTitle>
              <CardDescription className="text-lg">
                Let's personalize your food safety experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground font-medium">What's your name?</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="age" className="text-foreground font-medium">What's your age?</Label>
                <Select onValueChange={(value) => setUserData(prev => ({ ...prev, age: parseInt(value) }))}>
                  <SelectTrigger className="mt-2 h-12 rounded-2xl border-0 bg-input">
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16">Under 18</SelectItem>
                    <SelectItem value="25">18-25</SelectItem>
                    <SelectItem value="35">26-35</SelectItem>
                    <SelectItem value="45">36-45</SelectItem>
                    <SelectItem value="55">46-55</SelectItem>
                    <SelectItem value="65">56-65</SelectItem>
                    <SelectItem value="70">65+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-success-muted text-success rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl text-foreground">Health Goals</CardTitle>
              <CardDescription className="text-lg">
                What are your main health priorities?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Weight Management', 'Heart Health', 'Digestive Health', 'Energy Boost', 'Immune Support', 'General Wellness'].map((goal) => (
                  <div key={goal} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted transition-colors">
                    <Checkbox
                      id={goal}
                      checked={userData.healthGoals.includes(goal)}
                      onCheckedChange={(checked) => updateHealthGoals(goal, checked as boolean)}
                      className="rounded-lg"
                    />
                    <Label htmlFor={goal} className="text-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-warning-muted text-warning rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl text-foreground">Allergies & Restrictions</CardTitle>
              <CardDescription className="text-lg">
                Help us keep you safe by identifying any allergies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy', 'Fish', 'Sesame'].map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted transition-colors">
                    <Checkbox
                      id={allergy}
                      checked={userData.allergies.includes(allergy)}
                      onCheckedChange={(checked) => updateAllergies(allergy, checked as boolean)}
                      className="rounded-lg"
                    />
                    <Label htmlFor={allergy} className="text-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      {allergy}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-foreground">You're All Set!</CardTitle>
              <CardDescription className="text-lg">
                Ready to start scanning and analyzing your food ingredients
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="p-6 bg-gradient-primary rounded-2xl text-white">
                <h3 className="font-semibold text-lg mb-3">Profile Summary</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  Hi {userData.name}! We'll personalize ingredient analysis based on your age ({userData.age}) 
                  and health goals. {userData.allergies.length > 0 && `We'll also watch out for your allergies: ${userData.allergies.join(', ')}.`}
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {renderStep()}
        
        <div className="flex justify-between items-center mt-8">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePrevious} className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Previous
            </Button>
          ) : (
            <div />
          )}
          
          <Button 
            variant={step === 4 ? "gradient" : "default"} 
            onClick={handleNext}
            disabled={step === 1 && (!userData.name || !userData.age)}
            className="group"
          >
            {step === 4 ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Start Scanning!
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-primary shadow-glow' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}