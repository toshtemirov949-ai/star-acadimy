import React from 'react';
import { Home, BookOpen, Trophy, Languages, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onGoCourses: () => void;
  onGoLeaderboard: () => void;
  onOpenTranslator: () => void;
  onOpenCabinet: () => void;
  isLoggedIn?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onGoCourses,
  onGoLeaderboard,
  onOpenTranslator,
  onOpenCabinet,
  isLoggedIn = false
}) => {
  const { language } = useLanguage();

  const labels = {
    home: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Asosiy',
    courses: language === 'ru' ? 'Курсы' : language === 'en' ? 'Courses' : 'Kurslar',
    ranking: language === 'ru' ? 'Рейтинг' : language === 'en' ? 'Ranking' : 'Reyting',
    translator: language === 'ru' ? 'Переводчик' : language === 'en' ? 'Translator' : 'Tarjimon',
    cabinet: language === 'ru' ? 'Кабинет' : language === 'en' ? 'Profile' : 'Kabinet',
  };

  return (
    <nav
      aria-label="Mobil pastki menyu"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1 shadow-lg shadow-black/10 transition-colors"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 6px)' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* 1. Asosiy / Home */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 transition-all cursor-pointer group"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">{labels.home}</span>
        </button>

        {/* 2. Kurslar / Courses */}
        <button
          type="button"
          onClick={onGoCourses}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 transition-all cursor-pointer group"
        >
          <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">{labels.courses}</span>
        </button>

        {/* 3. Reyting / Leaderboard */}
        <button
          type="button"
          onClick={onGoLeaderboard}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-all cursor-pointer group"
        >
          <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-500" />
          <span className="text-[10px] font-bold mt-1 tracking-tight text-amber-600 dark:text-amber-400">{labels.ranking}</span>
        </button>

        {/* 4. Real Tarjimon / Translator */}
        <button
          type="button"
          onClick={onOpenTranslator}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-sky-500 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="relative">
            <Languages className="w-5 h-5 group-hover:scale-110 transition-transform text-sky-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight text-sky-600 dark:text-sky-400">{labels.translator}</span>
        </button>

        {/* 5. Shaxsiy Kabinet / Profile */}
        <button
          type="button"
          onClick={onOpenCabinet}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="relative">
            <User className="w-5 h-5 group-hover:scale-110 transition-transform text-indigo-600 dark:text-indigo-400" />
            {isLoggedIn && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900 absolute -top-0.5 -right-0.5" />
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight text-indigo-600 dark:text-indigo-400">{labels.cabinet}</span>
        </button>

      </div>
    </nav>
  );
};
