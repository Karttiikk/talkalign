export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  avatar: string;
  lastSession: string;
  progressScore: number;
  assignedSLP: string;
}

export interface TherapyGoal {
  id: string;
  patientId: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  createdDate: string;
}

export interface Session {
  id: string;
  patientId: string;
  date: string;
  duration: number;
  goals: string[];
  summary: string;
  progressScore: number;
  notes: string;
  nextSteps: string[];
  slpNotes?: string;
}

export interface ProgressData {
  date: string;
  score: number;
  sessionType: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    age: 8,
    condition: 'Articulation Disorder',
    avatar: 'EJ',
    lastSession: '2024-01-15',
    progressScore: 78,
    assignedSLP: 'Dr. Sarah Wilson'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 12,
    condition: 'Fluency Disorder',
    avatar: 'MC',
    lastSession: '2024-01-14',
    progressScore: 85,
    assignedSLP: 'Dr. Sarah Wilson'
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    age: 6,
    condition: 'Language Delay',
    avatar: 'SR',
    lastSession: '2024-01-16',
    progressScore: 65,
    assignedSLP: 'Dr. Sarah Wilson'
  }
];

export const mockTherapyGoals: TherapyGoal[] = [
  {
    id: '1',
    patientId: '1',
    title: 'Improve /r/ sound production',
    description: 'Practice /r/ sound in initial position words with 80% accuracy',
    targetDate: '2024-03-15',
    status: 'active',
    progress: 78,
    createdDate: '2024-01-01'
  },
  {
    id: '2',
    patientId: '1',
    title: 'Increase vocabulary',
    description: 'Learn 20 new vocabulary words related to daily activities',
    targetDate: '2024-02-28',
    status: 'active',
    progress: 45,
    createdDate: '2024-01-01'
  },
  {
    id: '3',
    patientId: '2',
    title: 'Reduce stuttering frequency',
    description: 'Decrease stuttering instances during conversation by 50%',
    targetDate: '2024-04-01',
    status: 'active',
    progress: 85,
    createdDate: '2024-01-01'
  }
];

export const mockSessions: Session[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-01-15',
    duration: 45,
    goals: ['Improve /r/ sound production', 'Increase vocabulary'],
    summary: 'Emma showed significant improvement in /r/ sound production today. She successfully produced the /r/ sound in 15 out of 20 target words. We practiced with picture cards and tongue exercises. Recommended daily practice at home.',
    progressScore: 78,
    notes: 'Patient was engaged and motivated throughout the session.',
    nextSteps: [
      'Continue practicing /r/ sound in initial position',
      'Introduce /r/ in medial position words',
      'Practice 5 new vocabulary words daily'
    ],
    slpNotes: 'Consider increasing session frequency if progress continues at this rate.'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-01-14',
    duration: 60,
    goals: ['Reduce stuttering frequency'],
    summary: 'Michael demonstrated excellent fluency techniques during structured conversation. Stuttering frequency reduced to 2-3 instances per minute, down from 8-10 last week. Confidence is building significantly.',
    progressScore: 85,
    notes: 'Used breathing techniques effectively during longer sentences.',
    nextSteps: [
      'Practice fluency techniques in group settings',
      'Work on telephone conversations',
      'Continue daily breathing exercises'
    ],
    slpNotes: 'Ready to advance to more challenging conversation topics.'
  },
  {
    id: '3',
    patientId: '3',
    date: '2024-01-16',
    duration: 30,
    goals: ['Language comprehension'],
    summary: 'Sofia is making steady progress with following 2-step directions. She successfully completed 6 out of 10 complex instructions. Working on expanding sentence length and using descriptive words.',
    progressScore: 65,
    notes: 'Some difficulty with temporal concepts (before/after).',
    nextSteps: [
      'Practice temporal concepts with visual aids',
      'Increase sentence length to 4-5 words',
      'Introduce new action words through play'
    ],
    slpNotes: 'Consider consulting with family about home practice strategies.'
  }
];

export const mockProgressData: Record<string, ProgressData[]> = {
  '1': [
    { date: '2024-01-01', score: 45, sessionType: 'Initial Assessment' },
    { date: '2024-01-08', score: 52, sessionType: 'Articulation Practice' },
    { date: '2024-01-15', score: 78, sessionType: 'Sound Production' }
  ],
  '2': [
    { date: '2024-01-01', score: 60, sessionType: 'Fluency Assessment' },
    { date: '2024-01-07', score: 72, sessionType: 'Breathing Techniques' },
    { date: '2024-01-14', score: 85, sessionType: 'Conversation Practice' }
  ],
  '3': [
    { date: '2024-01-01', score: 35, sessionType: 'Language Assessment' },
    { date: '2024-01-09', score: 48, sessionType: 'Vocabulary Building' },
    { date: '2024-01-16', score: 65, sessionType: 'Direction Following' }
  ]
};