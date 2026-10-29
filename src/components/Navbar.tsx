import React from 'react';
import { Sun, Moon, Trophy, ShieldCheck, User, Mail, ShieldAlert, Settings } from 'lucide-react';
import { UserProgress, UserProfile } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ZiyoTalimLogo } from './ZiyoTalimLogo';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  progress?: UserProgress;
  currentUser?: UserProfile | null;
  onOpenMyLearning?: () => void;
  onOpenLanguageLab?: () => void;
  onOpenITPlayground?: () => void;
  onOpenQuizCenter?: () => void;
  onOpenLeaderboard: () => void;
  onOpenAuth?: () => void;
  onOpenAdminLogin: () => void;
  onOpenSettings?: () => void;
  isAdminLoggedIn?: boolean;
  onSelectCategory?: (cat: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenLeaderboard,
  onOpenAdminLogin,
  onOpenAuth,
  onOpenSettings,
  isAdminLoggedIn = false,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-15 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Official Ziyo Talim Logo Wordmark */}
        <a 
          href="#" 
          className="shrink-0 flex items-center transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          <ZiyoTalimLogo size={38} showText={true} />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={onOpenLeaderboard} 
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold"
          >
            <Trophy className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{t('nav.rating')}</span>
          </button>
        </nav>

        {/* Zone 3: Actions, Auth, Theme, Admin */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* User Profile / Gmail 2FA Kirish button */}
          <button
            onClick={onOpenAuth}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              currentUser
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700'
                : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-2xs'
            }`}
            title={currentUser ? `${currentUser.fullName} (Gmail 2FA tasdiqlangan)` : "Gmail yoki Login/Parol bilan kirish"}
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-4 h-4 rounded-full object-cover border border-emerald-500"
                />
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.fullName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Kirish</span>
                <span className="px-1 py-0.2 text-[9px] font-extrabold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">
                  Gmail 2FA
                </span>
              </>
            )}
          </button>

          {/* Language Switcher Dropdown (O'zbekcha / Русский / English) */}
          <LanguageSwitcher />

          {/* Theme Toggle Button (Light / Dark Mode Switcher) */}
          <button
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer shadow-2xs flex items-center justify-center group"
            title={isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 group-hover:text-indigo-600 transition-colors" />
            )}
          </button>

          {/* Sozlamalar (Settings) Modal Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              aria-label="Sozlamalar"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer shadow-2xs flex items-center justify-center group"
              title="Sozlamalar (Profil, Xavfsizlik, Bildirishnomalar, Oʻquv jarayoni)"
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          )}

          {/* Admin Kabineti Button */}
          <button
            onClick={onOpenAdminLogin}
            className={`px-3 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              isAdminLoggedIn
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-indigo-600/20'
            }`}
            title="Admin va tizim kabinetiga kirish (Login: 1, Parol: 1)"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? t('nav.adminCabinet') : t('nav.login')}</span>
            <span className="sm:hidden">Admin</span>
            {isAdminLoggedIn && (
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
