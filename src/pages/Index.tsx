import React, { useState } from 'react';
import { FaceIdInterface } from '@/components/FaceIdInterface';
import { AttendanceDashboard } from '@/components/AttendanceDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Clock, Building2, ArrowLeft } from 'lucide-react';
import heroImage from '@/assets/face-id-hero.jpg';

// Mock data for demonstration
const mockAttendanceRecords = [
  { id: '1', name: 'John Doe', time: '09:00', date: new Date().toISOString().split('T')[0], status: 'present' as const },
  { id: '2', name: 'Jane Smith', time: '09:15', date: new Date().toISOString().split('T')[0], status: 'late' as const },
  { id: '3', name: 'Mike Johnson', time: '08:45', date: new Date().toISOString().split('T')[0], status: 'present' as const },
  { id: '4', name: 'Sarah Wilson', time: '09:30', date: new Date().toISOString().split('T')[0], status: 'late' as const },
  { id: '5', name: 'David Brown', time: '08:55', date: new Date().toISOString().split('T')[0], status: 'present' as const },
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={resetToLanding}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
              </div>
            </div>
            <Badge variant="secondary" className="glass-effect">
              Live Dashboard
            </Badge>
          </div>
          <AttendanceDashboard 
            currentUser={currentUser} 
            attendanceRecords={mockAttendanceRecords}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={resetToLanding} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold mb-2">Face Authentication</h1>
            <p className="text-muted-foreground">Secure attendance tracking with Face ID</p>
          </div>
          <FaceIdInterface onAuthentication={handleAuthentication} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="glass-effect">
                  <Shield className="w-3 h-3 mr-1" />
                  Advanced Biometric Security
                </Badge>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Face Recognition
                  <span className="gradient-primary bg-clip-text text-transparent block">
                    Attendance System
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Secure, fast, and reliable attendance tracking powered by advanced facial recognition technology. 
                  Experience Apple-grade authentication for your organization.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="face" 
                  size="xl" 
                  onClick={() => setCurrentView('auth')}
                  className="w-full sm:w-auto"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Start Face Authentication
                </Button>
                <Button 
                  variant="glass" 
                  size="xl"
                  onClick={() => setCurrentView('dashboard')}
                  className="w-full sm:w-auto"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">&lt;1s</div>
                  <div className="text-sm text-muted-foreground">Recognition</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Face Recognition Interface" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our System?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to provide the most secure and efficient attendance tracking solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-effect border-0 shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Advanced Security</h3>
                <p className="text-muted-foreground">
                  Military-grade facial recognition technology with anti-spoofing protection ensures only authorized personnel can access.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-face-id rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Real-time Tracking</h3>
                <p className="text-muted-foreground">
                  Instant attendance logging with real-time dashboard updates. Monitor your team's presence status live.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Easy Management</h3>
                <p className="text-muted-foreground">
                  Intuitive dashboard for HR managers with comprehensive analytics and detailed attendance reports.
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
