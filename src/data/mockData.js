export const patients = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 8,
    diagnosis: "Childhood Apraxia of Speech",
    therapist: "Dr. Sarah Wilson",
    lastSession: "2024-01-15",
    nextSession: "2024-01-22",
    progress: 75,
    goals: [
      "Improve consonant cluster production",
      "Increase speech intelligibility to 80%",
      "Practice multisyllabic words"
    ],
    recentActivity: "Completed articulation exercises with 85% accuracy"
  },
  {
    id: "2", 
    name: "Michael Chen",
    age: 6,
    diagnosis: "Phonological Disorder",
    therapist: "Dr. Sarah Wilson",
    lastSession: "2024-01-14",
    nextSession: "2024-01-21",
    progress: 60,
    goals: [
      "Eliminate fronting of velars",
      "Reduce final consonant deletion",
      "Improve narrative skills"
    ],
    recentActivity: "Working on /k/ and /g/ sounds in word-initial position"
  },
  {
    id: "3",
    name: "Sophia Rodriguez", 
    age: 10,
    diagnosis: "Stuttering",
    therapist: "Dr. Sarah Wilson",
    lastSession: "2024-01-16",
    nextSession: "2024-01-23",
    progress: 85,
    goals: [
      "Implement fluency strategies",
      "Reduce secondary behaviors", 
      "Build confidence in speaking"
    ],
    recentActivity: "Practiced easy onset technique during reading tasks"
  }
];

export const sessions = [
  {
    id: "1",
    patientId: "1",
    patientName: "Emma Johnson",
    date: "2024-01-15",
    duration: 45,
    therapist: "Dr. Sarah Wilson",
    summary: "Emma showed excellent progress in consonant cluster production today. We focused on /st/, /sp/, and /sk/ blends using picture cards and interactive games. She achieved 85% accuracy in single words and 70% in sentences. Her confidence is noticeably improving.",
    goals: ["Consonant clusters", "Speech intelligibility"],
    progressScore: 8,
    notes: "Continue with /sl/ and /sm/ blends next session. Parent reported increased willingness to speak at home.",
    nextSteps: "Practice consonant clusters in conversational speech"
  },
  {
    id: "2",
    patientId: "2", 
    patientName: "Michael Chen",
    date: "2024-01-14",
    duration: 30,
    therapist: "Dr. Sarah Wilson",
    summary: "Michael worked on eliminating fronting patterns today. We used minimal pairs to contrast /k/ vs /t/ and /g/ vs /d/. He's beginning to self-correct when provided with visual cues. Motor planning activities were incorporated using movement and rhythm.",
    goals: ["Eliminate fronting", "Phonological awareness"],
    progressScore: 6,
    notes: "Requires consistent cueing for velar sounds. Mother will practice at home using word lists provided.",
    nextSteps: "Increase complexity to 2-syllable words with velars"
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Sophia Rodriguez",
    date: "2024-01-16", 
    duration: 50,
    therapist: "Dr. Sarah Wilson",
    summary: "Sophia demonstrated excellent use of fluency strategies during structured activities. We practiced easy onset, light contacts, and continuous phonation. She successfully used these techniques during reading and showed reduced tension in conversational speech.",
    goals: ["Fluency strategies", "Confidence building"],
    progressScore: 9,
    notes: "Sophia is ready to begin transfer activities to more challenging speaking situations.",
    nextSteps: "Practice fluency techniques in group settings and presentations"
  }
];

export const progressData = [
  { session: 1, score: 45, date: "2024-01-01" },
  { session: 2, score: 52, date: "2024-01-03" },
  { session: 3, score: 48, date: "2024-01-05" },
  { session: 4, score: 61, date: "2024-01-08" },
  { session: 5, score: 67, date: "2024-01-10" },
  { session: 6, score: 73, date: "2024-01-12" },
  { session: 7, score: 78, date: "2024-01-15" },
  { session: 8, score: 82, date: "2024-01-17" },
];