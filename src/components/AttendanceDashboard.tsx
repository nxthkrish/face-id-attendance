import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Clock, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Welcome Header */}
      {currentUser && (
        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 ring-4 ring-primary/20">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="gradient-primary text-white text-xl font-bold">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Welcome back, {currentUser.name}!</h2>
                <p className="text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <Badge variant="secondary" className="mt-2">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Attendance Marked
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-2xl font-bold">{stats.totalToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold">{stats.onTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold">{stats.late}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-face-id rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card className="glass-effect border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5" />
            <span>Today's Attendance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayRecords.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No attendance records for today</p>
              </div>
            ) : (
              todayRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                  <div className="flex items-center space-x-4">
                    <Avatar className="ring-2 ring-primary/20">
                      <AvatarImage src={record.avatar} />
                      <AvatarFallback className="bg-primary/10">
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{record.name}</p>
                      <p className="text-sm text-muted-foreground">
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
                    className={record.status === 'present' ? 'bg-green-500' : ''}
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