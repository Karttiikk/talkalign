import { useState } from 'react';
import { mockPatients, mockProgressData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, Filter, Download } from 'lucide-react';

export function ProgressTracker({ onNavigate }) {
  const [selectedPatient, setSelectedPatient] = useState('1');
  const [timeRange, setTimeRange] = useState('all');

  const patient = mockPatients.find(p => p.id === selectedPatient);
  const progressData = mockProgressData[selectedPatient] || [];

  const filteredData = progressData.filter(data => {
    if (timeRange === 'all') return true;
    const dataDate = new Date(data.date);
    const now = new Date();
    const daysAgo = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return dataDate >= cutoffDate;
  });

  const latestScore = progressData[progressData.length - 1]?.score || 0;
  const previousScore = progressData[progressData.length - 2]?.score || 0;
  const improvement = latestScore - previousScore;

  const getImprovementColor = (improvement) => {
    if (improvement > 0) return 'text-success';
    if (improvement < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getImprovementIcon = (improvement) => {
    if (improvement > 0) return '↗️';
    if (improvement < 0) return '↘️';
    return '➡️';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Progress Tracker</h1>
            <p className="text-muted-foreground">Monitor patient progress over time with detailed analytics</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {patient && (
              <div className="mt-4 p-4 bg-primary-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {patient.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age {patient.age} • {patient.condition}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-success-light text-success">
                        Current: {patient.progressScore}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Time Range</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4 p-4 bg-accent-light rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Latest Progress</p>
                  <p className="text-2xl font-bold text-foreground">{latestScore}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Change</p>
                  <p className={`text-lg font-semibold ${getImprovementColor(improvement)}`}>
                    {getImprovementIcon(improvement)} {improvement > 0 ? '+' : ''}{improvement}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{progressData.length}</div>
            <p className="text-xs text-muted-foreground">Completed sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {Math.round(progressData.reduce((sum, data) => sum + data.score, 0) / progressData.length) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">Overall average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.max(...progressData.map(d => d.score)) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">Highest achievement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getImprovementColor(improvement)}`}>
              {improvement > 0 ? '+' : ''}{improvement}%
            </div>
            <p className="text-xs text-muted-foreground">Since last session</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    className="text-xs"
                  />
                  <YAxis 
                    domain={[0, 100]}
                    className="text-xs"
                  />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value, name) => [`${value}%`, 'Progress Score']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: 'hsl(var(--secondary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart by Session Type */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Session Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="sessionType" 
                    className="text-xs"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    className="text-xs"
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, 'Progress Score']}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="hsl(var(--secondary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Session Type</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Score</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((data, index) => {
                  const previousData = progressData[index - 1];
                  const change = previousData ? data.score - previousData.score : 0;
                  
                  return (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 text-sm">
                        {new Date(data.date).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-sm">{data.sessionType}</td>
                      <td className="p-3">
                        <Badge className="bg-primary-light text-primary">
                          {data.score}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        {index > 0 && (
                          <span className={`text-sm ${getImprovementColor(change)}`}>
                            {change > 0 ? '+' : ''}{change}%
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}