import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Scan } from 'lucide-react';

interface CameraScannerProps {
  onScanComplete: (ingredients: string[]) => void;
}

export function CameraScanner({ onScanComplete }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanPreview, setScanPreview] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      // Mock extracted ingredients for demo
      const mockIngredients = [
        "Enriched flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid)",
        "Sugar",
        "Vegetable oil (soybean and palm oil with TBHQ for freshness)",
        "High fructose corn syrup",
        "Salt",
        "Baking soda",
        "Natural and artificial flavor",
        "Yellow 5",
        "Red 40",
        "BHT (preservative)"
      ];
      
      setIsScanning(false);
      onScanComplete(mockIngredients);
    }, 3000);
  };

  const handleUpload = () => {
    // Mock file upload for demo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      // Simulate processing uploaded image
      setIsScanning(true);
      setTimeout(() => {
        const mockIngredients = [
          "Organic whole grain oats",
          "Organic cane sugar",
          "Sea salt",
          "Natural vanilla flavor",
          "Vitamin E (mixed tocopherols)"
        ];
        setIsScanning(false);
        onScanComplete(mockIngredients);
      }, 2000);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center animate-scan-pulse">
            <Camera className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
            Scan Ingredients
          </CardTitle>
          <CardDescription>
            Point your camera at the ingredient list or upload a photo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isScanning ? (
            <div className="text-center space-y-4">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center animate-scan-pulse">
                <div className="flex flex-col items-center space-y-2">
                  <Scan className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Analyzing ingredients...</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Processing image with AI...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera preview area */}
              <div className="w-full h-48 bg-gradient-to-br from-muted/50 to-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Position ingredient list in frame</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="scanner" 
                  size="lg" 
                  onClick={handleScan}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Scan Now
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleUpload}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>

              {/* Tips */}
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">📸 Scanning Tips:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Keep text clear and readable</li>
                  <li>• Hold camera steady</li>
                  <li>• Focus on ingredient list only</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}