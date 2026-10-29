import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, Medal, Crown, Flame, Award, BookOpen, Sparkles, 
  ArrowUp, ArrowDown, Minus, Search, CheckCircle2,
  ChevronRight, Info, UserPlus, Trash2, Plus, RefreshCw, X, AlertCircle, Users
} from 'lucide-react';
import { LeaderboardTimeframe, StudentRankItem, UserProgress, UserProfile } from '../types';
import { 
  getLeaderboardData, 
  getStoredLeaderboardStudents, 
  saveStoredLeaderboardStudents, 
  clearStoredLeaderboardStudents,
  loadDemoLeaderboardStudents,
  computeUserBadge 
} from '../data/leaderboardData';

interface LeaderboardProps {
  progress: UserProgress;
  currentUser: UserProfile | null;
  onOpenClassroomDirect?: () => void;
  onOpenQuizCenter?: () => void;
  onOpenRegister?: () => void;
  onStudentsCountChange?: (count: number) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  progress,
  currentUser,
  onOpenClassroomDirect,
  onOpenQuizCenter,
  onOpenRegister,
  onStudentsCountChange,
}) => {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('all-time');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'it' | 'languages' | 'exact_sciences'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRules, setShowRules] = useState(false);

  // Real-time stored students list
  const [rawStudentsList, setRawStudentsList] = useState<Omit<StudentRankItem, 'rank'>[]>(() => {
    return getStoredLeaderboardStudents();
  });

  // Modal to add new student (Bola qo'shish)
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentSpecialty, setNewStudentSpecialty] = useState('');
  const [newStudentCategory, setNewStudentCategory] = useState<'it' | 'languages' | 'exact_sciences'>('it');
  const [newStudentPoints, setNewStudentPoints] = useState<number>(1250);
  const [newStudentLessons, setNewStudentLessons] = useState<number>(35);

  // Student deletion confirmation
  const [deleteCandidate, setDeleteCandidate] = useState<StudentRankItem | null>(null);

  // Status banner toast
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Sync dynamic ranking data incorporating currentUser and stored students
  const { students, currentUserRankItem } = useMemo(() => {
    return getLeaderboardData(timeframe, categoryFilter, progress, currentUser, rawStudentsList);
  }, [timeframe, categoryFilter, progress, currentUser, rawStudentsList]);

  // Sync students list count with parent and storage
  useEffect(() => {
    saveStoredLeaderboardStudents(rawStudentsList);
    if (onStudentsCountChange) {
      onStudentsCountChange(students.length);
    }
  }, [rawStudentsList, students.length, onStudentsCountChange]);

  // Filter students by search
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.specialty.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  // Dynamic Podium Students (1-, 2-, 3-o'rinlar)
  const top1 = students[0];
  const top2 = students[1];
  const top3 = students[2];

  // Add new student (Real bola qo'shish)
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const pointsNum = Number(newStudentPoints) || 1000;
    const lessonsNum = Number(newStudentLessons) || 20;

    const newStudent: Omit<StudentRankItem, 'rank'> = {
      id: 'stud-user-' + Date.now(),
      name: newStudentName.trim(),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (rawStudentsList.length % 50)}?auto=format&fit=crop&w=250&q=80`,
      completedLessons: lessonsNum,
      points: pointsNum,
      weeklyPoints: Math.round(pointsNum * 0.16),
      monthlyPoints: Math.round(pointsNum * 0.44),
      streakDays: Math.min(60, Math.max(3, Math.round(lessonsNum / 3))),
      certificatesCount: Math.max(1, Math.round(lessonsNum / 25)),
      badge: computeUserBadge(pointsNum),
      specialty: newStudentSpecialty.trim() || (newStudentCategory === 'it' ? 'Dasturlash & Web' : newStudentCategory === 'languages' ? 'Ingliz tili & Soʻzlashuv' : 'Aniq Fanlar'),
      category: newStudentCategory,
      trend: 'up'
    };

    const updated = [newStudent, ...rawStudentsList];
    setRawStudentsList(updated);
    setShowAddStudentModal(false);
    setNewStudentName('');
    setNewStudentSpecialty('');
    showNotice(`"${newStudent.name}" muvaffaqiyatli qoʻshildi! Jami oʻquvchilar soni yangilandi.`);
  };

  // Remove student (Bola o'chirish / kamaytirish)
  const handleConfirmDelete = () => {
    if (!deleteCandidate) return;
    const targetId = deleteCandidate.id;
    const targetName = deleteCandidate.name;
    const updated = rawStudentsList.filter(s => s.id !== targetId);
    setRawStudentsList(updated);
    setDeleteCandidate(null);
    showNotice(`"${targetName}" reytingdan chiqarildi. Oʻrinlar va umumiy son qayta hisoblandi!`);
  };

  // Adjust points for student (+25 ball qo'shish)
  const handleAdjustPoints = (studentId: string, delta: number) => {
    const updated = rawStudentsList.map(s => {
      if (s.id === studentId) {
        const nextPoints = Math.max(0, s.points + delta);
        return {
          ...s,
          points: nextPoints,
          weeklyPoints: Math.max(0, s.weeklyPoints + Math.round(delta * 0.4)),
          monthlyPoints: Math.max(0, s.monthlyPoints + Math.round(delta * 0.7)),
          completedLessons: delta > 0 ? s.completedLessons + 1 : Math.max(0, s.completedLessons - 1),
          badge: computeUserBadge(nextPoints)
        };
      }
      return s;
    });
    setRawStudentsList(updated);
    showNotice(`Oʻquvchi bali ${delta > 0 ? '+' + delta : delta} XP oʻzgardi va reyting qayta tartiblandi!`);
  };

  // Clear all students (0 nafar qilish)
  const handleClearAll = () => {
    if (window.confirm("Barcha qoʻshilgan oʻquvchilarni oʻchirib, reytingni boʻshatishni xohlaysizmi?")) {
      const cleared = clearStoredLeaderboardStudents();
      setRawStudentsList(cleared);
      showNotice("Reyting toʻliq tozalandi (0 nafar oʻquvchi).");
    }
  };

  // Load sample demo students
  const handleLoadDemo = () => {
    const demo = loadDemoLeaderboardStudents();
    setRawStudentsList(demo);
    showNotice("Namunaviy oʻquvchilar yuklandi!");
  };

  const getBadgeStyle = (badge: StudentRankItem['badge']) => {
    switch (badge) {
      case 'Grandmaster':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'Master':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'Diamond':
        return 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800';
      case 'Gold':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Silver':
        return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
      default:
        return 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800';
    }
  };

  return (
    <section id="leaderboard" className="py-5 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Toast Notice */}
      {actionNotice && (
        <div className="mb-2.5 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-900 dark:text-emerald-100 ml-2">✕</button>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-0.5 uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 fill-amber-500" />
            <span>Peshqadamlar Jadvali & Natijalar</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Iqtidorli Talabalar Reytingi
            </h2>
            <span className={`px-2 py-0.2 rounded-full text-[10px] font-black border ${
              students.length > 0 
                ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}>
              Jami: {students.length} nafar oʻquvchi
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl">
            {students.length > 0 
              ? "Oʻquvchilar ball toʻplash ketma-ketligi boʻyicha real saralanadi. Yangi bola qoʻshilsa yoki oʻchirilsa, oʻrinlar va umumiy son avtomatik qayta hisoblanadi."
              : "Hozircha reyting jadvali boʻsh. Siz birinchi boʻlib darslarni boshlab roʻyxatda oʻz oʻrningizni egallashingiz yoki oʻquvchi qoʻshishingiz mumkin."}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowAddStudentModal(true)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            title="Yangi oʻquvchi qoʻshish"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Oʻquvchi Qoʻshish</span>
          </button>

          <button
            onClick={() => setShowRules(!showRules)}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <span>Ball Qoidalari</span>
          </button>

          {rawStudentsList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Barcha qoʻshilgan oʻquvchilarni tozalash"
            >
              <Trash2 className="w-3 h-3 text-rose-500" />
              <span>Tozalash</span>
            </button>
          )}

          {rawStudentsList.length === 0 && (
            <button
              onClick={handleLoadDemo}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Namuna sifatida test oʻquvchilarni yuklash"
            >
              <RefreshCw className="w-3 h-3 text-indigo-600" />
              <span>Namuna yuklash</span>
            </button>
          )}

          {!currentUser && (
            <button
              onClick={onOpenRegister}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Roʻyxatdan Oʻtish (+100 ball)</span>
            </button>
          )}
        </div>
      </div>

      {/* Points Rules Explanation Modal/Drawer if opened */}
      {showRules && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/60 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 border border-indigo-100 dark:border-slate-700 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Qanday qilib reytingda ball toʻplash mumkin?
            </h4>
            <button
              onClick={() => setShowRules(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer font-bold"
            >
              Yopish ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base font-mono block mb-0.5">+25 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Har bir darsni tamomlash</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Sinfxonada nazariya va testlarni yakunlang</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-violet-600 dark:text-violet-400 text-base font-mono block mb-0.5">+10 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Audio trenajor soʻzi</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Har bir yangi soʻzni oʻrganib eshiting</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base font-mono block mb-0.5">+50-100 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Yakuniy sinov testlari</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Test markazida bilimingizni sinang</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-base font-mono block mb-0.5">+150 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Rasmiy sertifikat olish</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Kursni yakunlab sertifikat oling</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-rose-600 dark:text-rose-400 text-base font-mono block mb-0.5">+12 ball/kun</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Uzluksiz faollik (Streak)</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Har kuni kamida bitta dars oʻzlashtiring</p>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC PODIUM DISPLAY (Only displayed when there are students) */}
      {students.length > 0 ? (
        <div className="mb-3.5 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 items-end max-w-2xl mx-auto">
            
            {/* 2nd Place (Silver) */}
            {top2 ? (
              <div className="order-2 md:order-1 bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700 shadow-2xs text-center flex flex-col items-center relative overflow-hidden transition-all hover:-translate-y-0.5">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300"></div>
                
                <div className="relative mb-1.5">
                  <img
                    src={top2.avatar}
                    alt={top2.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-300 dark:border-slate-600 shadow-xs"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-white font-extrabold text-[9px] flex items-center justify-center border border-white dark:border-slate-900 shadow-2xs">
                    2
                  </span>
                </div>

                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate max-w-full">
                  {top2.name}
                </h4>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-1 truncate max-w-full">
                  {top2.specialty}
                </p>

                <div className="w-full pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono text-[9px]">{top2.completedLessons} dars</span>
                  <span className="font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    {(timeframe === 'weekly' ? top2.weeklyPoints : timeframe === 'monthly' ? top2.monthlyPoints : top2.points).toLocaleString()} XP
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden md:block order-2 md:order-1 opacity-0 pointer-events-none"></div>
            )}

            {/* 1st Place (Gold / Crown) */}
            {top1 && (
              <div className={`order-1 md:order-2 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 rounded-xl p-3 border-2 border-amber-400 dark:border-amber-500 shadow-sm text-center flex flex-col items-center relative overflow-hidden transition-all hover:-translate-y-0.5 ${students.length === 1 ? 'col-span-full max-w-md mx-auto' : 'md:-mb-0.5'}`}>
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500"></div>

                <div className="relative mb-1.5">
                  <Crown className="w-5 h-5 text-amber-500 fill-amber-400 absolute -top-4 left-1/2 -translate-x-1/2 drop-shadow-xs" />
                  <img
                    src={top1.avatar}
                    alt={top1.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm ring-2 ring-amber-400/20"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center border border-white dark:border-slate-900 shadow-2xs">
                    1
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 mb-0.5">
                  <Trophy className="w-2.5 h-2.5 text-amber-600" />
                  <span>Mutloq Peshqadam</span>
                </div>

                <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-full">
                  {top1.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 truncate max-w-full">
                  {top1.specialty}
                </p>

                <div className="w-full pt-1 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[9px]">{top1.completedLessons} dars</span>
                  <span className="font-black font-mono text-xs text-amber-600 dark:text-amber-400">
                    {(timeframe === 'weekly' ? top1.weeklyPoints : timeframe === 'monthly' ? top1.monthlyPoints : top1.points).toLocaleString()} XP
                  </span>
                </div>
              </div>
            )}

            {/* 3rd Place (Bronze) */}
            {top3 ? (
              <div className="order-3 bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700 shadow-2xs text-center flex flex-col items-center relative overflow-hidden transition-all hover:-translate-y-0.5">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600"></div>

                <div className="relative mb-1.5">
                  <img
                    src={top3.avatar}
                    alt={top3.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-700 shadow-xs"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-white font-extrabold text-[9px] flex items-center justify-center border border-white dark:border-slate-900 shadow-2xs">
                    3
                  </span>
                </div>

                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate max-w-full">
                  {top3.name}
                </h4>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-1 truncate max-w-full">
                  {top3.specialty}
                </p>

                <div className="w-full pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono text-[9px]">{top3.completedLessons} dars</span>
                  <span className="font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    {(timeframe === 'weekly' ? top3.weeklyPoints : timeframe === 'monthly' ? top3.monthlyPoints : top3.points).toLocaleString()} XP
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden md:block order-3 opacity-0 pointer-events-none"></div>
            )}

          </div>
        </div>
      ) : (
        /* Empty State when 0 students exist */
        <div className="mb-6 p-6 rounded-xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 text-center max-w-xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2.5 border border-indigo-100 dark:border-indigo-800">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Hozircha reyting jadvali boʻsh
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-sm mx-auto">
            Saytda hozircha hech kim yoʻq. Siz birinchi boʻlib roʻyxatdan oʻtishingiz yoki yangi oʻquvchilarni kiritishingiz mumkin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Oʻquvchi Qoʻshish</span>
            </button>
            {!currentUser && (
              <button
                onClick={onOpenRegister}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Roʻyxatdan Oʻtish</span>
              </button>
            )}
            <button
              onClick={handleLoadDemo}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Namunaviy oʻquvchilarni yuklash</span>
            </button>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-3 p-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        
        {/* Timeframe Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => setTimeframe('all-time')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              timeframe === 'all-time'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Barcha davr
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              timeframe === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Shu oy
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              timeframe === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Shu hafta
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: 'all', label: 'Barcha yoʻnalishlar' },
            { id: 'it', label: 'IT & Dasturlash' },
            { id: 'languages', label: 'Xorijiy Tillar' },
            { id: 'exact_sciences', label: 'Aniq Fanlar' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer border ${
                categoryFilter === cat.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[180px]">
          <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Oʻquvchi qidirish..."
            className="w-full pl-7 pr-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
          />
        </div>

      </div>

      {/* FULL LEADERBOARD TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
        
        {/* Table Head */}
        <div className="grid grid-cols-12 gap-2 py-2 px-3 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/70 dark:bg-slate-950/70">
          <div className="col-span-1 text-center">Oʻrin</div>
          <div className="col-span-4 sm:col-span-4">Oʻquvchi & Mutaxassislik</div>
          <div className="col-span-2 sm:col-span-2 text-center">Darslar</div>
          <div className="hidden sm:block sm:col-span-2 text-center">Faollik & Sertifikat</div>
          <div className="col-span-3 sm:col-span-2 text-right pr-2">Ball (XP)</div>
          <div className="col-span-2 sm:col-span-1 text-center">Amallar</div>
        </div>

        {/* Table Rows */}
        {filteredStudents.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredStudents.map((student, idx) => {
              const isSelf = student.isCurrentUser;
              const pointsToDisplay = timeframe === 'weekly' ? student.weeklyPoints : timeframe === 'monthly' ? student.monthlyPoints : student.points;

              return (
                <div
                  key={`${student.id}-${idx}`}
                  className={`grid grid-cols-12 gap-2 py-1.5 px-2.5 sm:px-3 items-center transition-colors ${
                    isSelf
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-3 border-indigo-600 font-medium'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  
                  {/* Column 1: Rank Number + Trend */}
                  <div className="col-span-1 flex items-center justify-center gap-1">
                    <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-mono font-extrabold ${
                      student.rank === 1
                        ? 'bg-amber-400 text-amber-950 shadow-xs'
                        : student.rank === 2
                        ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                        : student.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {student.rank}
                    </span>

                    {/* Trend */}
                    {student.trend === 'up' ? (
                      <ArrowUp className="w-2.5 h-2.5 text-emerald-500 hidden sm:block" />
                    ) : student.trend === 'down' ? (
                      <ArrowDown className="w-2.5 h-2.5 text-rose-500 hidden sm:block" />
                    ) : (
                      <Minus className="w-2.5 h-2.5 text-slate-400 hidden sm:block" />
                    )}
                  </div>

                  {/* Column 2: Student Details */}
                  <div className="col-span-4 sm:col-span-4 flex items-center gap-2 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      {isSelf && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900 absolute top-0 right-0"></span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {student.name}
                        </span>
                        {isSelf && (
                          <span className="text-[9px] font-black px-1 py-0.2 rounded bg-indigo-600 text-white">
                            Siz
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {student.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Column 3: Completed Lessons */}
                  <div className="col-span-2 sm:col-span-2 text-center">
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {student.completedLessons} ta
                    </span>
                  </div>

                  {/* Column 4: Streak & Certificates */}
                  <div className="hidden sm:flex sm:col-span-2 items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1" title={`${student.streakDays} kun uzluksiz oʻrganish`}>
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-mono text-[11px]">{student.streakDays} kun</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1" title={`${student.certificatesCount} ta xalqaro sertifikat`}>
                      <Award className="w-3 h-3 text-indigo-500" />
                      <span className="font-mono text-[11px]">{student.certificatesCount}</span>
                    </div>
                  </div>

                  {/* Column 5: Points (XP) & Badge */}
                  <div className="col-span-3 sm:col-span-2 text-right pr-2">
                    <span className="text-xs sm:text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block">
                      {pointsToDisplay.toLocaleString()} XP
                    </span>
                    <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded border ${getBadgeStyle(student.badge)}`}>
                      {student.badge}
                    </span>
                  </div>

                  {/* Column 6: Interactive Actions (Ball qo'shish / o'chirish) */}
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleAdjustPoints(student.id, 25)}
                      className="p-1 rounded bg-slate-100 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-emerald-950 text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300 text-[10px] font-bold transition-colors cursor-pointer"
                      title="+25 ball qoʻshish"
                    >
                      +25
                    </button>
                    <button
                      onClick={() => setDeleteCandidate(student)}
                      className="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                      title="Oʻquvchini oʻchirish (Kamaytirish)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
            {searchQuery 
              ? "Qidiruv boʻyicha oʻquvchi topilmadi." 
              : "Hozircha oʻquvchilar roʻyxati boʻsh. '+ Oʻquvchi Qoʻshish' tugmasi orqali yangi oʻquvchi qoʻshishingiz mumkin."}
          </div>
        )}

      </div>

      {/* MODAL: ADD STUDENT (Bola qo'shish) */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Yangi Oʻquvchi Qoʻshish (Reyting)</h3>
              </div>
              <button 
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewStudent} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Oʻquvchi Ism va Familiyasi *
                </label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Masalan: Azizbek Rahimov"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mutaxassislik yoki Yoʻnalish
                </label>
                <input
                  type="text"
                  value={newStudentSpecialty}
                  onChange={(e) => setNewStudentSpecialty(e.target.value)}
                  placeholder="Masalan: Full-Stack Web & AI Dasturlash"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Yoʻnalish Sohasi
                  </label>
                  <select
                    value={newStudentCategory}
                    onChange={(e) => setNewStudentCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  >
                    <option value="it">IT & Dasturlash</option>
                    <option value="languages">Xorijiy Tillar</option>
                    <option value="exact_sciences">Aniq Fanlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Bilim Balli (XP)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10}
                    value={newStudentPoints}
                    onChange={(e) => setNewStudentPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tugatilgan darslar soni
                </label>
                <input
                  type="number"
                  min={0}
                  value={newStudentLessons}
                  onChange={(e) => setNewStudentLessons(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Qoʻshish & Hisoblash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL (Bola kamaytirish / o'chirish) */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Oʻquvchini oʻchirish
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Haqiqatan ham <strong className="text-slate-800 dark:text-slate-200">{deleteCandidate.name}</strong> oʻquvchisini reyting roʻyxatidan chiqarmoqchimisiz? Barcha oʻrinlar va umumiy son avtomatik qayta tartiblanadi.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Yoʻq, qolsin
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Ha, oʻchirilsin</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
