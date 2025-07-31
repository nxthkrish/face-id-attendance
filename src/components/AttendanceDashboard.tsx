import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Clock, Users, TrendingUp, CheckCircle2, Shield } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  name: string;
  time: string;
  date: string;
  status: 'present' | 'late';
  avatar?: string;
}

interface AttendanceDashboardProps {
  currentUser?: { name: string; avatar?: string };
  attendanceRecords: AttendanceRecord[];
}

export const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({ 
  currentUser, 
  attendanceRecords 
}) => {
  const todayRecords = attendanceRecords.filter(record => 
    record.date === new Date().toISOString().split('T')[0]
  );

  const stats = {
    totalToday: todayRecords.length,
    onTime: todayRecords.filter(r => r.status === 'present').length,
    late: todayRecords.filter(r => r.status === 'late').length,
    attendanceRate: Math.round((todayRecords.length / 50) * 100) // Assuming 50 total employees
  };

  return (
    <div className="mobile-container mobile-safe-area space-y-6 pb-8">
      {/* Welcome Header */}
      {currentUser && (
        <Card className="glass-effect border-0 shadow-mobile">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 ring-4 ring-primary/30">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="gradient-face-id text-white text-xl font-bold">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Welcome back!</h2>
                <p className="text-primary font-semibold">{currentUser.name}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-effect border-0 shadow-mobile">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalToday}</p>
                <p className="text-xs text-muted-foreground">Total Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-mobile">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.onTime}</p>
                <p className="text-xs text-muted-foreground">On Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-mobile">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.late}</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-mobile">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 gradient-face-id rounded-xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
                <p className="text-xs text-muted-foreground">Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card className="glass-effect border-0 shadow-mobile">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <CalendarDays className="w-5 h-5" />
            <span>Today's Attendance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {todayRecords.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-sm">No attendance records for today</p>
              </div>
            ) : (
              todayRecords.slice(0, 6).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-2xl bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                      <AvatarImage src={record.avatar} />
                      <AvatarFallback className="bg-primary/10 text-xs">
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{record.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(`2024-01-01T${record.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={record.status === 'present' ? 'default' : 'destructive'}
                    className={`text-xs ${record.status === 'present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}
                  >
                    {record.status === 'present' ? 'On Time' : 'Late'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};