import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Scan, X, RefreshCw, Sparkles } from 'lucide-react';
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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
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
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Scan Ingredients
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Point your camera at the ingredient list or upload a photo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-sm text-destructive mb-3">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setError('')}
                className="group"
              >
                <RefreshCw className="mr-2 h-3 w-3 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Button>
            </div>
          )}

          {isScanning ? (
            <div className="text-center space-y-6">
              <div className="w-full h-48 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/20">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Scan className="h-12 w-12 text-primary animate-soft-pulse" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{ocrProgress || 'Analyzing ingredients...'}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full animate-gentle-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">AI is reading the ingredient list...</p>
              </div>
            </div>
          ) : isCameraActive ? (
            <div className="space-y-6">
              <div className="relative w-full h-48 bg-black rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-sm bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                      Position ingredient list here
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="scanner" 
                  size="lg" 
                  onClick={captureImage}
                  className="flex-1 group"
                >
                  <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Capture
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={stopCamera}
                  className="flex-1 group"
                >
                  <X className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Cancel
                </Button>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-full h-48 bg-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Tap scan to access camera</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="scanner" 
                  size="lg" 
                  onClick={handleScan}
                  className="flex-1 group"
                >
                  <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Start Camera
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleUpload}
                  className="flex-1 group"
                >
                  <Upload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Upload Photo
                </Button>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                <h4 className="font-medium text-sm mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Scanning Tips:
                </h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
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