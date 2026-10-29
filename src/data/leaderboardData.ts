import { StudentRankItem, LeaderboardTimeframe, UserProgress, UserProfile } from '../types';

// Sample demonstration students (Demo uchun kerak bo'lsa yuklanishi mumkin)
export const DEMO_SAMPLE_STUDENTS: Omit<StudentRankItem, 'rank'>[] = [
  {
    id: 'stud-1',
    name: 'Oybekjon Adashev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    completedLessons: 198,
    points: 5240,
    weeklyPoints: 680,
    monthlyPoints: 2180,
    streakDays: 58,
    certificatesCount: 9,
    badge: 'Grandmaster',
    specialty: 'Full-Stack Web & Sunʼiy Intellekt Dasturlash',
    category: 'it',
    trend: 'same'
  },
  {
    id: 'stud-2',
    name: 'Toshtemirov Firdavs',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    completedLessons: 186,
    points: 4890,
    weeklyPoints: 570,
    monthlyPoints: 1840,
    streakDays: 48,
    certificatesCount: 7,
    badge: 'Grandmaster',
    specialty: 'Kiberxavfsizlik, Algoritmlar & Backend Dasturlash',
    category: 'it',
    trend: 'up'
  },
  {
    id: 'stud-3',
    name: 'Madina Ismoilova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    completedLessons: 172,
    points: 4350,
    weeklyPoints: 490,
    monthlyPoints: 1680,
    streakDays: 38,
    certificatesCount: 6,
    badge: 'Grandmaster',
    specialty: 'IELTS Masterclass & Nemis tili C1',
    category: 'languages',
    trend: 'up'
  }
];

export const INITIAL_TOP_STUDENTS: Omit<StudentRankItem, 'rank'>[] = [];

const LEADERBOARD_STORAGE_KEY = 'ziyotalim_leaderboard_students_v5';

// Retrieve stored students (defaults to empty so false dummy users are never forced)
export function getStoredLeaderboardStudents(): Omit<StudentRankItem, 'rank'>[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

// Save students list to localStorage
export function saveStoredLeaderboardStudents(students: Omit<StudentRankItem, 'rank'>[]): void {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(students));
  } catch {}
}

// Clear all students (0 students in leaderboard)
export function clearStoredLeaderboardStudents(): Omit<StudentRankItem, 'rank'>[] {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify([]));
  } catch {}
  return [];
}

// Load demo sample students if user explicitly requests
export function loadDemoLeaderboardStudents(): Omit<StudentRankItem, 'rank'>[] {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(DEMO_SAMPLE_STUDENTS));
  } catch {}
  return DEMO_SAMPLE_STUDENTS;
}

export function computeUserBadge(points: number): StudentRankItem['badge'] {
  if (points >= 4000) return 'Grandmaster';
  if (points >= 3000) return 'Master';
  if (points >= 2000) return 'Diamond';
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

export function computeUserPoints(progress: UserProgress): {
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
} {
  const lessonsCount = progress.completedLessonIds.length;
  const certsCount = progress.certificates.length;
  const streak = progress.streakDays || 1;
  const quizScoresSum = Object.values(progress.quizScores || {}).reduce((a, b) => a + b, 0);
  const vocabCount = (progress.masteredVocabIds || []).length;

  const total = 100 + (lessonsCount * 25) + (vocabCount * 10) + (certsCount * 150) + (streak * 12) + Math.round(quizScoresSum * 0.5);
  const weekly = Math.round(total * 0.15) + (lessonsCount * 15) + (vocabCount * 5);
  const monthly = Math.round(total * 0.45) + (lessonsCount * 20) + (vocabCount * 8);

  return {
    totalPoints: total,
    weeklyPoints: weekly,
    monthlyPoints: monthly,
  };
}

export interface GetLeaderboardOptions {
  timeframe: LeaderboardTimeframe;
  categoryFilter: 'all' | 'it' | 'languages' | 'exact_sciences';
  progress: UserProgress;
  currentUser: UserProfile | null;
  baseStudentsList?: Omit<StudentRankItem, 'rank'>[];
}

export function getLeaderboardData(
  timeframe: LeaderboardTimeframe,
  categoryFilter: 'all' | 'it' | 'languages' | 'exact_sciences',
  progress: UserProgress,
  currentUser: UserProfile | null,
  customStudentsList?: Omit<StudentRankItem, 'rank'>[]
): {
  students: StudentRankItem[];
  currentUserRankItem: StudentRankItem | null;
} {
  const { totalPoints, weeklyPoints, monthlyPoints } = computeUserPoints(progress);

  type UnrankedStudent = Omit<StudentRankItem, 'rank'> & { isCurrentUser: boolean };

  const rawList = customStudentsList !== undefined ? customStudentsList : getStoredLeaderboardStudents();
  let baseStudents: UnrankedStudent[] = rawList.map(s => ({ ...s, isCurrentUser: false }));

  // If there is an authenticated currentUser, ensure they appear in the leaderboard with real score
  if (currentUser) {
    const userName = currentUser.fullName || 'Talaba';
    const userAvatar = currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80';

    const existingUserIdx = baseStudents.findIndex(s => 
      s.id === currentUser.id || 
      s.name.toLowerCase() === userName.toLowerCase()
    );

    if (existingUserIdx >= 0) {
      const existing = baseStudents[existingUserIdx];
      baseStudents[existingUserIdx] = {
        ...existing,
        id: currentUser.id || existing.id,
        name: `${userName} (Siz)`,
        avatar: userAvatar,
        points: Math.max(existing.points, totalPoints),
        weeklyPoints: Math.max(existing.weeklyPoints, weeklyPoints),
        monthlyPoints: Math.max(existing.monthlyPoints, monthlyPoints),
        completedLessons: Math.max(existing.completedLessons, progress.completedLessonIds.length),
        certificatesCount: Math.max(existing.certificatesCount, progress.certificates.length),
        streakDays: Math.max(existing.streakDays, progress.streakDays || 1),
        badge: computeUserBadge(Math.max(existing.points, totalPoints)),
        isCurrentUser: true,
      };
    } else {
      const userObj: UnrankedStudent = {
        id: currentUser.id || 'current-user-rank-id',
        name: `${userName} (Siz)`,
        avatar: userAvatar,
        completedLessons: progress.completedLessonIds.length,
        points: totalPoints,
        weeklyPoints: weeklyPoints,
        monthlyPoints: monthlyPoints,
        streakDays: progress.streakDays || 1,
        certificatesCount: progress.certificates.length,
        badge: computeUserBadge(totalPoints),
        specialty: 'ZiyoTalim Oʻquvchisi',
        category: 'all',
        trend: 'up',
        isCurrentUser: true,
      };
      baseStudents.unshift(userObj);
    }
  }

  // Filter by category if not 'all'
  let combined = [...baseStudents];
  if (categoryFilter !== 'all') {
    combined = combined.filter(s => s.category === categoryFilter || s.isCurrentUser);
  }

  // Deduplicate combined list by id so no two items ever share the same ID
  const seenStudentIds = new Set<string>();
  const uniqueCombined: UnrankedStudent[] = [];
  for (const s of combined) {
    if (s && s.id && !seenStudentIds.has(s.id)) {
      seenStudentIds.add(s.id);
      uniqueCombined.push(s);
    }
  }

  // Sort strictly by points according to timeframe
  uniqueCombined.sort((a, b) => {
    let pA = a.points;
    let pB = b.points;
    if (timeframe === 'weekly') {
      pA = a.weeklyPoints;
      pB = b.weeklyPoints;
    } else if (timeframe === 'monthly') {
      pA = a.monthlyPoints;
      pB = b.monthlyPoints;
    }
    return pB - pA;
  });

  // Assign clean sequential 1-based ranks (1-o'rin, 2-o'rin, 3-o'rin...)
  const rankedList: StudentRankItem[] = uniqueCombined.map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  const userItem = rankedList.find(s => s.isCurrentUser) || null;

  return {
    students: rankedList,
    currentUserRankItem: userItem
  };
}
