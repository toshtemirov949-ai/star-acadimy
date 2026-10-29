import React from 'react';
import { 
  Search, ArrowRight, Code2, Globe2, Bot, 
  Terminal, Sparkles, Languages, CheckCircle2, Award, Zap, X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenLanguageLab: () => void;
  onOpenITPlayground: () => void;
  onOpenQuizCenter: () => void;
  onOpenAIChatbot?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenLeaderboard?: () => void;
  onOpenTranslator?: () => void;
  onOpenMyLearning?: () => void;
  totalCoursesCount?: number;
  totalStudentsCount?: number;
  totalCertificatesCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  onOpenLanguageLab,
  onOpenITPlayground,
  onOpenQuizCenter,
  onOpenAIChatbot,
  onNavigateSection,
  onOpenLeaderboard,
  onOpenTranslator,
  totalCoursesCount = 16,
  totalStudentsCount = 0,
  totalCertificatesCount = 0
}) => {
  const { language, t } = useLanguage();

  const scrollToCatalog = () => {
    const el = document.getElementById('courses-catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    scrollToCatalog();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800 pt-6 pb-8 sm:pt-8 sm:pb-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Subtle Pill-free Header Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18] text-balance">
              {t.heroTitle} <span className="text-indigo-600 dark:text-indigo-400">{t.heroHighlight}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Clean & Functional Search Bar */}
            <div className="pt-1">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-24 py-2 sm:py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950 focus:outline-none transition-all"
                />

                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                      title={t.searchClear}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer"
                  >
                    <span>{t.searchSubmit}</span>
                  </button>
                </div>
              </form>

              {/* Quick Subject Filter Controls */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                  {t.heroQuickJump}
                </span>
                <button
                  onClick={() => onNavigateSection ? onNavigateSection('it-courses') : scrollToCatalog()}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-900/60 transition-colors cursor-pointer font-bold flex items-center gap-1 text-[11px] shadow-2xs"
                >
                  <Code2 className="w-3 h-3" />
                  <span>{t.heroQuickIT}</span>
                </button>
                <button
                  onClick={() => onNavigateSection ? onNavigateSection('language-courses') : scrollToCatalog()}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-200 dark:border-emerald-900/60 transition-colors cursor-pointer font-bold flex items-center gap-1 text-[11px] shadow-2xs"
                >
                  <Languages className="w-3 h-3" />
                  <span>{t.heroQuickLanguages}</span>
                </button>
                <button
                  onClick={onOpenAIChatbot || onOpenTranslator}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 rounded-md border border-sky-200 dark:border-sky-900/60 transition-colors cursor-pointer font-bold flex items-center gap-1 text-[11px] shadow-2xs"
                >
                  <Bot className="w-3 h-3" />
                  <span>{t.heroQuickAI}</span>
                </button>
              </div>
            </div>

            {/* Quick Action Hub Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <button
                onClick={() => onNavigateSection ? onNavigateSection('it-courses') : scrollToCatalog()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-600/15 transition-all cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{t.heroStartIT}</span>
              </button>

              <button
                onClick={() => onNavigateSection ? onNavigateSection('language-courses') : scrollToCatalog()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/15 transition-all cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{t.heroExploreLanguages}</span>
              </button>

              <button
                onClick={onOpenAIChatbot || onOpenTranslator}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-sky-500" />
                <span>{t.heroAskAI}</span>
              </button>
            </div>

            {/* Quantitative Proof Stats */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div>
                <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tabular-nums">
                  {totalStudentsCount.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t.statStudents}</p>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold block">{t.statGrowthWeek}</span>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {totalCoursesCount}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t.statCourses}</p>
                <span className="text-[10px] text-indigo-500 dark:text-indigo-300 font-semibold block">100% Bepul</span>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {totalCertificatesCount.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t.statCertificates}</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">QR-kodli</span>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-amber-500 tabular-nums">10</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t.statLanguages}</p>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block">{t.statFreeAccess}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Ecosystem Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900 p-4 sm:p-5 shadow-xl border border-slate-800 text-white space-y-3.5 overflow-hidden">
              
              {/* Subtle ambient backlights */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    {t.heroCardTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {t.heroCardSubtitle}
                  </p>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  v2.6 Live
                </div>
              </div>

              {/* Interactive Modules Preview */}
              <div className="space-y-2 relative z-10">
                
                {/* 1. IT Sandbox */}
                <div 
                  onClick={onOpenITPlayground}
                  className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {t.heroCardIT}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {t.heroCardITDesc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                {/* 2. Languages Lab */}
                <div 
                  onClick={onOpenLanguageLab}
                  className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 group-hover:scale-110 transition-transform">
                      <Globe2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {t.heroCardLang}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {t.heroCardLangDesc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                {/* 3. AI Assistant */}
                <div 
                  onClick={onOpenAIChatbot}
                  className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-sky-600/30 text-sky-400 group-hover:scale-110 transition-transform">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                        {t.heroCardAI}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {t.heroCardAIDesc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Card Footer Feature Note */}
              <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.heroCardCert}</span>
                </div>
                <div className="text-emerald-400 font-bold">{t.heroCardFree}</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
