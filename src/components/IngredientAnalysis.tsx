import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangle, Shield, Info, ExternalLink, ArrowLeft, Lightbulb, CheckCircle } from 'lucide-react';
import { findIngredient, getPersonalizedAnalysis, IngredientData } from '@/data/ingredientDatabase';
import { researchIngredient } from '@/utils/webSearch';

interface Ingredient {
  id: string;
  name: string;
  safetyLevel: 'safe' | 'caution' | 'warning';
  description: string;
  healthImpact: string;
  alternatives?: string;
  dailyLimit?: string;
  sources?: string[];
  isResearched?: boolean;
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

  useEffect(() => {
    const analyzeIngredients = async () => {
      for (let i = 0; i <= 50; i += 10) {
        setAnalysisProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const analyzed: Ingredient[] = [];
      
      for (let index = 0; index < ingredients.length; index++) {
        const ingredient = ingredients[index];
        const cleanName = ingredient.toLowerCase().replace(/[()]/g, '').split(',')[0].trim();
        const foundIngredient = findIngredient(cleanName);

        setAnalysisProgress(50 + (index / ingredients.length) * 50);

        if (foundIngredient) {
          const personalizedAnalysis = getPersonalizedAnalysis(foundIngredient, userAge);
          analyzed.push({
            id: foundIngredient.id,
            name: foundIngredient.name,
            safetyLevel: personalizedAnalysis.riskLevel,
            description: foundIngredient.description,
            healthImpact: personalizedAnalysis.personalizedMessage,
            alternatives: foundIngredient.alternatives,
            dailyLimit: personalizedAnalysis.dailyLimit,
            isResearched: false
          });
        } else {
          try {
            console.log(`Researching unknown ingredient: ${ingredient}`);
            const researchedData = await researchIngredient(ingredient, userAge);
            analyzed.push({
              id: `ingredient-${index}`,
              name: researchedData.name,
              safetyLevel: researchedData.safetyLevel,
              description: researchedData.definition,
              healthImpact: researchedData.healthImpacts,
              dailyLimit: researchedData.dailyLimit,
              sources: researchedData.sources,
              isResearched: true
            });
          } catch (error) {
            console.error(`Failed to research ingredient ${ingredient}:`, error);
            analyzed.push({
              id: `ingredient-${index}`,
              name: ingredient,
              safetyLevel: 'caution' as const,
              description: `${ingredient} requires further research. Information from trusted sources was not immediately available.`,
              healthImpact: "This ingredient needs individual assessment based on current scientific literature.",
              dailyLimit: "Follow product serving recommendations and consult healthcare provider if needed",
              isResearched: false
            });
          }
        }
      }

      setAnalyzedIngredients(analyzed);
      setIsAnalyzing(false);
    };

    analyzeIngredients();
  }, [ingredients, userAge]);

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'safe':
        return <CheckCircle className="h-4 w-4 text-success" />;
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
        return 'bg-success/10 text-success border-success/20';
      case 'caution':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'warning':
        return 'bg-destructive/10 text-destructive border-destructive/20';
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
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="relative">
                <span className="text-2xl">🔬</span>
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
              </div>
            </div>
            <CardTitle className="text-xl font-semibold">Analyzing Ingredients</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              AI is researching each ingredient for safety
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Progress value={analysisProgress} className="w-full h-2" />
              <p className="text-sm text-center text-muted-foreground font-medium">
                {analysisProgress < 50 ? 'Identifying ingredients...' :
                 analysisProgress < 80 ? 'Checking safety databases...' :
                 'Generating personalized report...'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mesh p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Overall Safety Verdict */}
        <Card className={`border-2 ${overallSafety === 'safe' ? 'border-success/30 bg-success/5' : 
                                     overallSafety === 'caution' ? 'border-warning/30 bg-warning/5' : 
                                     'border-destructive/30 bg-destructive/5'}`}>
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                overallSafety === 'safe' ? 'bg-success/20' :
                overallSafety === 'caution' ? 'bg-warning/20' :
                'bg-destructive/20'
              }`}>
                {getSafetyIcon(overallSafety)}
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-1">
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
              <div className="p-3 bg-success/10 rounded-xl">
                <div className="text-2xl font-bold text-success mb-1">
                  {analyzedIngredients.filter(i => i.safetyLevel === 'safe').length}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Safe</div>
              </div>
              <div className="p-3 bg-warning/10 rounded-xl">
                <div className="text-2xl font-bold text-warning mb-1">
                  {analyzedIngredients.filter(i => i.safetyLevel === 'caution').length}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Caution</div>
              </div>
              <div className="p-3 bg-destructive/10 rounded-xl">
                <div className="text-2xl font-bold text-destructive mb-1">
                  {analyzedIngredients.filter(i => i.safetyLevel === 'warning').length}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Warning</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredient Breakdown */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-semibold">
              <span className="mr-3">📋</span>
              Ingredient Analysis
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Detailed breakdown of each ingredient and its health impact
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {analyzedIngredients.map((ingredient, index) => (
                <AccordionItem 
                  key={ingredient.id} 
                  value={`item-${index}`} 
                  className="border rounded-xl px-4 animate-fade-in-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        {getSafetyIcon(ingredient.safetyLevel)}
                        <span className="font-medium text-left">{ingredient.name}</span>
                      </div>
                      <Badge className={`${getSafetyColor(ingredient.safetyLevel)} border font-medium`}>
                        {ingredient.safetyLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{ingredient.description}</p>
                    
                    <div className="bg-muted/30 p-4 rounded-xl">
                      <h4 className="font-medium text-sm mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Health Impact:
                      </h4>
                      <p className="text-sm leading-relaxed">{ingredient.healthImpact}</p>
                    </div>

                    {ingredient.dailyLimit && (
                      <div className="bg-warning/10 p-4 rounded-xl border border-warning/20">
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                          Daily Limit:
                        </h4>
                        <p className="text-sm leading-relaxed">{ingredient.dailyLimit}</p>
                      </div>
                    )}

                    {ingredient.alternatives && (
                      <div className="bg-success/10 p-4 rounded-xl border border-success/20">
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2 text-success" />
                          Healthier Alternatives:
                        </h4>
                        <p className="text-sm leading-relaxed">{ingredient.alternatives}</p>
                      </div>
                    )}

                    {ingredient.isResearched && ingredient.sources && ingredient.sources.length > 0 && (
                      <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                        <h4 className="font-medium text-sm mb-3 flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                          Research Sources:
                        </h4>
                        <div className="space-y-2">
                          {ingredient.sources.map((source, idx) => (
                            <div key={idx} className="text-xs">
                              {source.startsWith('http') ? (
                                <a 
                                  href={source} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-primary hover:underline font-medium"
                                >
                                  {source.replace(/^https?:\/\//, '').split('/')[0]}
                                </a>
                              ) : (
                                <span className="text-muted-foreground">{source}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                          Information researched from trusted health and nutrition sources
                        </p>
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
          <Button variant="outline" onClick={onBackToScan} className="flex-1 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Scan Another Product
          </Button>
          <Button variant="default" className="flex-1 group">
            <Lightbulb className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Find Alternatives
          </Button>
        </div>
      </div>
    </div>
  );
}