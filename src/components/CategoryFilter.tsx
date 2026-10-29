import React from 'react';
import { getLocalizedCategories } from '../data/coursesLocalization';
import { CourseCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: CourseCategory;
  onSelectCategory: (cat: CourseCategory) => void;
  selectedLevel: string;
  onSelectLevel: (lvl: string) => void;
  languageFilter: string;
  onSelectLanguageFilter: (lang: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedLevel,
  onSelectLevel,
  languageFilter,
  onSelectLanguageFilter,
}) => {
  const { language, t } = useLanguage();
  const categories = getLocalizedCategories(language);

  const getCategoryLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case 'all': return t('cat.all', defaultLabel);
      case 'it': return t('cat.it', defaultLabel);
      case 'languages': return t('cat.languages', defaultLabel);
      case 'exact_sciences': return t('cat.exact', defaultLabel);
      case 'natural_sciences': return t('cat.natural', defaultLabel);
      case 'humanities': return t('cat.humanities', defaultLabel);
      case 'primary_school': return t('cat.primary', defaultLabel);
      case 'creative': return t('cat.creative', defaultLabel);
      default: return defaultLabel;
    }
  };

  const getLevelLabel = (lvl: string) => {
    switch (lvl) {
      case 'all': return t('cat.levelAll', 'Barchasi');
      case 'Boshlangʻich': return t('cat.levelBeginner', 'Boshlangʻich');
      case 'Oʻrta': return t('cat.levelIntermediate', 'Oʻrta');
      case 'Yuqori': return t('cat.levelAdvanced', 'Ilgʻor');
      default: return lvl;
    }
  };

  return (
    <div className="space-y-2 mb-4">
      {/* Category Tabs (Interactive Segmented Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((item) => {
          const isActive = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id as CourseCategory)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{getCategoryLabel(item.id, item.label)}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? 'bg-slate-800 dark:bg-indigo-700 text-indigo-200 dark:text-indigo-100'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-filters: Language selection & Difficulty level */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-800">
        {/* Language Quick Pills */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            {language === 'ru' ? 'По языку:' : language === 'en' ? 'By language:' : 'Til boʻyicha:'}
          </span>
          <button
            onClick={() => onSelectLanguageFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              languageFilter === 'all'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t('common.all')}
          </button>
          <button
            onClick={() => onSelectLanguageFilter('english')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'english'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇬🇧</span> {language === 'ru' ? 'Английский' : language === 'en' ? 'English' : 'Ingliz tili'}
          </button>
          <button
            onClick={() => onSelectLanguageFilter('russian')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'russian'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇷🇺</span> {language === 'ru' ? 'Русский' : language === 'en' ? 'Russian' : 'Rus tili'}
          </button>
          <button
            onClick={() => onSelectLanguageFilter('french')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'french'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇫🇷</span> {language === 'ru' ? 'Французский' : language === 'en' ? 'French' : 'Fransuz tili'}
          </button>
          <button
            onClick={() => onSelectLanguageFilter('german')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'german'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇩🇪</span> {language === 'ru' ? 'Немецкий' : language === 'en' ? 'German' : 'Nemis tili'}
          </button>
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            {language === 'ru' ? 'Уровень:' : language === 'en' ? 'Level:' : 'Daraja:'}
          </span>
          {['all', 'Boshlangʻich', 'Oʻrta', 'Yuqori'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => onSelectLevel(lvl)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-slate-800 dark:bg-slate-700 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {getLevelLabel(lvl)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
