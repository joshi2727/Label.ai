import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Target, Shield, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

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
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Welcome to label.ai
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Let's personalize your food safety experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">What's your name?</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="h-12 rounded-xl border-input bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">What's your age range?</Label>
                <Select onValueChange={(value) => setUserData(prev => ({ ...prev, age: parseInt(value) }))}>
                  <SelectTrigger className="h-12 rounded-xl border-input bg-background">
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18">Under 18</SelectItem>
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
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">Health Goals</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                What are your main health priorities?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Weight Management', 'Heart Health', 'Digestive Health', 'Energy Boost', 'Immune Support', 'General Wellness'].map((goal) => (
                  <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={goal}
                      checked={userData.healthGoals.includes(goal)}
                      onCheckedChange={(checked) => updateHealthGoals(goal, checked as boolean)}
                      className="rounded-md"
                    />
                    <Label htmlFor={goal} className="text-sm font-medium leading-none cursor-pointer flex-1">
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
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-warning/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-warning" />
              </div>
              <CardTitle className="text-xl font-semibold">Allergies & Restrictions</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Help us keep you safe by identifying any allergies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy', 'Fish', 'Sesame'].map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={allergy}
                      checked={userData.allergies.includes(allergy)}
                      onCheckedChange={(checked) => updateAllergies(allergy, checked as boolean)}
                      className="rounded-md"
                    />
                    <Label htmlFor={allergy} className="text-sm font-medium leading-none cursor-pointer flex-1">
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
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-success/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-success" />
              </div>
              <CardTitle className="text-xl font-semibold">You're All Set!</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Ready to start scanning and analyzing your food ingredients
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="p-6 bg-success/5 rounded-xl border border-success/20">
                <h3 className="font-semibold text-success mb-3">Profile Summary</h3>
                <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <p>
                    Hi <span className="font-medium text-foreground">{userData.name}</span>! We'll personalize ingredient analysis based on your age ({userData.age}) and health goals.
                  </p>
                  {userData.allergies.length > 0 && (
                    <p>
                      We'll also watch out for your allergies: <span className="font-medium text-foreground">{userData.allergies.join(', ')}</span>.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-6">
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
            variant={step === 4 ? "success" : "default"} 
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
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-primary w-6' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}