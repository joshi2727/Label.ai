import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Scan, X, RefreshCw } from 'lucide-react';
import { extractTextFromImage, initializeOCR } from '@/utils/ocrUtils';
import { useToast } from '@/hooks/use-toast';

interface CameraScannerProps {
  onScanComplete: (ingredients: string[]) => void;
}

export function CameraScanner({ onScanComplete }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanPreview, setScanPreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ocrProgress, setOcrProgress] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeOCR().catch(console.error);
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions and try again.');
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  const captureImage = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);
    
    // Convert to blob and process
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      setIsScanning(true);
      setOcrProgress('Preparing image...');
      stopCamera();
      
      try {
        setOcrProgress('Extracting text...');
        const result = await extractTextFromImage(blob);
        
        if (result.ingredients.length === 0) {
          throw new Error('No ingredients found in image');
        }
        
        setOcrProgress('Processing ingredients...');
        setTimeout(() => {
          setIsScanning(false);
          onScanComplete(result.ingredients);
        }, 1000);
        
      } catch (err) {
        console.error('OCR Error:', err);
        setError('Failed to read ingredients from image. Please try again with better lighting.');
        setIsScanning(false);
        toast({
          title: "Scan Failed",
          description: "Could not read ingredients. Try better lighting or a clearer image.",
          variant: "destructive"
        });
      }
    }, 'image/jpeg', 0.8);
  }, [onScanComplete, stopCamera, toast]);

  const handleScan = useCallback(() => {
    if (isCameraActive) {
      captureImage();
    } else {
      startCamera();
    }
  }, [isCameraActive, captureImage, startCamera]);

  const handleUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsScanning(true);
      setOcrProgress('Processing uploaded image...');
      
      try {
        setOcrProgress('Extracting text...');
        const result = await extractTextFromImage(file);
        
        if (result.ingredients.length === 0) {
          throw new Error('No ingredients found in image');
        }
        
        setOcrProgress('Analyzing ingredients...');
        setTimeout(() => {
          setIsScanning(false);
          onScanComplete(result.ingredients);
        }, 1000);
        
      } catch (err) {
        console.error('Upload OCR Error:', err);
        setError('Failed to read ingredients from uploaded image.');
        setIsScanning(false);
        toast({
          title: "Upload Failed",
          description: "Could not read ingredients from the uploaded image.",
          variant: "destructive"
        });
      }
    };
    input.click();
  }, [onScanComplete, toast]);

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
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setError('')}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Try Again
              </Button>
            </div>
          )}

          {isScanning ? (
            <div className="text-center space-y-4">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center animate-scan-pulse">
                <div className="flex flex-col items-center space-y-2">
                  <Scan className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">{ocrProgress || 'Analyzing ingredients...'}</p>
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
                <p className="text-sm text-muted-foreground">AI is reading the ingredient list...</p>
              </div>
            </div>
          ) : isCameraActive ? (
            <div className="space-y-4">
              {/* Live camera preview */}
              <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 rounded-lg flex items-center justify-center">
                  <p className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                    Position ingredient list here
                  </p>
                </div>
              </div>

              {/* Camera controls */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={captureImage}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Capture
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={stopCamera}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera preview area */}
              <div className="w-full h-48 bg-gradient-to-br from-muted/50 to-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Tap scan to access camera</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleScan}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
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