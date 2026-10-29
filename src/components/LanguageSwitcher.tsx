import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, SupportedLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full' | 'pill';
  showLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '',
  variant = 'compact',
  showLabel = true
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // If pill variant, render quick direct selector
  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center p-1 rounded-xl bg-slate-800/90 border border-slate-700/80 gap-1 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs scale-102'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
              title={lang.nativeName}
            >
              <span className="text-sm leading-none">{lang.flag}</span>
              <span className="leading-tight">{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button with prominent globe, flag & title */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/90 text-slate-800 dark:text-slate-100 border border-slate-300/90 dark:border-slate-700 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs active:scale-95 group ring-1 ring-slate-200/50 dark:ring-transparent"
        aria-label={t('nav.changeLang', 'Sayt tilini oʻzgartirish')}
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-sm leading-none drop-shadow-xs">{currentLang.flag}</span>
        {showLabel && (
          <>
            <span className="hidden sm:inline font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {currentLang.nativeName}
            </span>
            <span className="sm:hidden font-extrabold uppercase tracking-wider text-[11px]">
              {currentLang.code}
            </span>
          </>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-indigo-500" />
            <span>Sayt tili / Язык сайта</span>
          </div>

          <div className="p-1.5 space-y-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <div className="text-left">
                      <span className="block leading-tight font-bold">{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400 font-normal leading-none">
                        {lang.code === 'uz' && 'Oʻzbek tili'}
                        {lang.code === 'ru' && 'Русский язык'}
                        {lang.code === 'en' && 'English language'}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center">
                      <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
