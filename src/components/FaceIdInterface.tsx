import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, User, Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setScanResult({ success: false, message: 'Camera access denied' });
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
            // Simulate API call to backend
            const formData = new FormData();
            formData.append('image', blob, 'face-capture.jpg');
            
            // Mock API response for demo
            setTimeout(() => {
              const mockResult = Math.random() > 0.5 
                ? { success: true, name: 'John Doe', message: 'Face recognized successfully!' }
                : { success: false, message: 'Face not recognized' };
              
              setScanResult(mockResult);
              setIsScanning(false);
              onAuthentication(mockResult);
            }, 2000);
            
          } catch (error) {
            console.error('Face recognition failed:', error);
            setScanResult({ success: false, message: 'Recognition failed' });
            setIsScanning(false);
          }
        }
      }, 'image/jpeg', 0.8);
    }
  }, [onAuthentication]);

  return (
    <Card className="p-8 max-w-md mx-auto glass-effect border-0 shadow-card">
      <div className="text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto gradient-face-id rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Face ID Authentication</h2>
          <p className="text-muted-foreground">Position your face within the frame</p>
        </div>

        {/* Camera Interface */}
        <div className="relative">
          {!cameraActive ? (
            <div className="w-80 h-60 bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-4">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Camera not active</p>
                <Button variant="face" onClick={startCamera} className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-80 h-60 bg-black rounded-2xl object-cover"
              />
              
              {/* Face Detection Overlay */}
              <div className={`absolute inset-0 rounded-2xl border-4 transition-smooth ${
                isScanning 
                  ? 'border-primary face-scan pulse-glow' 
                  : 'border-white/50'
              }`}>
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-primary rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              {/* Scanning Status */}
              {isScanning && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="glass-effect">
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                    Scanning...
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Results */}
        {scanResult && (
          <div className={`p-4 rounded-xl ${
            scanResult.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              {scanResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={`font-medium ${
                scanResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {scanResult.message}
              </span>
            </div>
            {scanResult.name && (
              <div className="flex items-center justify-center space-x-2 mt-2">
                <User className="w-4 h-4 text-green-600" />
                <span className="text-green-700">Welcome, {scanResult.name}!</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {cameraActive && !isScanning && (
            <Button 
              variant="premium" 
              size="lg" 
              onClick={captureImage}
              className="w-full"
            >
              <Shield className="w-4 h-4 mr-2" />
              Authenticate with Face ID
            </Button>
          )}
          
          {cameraActive && (
            <Button 
              variant="ghost" 
              onClick={stopCamera}
              className="w-full"
            >
              Stop Camera
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};