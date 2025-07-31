import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, User, Shield, CheckCircle2, AlertCircle, Loader2, Scan } from 'lucide-react';

interface FaceIdInterfaceProps {
  onAuthentication: (result: { success: boolean; name?: string; message: string }) => void;
}

export const FaceIdInterface: React.FC<FaceIdInterfaceProps> = ({ onAuthentication }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanResult, setScanResult] = useState<{ success: boolean; name?: string; message: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setScanResult({ success: false, message: 'Camera access denied. Please allow camera permissions.' });
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  }, []);

  const captureImage = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    setScanResult(null);
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Simulate API call to your Flask backend
            const formData = new FormData();
            formData.append('image', blob, 'face-capture.jpg');
            
            // TODO: Replace with actual backend endpoint
            // const response = await fetch('YOUR_FLASK_BACKEND_URL/recognize', {
            //   method: 'POST',
            //   body: formData
            // });
            // const result = await response.json();
            
            // Mock API response for demo
            setTimeout(() => {
              const mockUsers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];
              const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
              
              const mockResult = Math.random() > 0.3 
                ? { success: true, name: randomUser, message: 'Welcome! Face recognized successfully.' }
                : { success: false, message: 'Face not recognized. Please try again.' };
              
              setScanResult(mockResult);
              setIsScanning(false);
              onAuthentication(mockResult);
            }, 3000);
            
          } catch (error) {
            console.error('Face recognition failed:', error);
            setScanResult({ success: false, message: 'Recognition failed. Please try again.' });
            setIsScanning(false);
          }
        }
      }, 'image/jpeg', 0.9);
    }
  }, [onAuthentication]);

  return (
    <div className="mobile-container mobile-safe-area py-8">
      <Card className="glass-effect border-0 shadow-mobile overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto gradient-face-id rounded-full flex items-center justify-center shadow-glow">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Face ID Authentication</h1>
              <p className="text-muted-foreground text-sm">Position your face within the scanning area</p>
            </div>
          </div>

          {/* Camera Interface */}
          <div className="relative">
            {!cameraActive ? (
              <div className="aspect-[4/3] bg-card rounded-3xl flex items-center justify-center border-2 border-dashed border-border relative overflow-hidden">
                <div className="absolute inset-0 gradient-mobile-bg opacity-50" />
                <div className="relative text-center space-y-4 z-10">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Camera not active</p>
                    <Button 
                      variant="face" 
                      size="lg" 
                      onClick={startCamera} 
                      className="w-full touch-manipulation"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Enable Camera
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover bg-black"
                />
                
                {/* Face Detection Overlay */}
                <div className={`absolute inset-0 transition-mobile ${
                  isScanning 
                    ? 'mobile-pulse-glow' 
                    : ''
                }`}>
                  {/* Corner guides */}
                  <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />
                  
                  {/* Center scanning circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 border-4 rounded-full transition-mobile ${
                      isScanning 
                        ? 'border-primary mobile-face-scan' 
                        : 'border-white/50'
                    }`} />
                  </div>
                  
                  {/* Scanning line */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mobile-scan-line" />
                    </div>
                  )}
                </div>

                {/* Scanning Status */}
                {isScanning && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="secondary" className="glass-effect backdrop-blur-xl">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Analyzing face...
                    </Badge>
                  </div>
                )}
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Results */}
          {scanResult && (
            <div className={`p-4 rounded-2xl border transition-mobile ${
              scanResult.success 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center space-x-3">
                {scanResult.success ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    scanResult.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {scanResult.success ? 'Authentication Success!' : 'Authentication Failed'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scanResult.message}
                  </p>
                  {scanResult.name && (
                    <div className="flex items-center space-x-2 mt-2">
                      <User className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">Welcome, {scanResult.name}!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {cameraActive && !isScanning && (
              <Button 
                variant="face" 
                size="xl" 
                onClick={captureImage}
                className="w-full touch-manipulation"
              >
                <Scan className="w-5 h-5 mr-2" />
                Scan Face
              </Button>
            )}
            
            {cameraActive && (
              <Button 
                variant="ghost" 
                onClick={stopCamera}
                className="w-full touch-manipulation"
              >
                <Camera className="w-4 h-4 mr-2" />
                Stop Camera
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};