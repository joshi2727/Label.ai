import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangle, Shield, Info, ChevronRight } from 'lucide-react';
import { findIngredient, getPersonalizedAnalysis, IngredientData } from '@/data/ingredientDatabase';

interface Ingredient {
  id: string;
  name: string;
  safetyLevel: 'safe' | 'caution' | 'warning';
  description: string;
  healthImpact: string;
  alternatives?: string;
  dailyLimit?: string;
}

interface IngredientAnalysisProps {
  ingredients: string[];
  onBackToScan: () => void;
  userAge?: number;
}

export function IngredientAnalysis({ ingredients, onBackToScan, userAge = 25 }: IngredientAnalysisProps) {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analyzedIngredients, setAnalyzedIngredients] = useState<Ingredient[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Analyze ingredients using the comprehensive database

  useEffect(() => {
    // Simulate analysis progress
    const analyzeIngredients = async () => {
      for (let i = 0; i <= 100; i += 10) {
        setAnalysisProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Process ingredients using real database
      const analyzed = ingredients.map((ingredient, index) => {
        const cleanName = ingredient.toLowerCase().replace(/[()]/g, '').split(',')[0].trim();
        const foundIngredient = findIngredient(cleanName);

        if (foundIngredient) {
          const personalizedAnalysis = getPersonalizedAnalysis(foundIngredient, userAge);
          return {
            id: foundIngredient.id,
            name: foundIngredient.name,
            safetyLevel: personalizedAnalysis.riskLevel,
            description: foundIngredient.description,
            healthImpact: personalizedAnalysis.personalizedMessage,
            alternatives: foundIngredient.alternatives,
            dailyLimit: personalizedAnalysis.dailyLimit,
            category: foundIngredient.category,
            allergens: foundIngredient.allergens
          };
        }

        // Unknown ingredient - classify as caution
        return {
          id: `ingredient-${index}`,
          name: ingredient,
          safetyLevel: 'caution' as 'caution',
          description: "Ingredient not found in our database. Please research independently or consult a nutritionist.",
          healthImpact: "Unknown ingredient - exercise caution and research further if you have health concerns.",
          dailyLimit: "Follow product serving recommendations",
          category: 'other'
        };
      });

      setAnalyzedIngredients(analyzed);
      setIsAnalyzing(false);
    };

    analyzeIngredients();
  }, [ingredients]);

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'safe':
        return <Shield className="h-4 w-4 text-success" />;
      case 'caution':
        return <Info className="h-4 w-4 text-warning" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'safe':
        return 'bg-success text-success-foreground';
      case 'caution':
        return 'bg-warning text-warning-foreground';
      case 'warning':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const overallSafety = analyzedIngredients.length > 0 ? 
    analyzedIngredients.filter(i => i.safetyLevel === 'warning').length > 0 ? 'warning' :
    analyzedIngredients.filter(i => i.safetyLevel === 'caution').length > 2 ? 'caution' : 'safe'
    : 'safe';

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center animate-scan-pulse">
              <span className="text-2xl text-white">🔬</span>
            </div>
            <CardTitle>Analyzing Ingredients</CardTitle>
            <CardDescription>AI is researching each ingredient for safety</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Progress value={analysisProgress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              {analysisProgress < 50 ? 'Identifying ingredients...' :
               analysisProgress < 80 ? 'Checking safety databases...' :
               'Generating personalized report...'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Overall Safety Verdict */}
        <Card className={`border-2 ${overallSafety === 'safe' ? 'border-success animate-health-glow' : 
                                     overallSafety === 'caution' ? 'border-warning animate-caution-pulse' : 
                                     'border-destructive animate-caution-pulse'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                overallSafety === 'safe' ? 'bg-gradient-safe animate-health-glow' :
                overallSafety === 'caution' ? 'bg-gradient-caution' :
                'bg-gradient-caution'
              }`}>
                {getSafetyIcon(overallSafety)}
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  {overallSafety === 'safe' ? 'Generally Safe' :
                   overallSafety === 'caution' ? 'Use with Caution' :
                   'Health Concerns'}
                </h2>
                <p className="text-muted-foreground">
                  {overallSafety === 'safe' ? 'This product has mostly safe ingredients' :
                   overallSafety === 'caution' ? 'Some ingredients need attention' :
                   'Several concerning ingredients found'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">
                  {analyzedIngredients.filter(i => i.safetyLevel === 'safe').length}
                </div>
                <div className="text-xs text-muted-foreground">Safe</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">
                  {analyzedIngredients.filter(i => i.safetyLevel === 'caution').length}
                </div>
                <div className="text-xs text-muted-foreground">Caution</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">
                  {analyzedIngredients.filter(i => i.safetyLevel === 'warning').length}
                </div>
                <div className="text-xs text-muted-foreground">Warning</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredient Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">📋</span>
              Ingredient Analysis
            </CardTitle>
            <CardDescription>
              Detailed breakdown of each ingredient and its health impact
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {analyzedIngredients.map((ingredient, index) => (
                <AccordionItem key={ingredient.id} value={`item-${index}`} className="animate-ingredient-slide" style={{ animationDelay: `${index * 100}ms` }}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        {getSafetyIcon(ingredient.safetyLevel)}
                        <span className="font-medium text-left">{ingredient.name}</span>
                      </div>
                      <Badge className={getSafetyColor(ingredient.safetyLevel)}>
                        {ingredient.safetyLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{ingredient.description}</p>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Health Impact:</h4>
                      <p className="text-sm">{ingredient.healthImpact}</p>
                    </div>

                    {ingredient.dailyLimit && (
                      <div className="bg-warning/10 p-3 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Daily Limit:</h4>
                        <p className="text-sm">{ingredient.dailyLimit}</p>
                      </div>
                    )}

                    {ingredient.alternatives && (
                      <div className="bg-success/10 p-3 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Healthier Alternatives:</h4>
                        <p className="text-sm">{ingredient.alternatives}</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBackToScan} className="flex-1">
            Scan Another Product
          </Button>
          <Button variant="health" className="flex-1">
            <span className="mr-2">💡</span>
            Find Alternatives
          </Button>
        </div>
      </div>
    </div>
  );
}