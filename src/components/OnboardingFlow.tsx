
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

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

  const canProceed = () => {
    switch (step) {
      case 1:
        return userData.name.trim() !== '' && userData.age > 0;
      case 2:
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-md animate-ingredient-slide">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-health rounded-full mx-auto mb-4 flex items-center justify-center animate-badge-bounce">
                <span className="text-2xl text-white">👋</span>
              </div>
              <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
                Welcome to Label.ai!
              </CardTitle>
              <CardDescription>
                Let's personalize your food safety experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="age">What's your age?</Label>
                <Select onValueChange={(value) => setUserData(prev => ({ ...prev, age: parseInt(value) }))}>
                  <SelectTrigger className="mt-2">
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
          <Card className="w-full max-w-md animate-ingredient-slide">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-safe rounded-full mx-auto mb-4 flex items-center justify-center animate-health-glow">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <CardTitle className="text-xl">Health Goals</CardTitle>
              <CardDescription>
                What are your main health priorities? (Optional - you can skip this step)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Weight Management', 'Heart Health', 'Digestive Health', 'Energy Boost', 'Immune Support', 'General Wellness'].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={userData.healthGoals.includes(goal)}
                      onCheckedChange={(checked) => updateHealthGoals(goal, checked as boolean)}
                    />
                    <Label htmlFor={goal} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
          <Card className="w-full max-w-md animate-ingredient-slide">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-caution rounded-full mx-auto mb-4 flex items-center justify-center animate-caution-pulse">
                <span className="text-2xl text-white">⚠️</span>
              </div>
              <CardTitle className="text-xl">Allergies & Restrictions</CardTitle>
              <CardDescription>
                Help us keep you safe by identifying any allergies (Optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy', 'Fish', 'Sesame'].map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={allergy}
                      checked={userData.allergies.includes(allergy)}
                      onCheckedChange={(checked) => updateAllergies(allergy, checked as boolean)}
                    />
                    <Label htmlFor={allergy} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
          <Card className="w-full max-w-md animate-ingredient-slide">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center animate-badge-bounce">
                <span className="text-2xl text-white">✨</span>
              </div>
              <CardTitle className="text-xl">You're All Set!</CardTitle>
              <CardDescription>
                Ready to start scanning and analyzing your food ingredients
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 bg-gradient-safe rounded-lg text-white">
                <h3 className="font-semibold">Profile Summary</h3>
                <p className="text-sm mt-2">
                  Hi {userData.name}! We'll personalize ingredient analysis based on your age ({userData.age}) 
                  {userData.healthGoals.length > 0 && ` and your health goals: ${userData.healthGoals.join(', ')}`}.
                  {userData.allergies.length > 0 && ` We'll also watch out for your allergies: ${userData.allergies.join(', ')}.`}
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
    <div className="min-h-screen bg-gradient-to-br from-muted/70 via-muted/50 to-background/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderStep()}
        
        {/* Navigation Buttons - Always visible with consistent styling */}
        <div className="flex justify-between items-center mt-8 px-2">
          {/* Previous Button - Visible from step 2 onwards */}
          <Button 
            variant="soft" 
            onClick={handlePrevious}
            className={`${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-200`}
          >
            Previous
          </Button>
          
          {/* Next/Finish Button - Always visible */}
          <Button 
            variant="default" 
            onClick={handleNext}
            disabled={!canProceed()}
            className="font-semibold px-8"
          >
            {step === 4 ? "Start Scanning!" : "Next"}
          </Button>
        </div>

        {/* Progress Indicator - Always visible */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-primary scale-110 shadow' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
