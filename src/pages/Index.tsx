import React, { useState } from 'react';
import { FaceIdInterface } from '@/components/FaceIdInterface';
import { AttendanceDashboard } from '@/components/AttendanceDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Scan, Building2, ArrowLeft, Menu, Settings } from 'lucide-react';
import heroImage from '@/assets/face-id-hero.jpg';

// Mock data for demonstration
const mockAttendanceRecords = [
  { id: '1', name: 'John Doe', time: '09:00', date: new Date().toISOString().split('T')[0], status: 'present' as const },
  { id: '2', name: 'Jane Smith', time: '09:15', date: new Date().toISOString().split('T')[0], status: 'late' as const },
  { id: '3', name: 'Mike Johnson', time: '08:45', date: new Date().toISOString().split('T')[0], status: 'present' as const },
  { id: '4', name: 'Sarah Wilson', time: '09:30', date: new Date().toISOString().split('T')[0], status: 'late' as const },
  { id: '5', name: 'David Brown', time: '08:55', date: new Date().toISOString().split('T')[0], status: 'present' as const },
  { id: '6', name: 'Emily Davis', time: '09:10', date: new Date().toISOString().split('T')[0], status: 'present' as const },
  { id: '7', name: 'Alex Rodriguez', time: '09:25', date: new Date().toISOString().split('T')[0], status: 'late' as const },
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar?: string } | null>(null);

  const handleAuthentication = (result: { success: boolean; name?: string; message: string }) => {
    if (result.success && result.name) {
      setCurrentUser({ name: result.name });
      setCurrentView('dashboard');
    }
  };

  const resetToLanding = () => {
    setCurrentView('landing');
    setCurrentUser(null);
  };

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen gradient-mobile-bg">
        {/* Mobile Header */}
        <div className="mobile-safe-area">
          <div className="flex items-center justify-between p-4 bg-card/30 backdrop-blur-xl border-b border-border/50">
            <Button variant="ghost" size="icon" onClick={resetToLanding}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold">Dashboard</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <AttendanceDashboard 
          currentUser={currentUser} 
          attendanceRecords={mockAttendanceRecords}
        />
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen gradient-mobile-bg">
        {/* Mobile Header */}
        <div className="mobile-safe-area">
          <div className="flex items-center justify-between p-4 bg-card/30 backdrop-blur-xl border-b border-border/50">
            <Button variant="ghost" size="icon" onClick={resetToLanding}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Face Authentication</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
        <FaceIdInterface onAuthentication={handleAuthentication} />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mobile-bg mobile-safe-area">
      {/* Mobile Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mobile-container py-12 space-y-8">
          {/* Hero Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-mobile">
            <img 
              src={heroImage} 
              alt="Face Recognition Interface" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge variant="secondary" className="glass-effect mb-3">
                <Shield className="w-3 h-3 mr-1" />
                Advanced Biometric Security
              </Badge>
              <h1 className="text-3xl font-bold text-white leading-tight mb-2">
                Face Recognition
                <span className="block gradient-primary bg-clip-text text-transparent">
                  Attendance System
                </span>
              </h1>
            </div>
          </div>

          {/* Description */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Secure, fast, and reliable attendance tracking powered by advanced facial recognition technology.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">&lt;1s</div>
                <div className="text-xs text-muted-foreground">Recognition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              variant="face" 
              size="xl" 
              onClick={() => setCurrentView('auth')}
              className="w-full touch-manipulation"
            >
              <Scan className="w-5 h-5 mr-2" />
              Start Face Authentication
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => setCurrentView('dashboard')}
              className="w-full touch-manipulation"
            >
              <Users className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card/30 backdrop-blur-xl border-t border-border/50 mt-8">
        <div className="mobile-container py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Why Choose Our System?</h2>
            <p className="text-muted-foreground text-sm">
              Built with cutting-edge technology for the most secure attendance tracking.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-effect border-0 shadow-mobile">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Advanced Security</h3>
                <p className="text-muted-foreground text-sm">
                  Military-grade facial recognition with anti-spoofing protection ensures only authorized access.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-mobile">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-face-id rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Scan className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Real-time Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  Instant attendance logging with real-time dashboard updates and live monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-mobile">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Easy Management</h3>
                <p className="text-muted-foreground text-sm">
                  Intuitive mobile dashboard with comprehensive analytics and detailed reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
