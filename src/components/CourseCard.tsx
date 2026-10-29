import React from 'react';
import { Star, Clock, Bookmark, CheckCircle2, Play } from 'lucide-react';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedCourse } from '../data/localizedCourses';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  isBookmarked: boolean;
  onSelect: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onToggleBookmark: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course: rawCourse,
  isEnrolled,
  isBookmarked,
  onSelect,
  onStartLesson,
  onToggleBookmark,
}) => {
  const { language, t } = useLanguage();
  const course = getLocalizedCourse(rawCourse, language);

  // Format category kicker label cleanly
  const getCategoryKicker = () => {
    if (course.category === 'languages') {
      if (language === 'ru') {
        const langNames: Record<string, string> = {
          english: 'Английский',
          russian: 'Русский',
          french: 'Французский',
          german: 'Немецкий',
        };
        return course.language ? `Иностранные Языки / ${langNames[course.language] || 'Язык'}` : 'Иностранные Языки';
      }
      if (language === 'en') {
        const langNames: Record<string, string> = {
          english: 'English',
          russian: 'Russian',
          french: 'French',
          german: 'German',
        };
        return course.language ? `Languages / ${langNames[course.language] || 'Language'}` : 'Foreign Languages';
      }
      const langNames: Record<string, string> = {
        english: 'Ingliz Tili',
        russian: 'Rus Tili',
        french: 'Fransuz Tili',
        german: 'Nemis Tili',
      };
      return course.language ? `Xorijiy Til / ${langNames[course.language] || 'Til'}` : 'Xorijiy Tillar';
    }
    if (course.category === 'it') {
      return language === 'ru' ? 'IT и Программирование' : language === 'en' ? 'IT & Coding Academy' : 'IT & Dasturlash Akademiyasi';
    }
    if (course.category === 'exact_sciences') {
      return language === 'ru' ? 'Точные Науки' : language === 'en' ? 'Exact Sciences' : 'Aniq Fanlar';
    }
    if (course.category === 'natural_sciences') {
      return language === 'ru' ? 'Естественные Науки' : language === 'en' ? 'Natural Sciences' : 'Tabiiy Fanlar';
    }
    return language === 'ru' ? 'Гуманитарные Науки' : language === 'en' ? 'Humanities' : 'Ijtimoiy-Gumanitar Fanlar';
  };

  const cardImage = course.image || course.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
  const instructorAvatar = course.instructor?.avatar || course.instructor?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const instructorName = course.instructor?.name || 'ZiyoTalim Oʻqituvchisi';
  const durationText = course.durationHours 
    ? `${course.durationHours} ${t('course.hoursUnit', 'soat')}` 
    : `36 ${t('course.hoursUnit', 'soat')}`;

  const lessonsText = `${course.lessonsCount} ${t('course.lessonsUnit', 'ta dars')}`;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col overflow-hidden relative">
      {/* Visual Thumbnail */}
      <div 
        onClick={() => onSelect(course)}
        className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
      >
        <img
          src={cardImage}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
        
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(course.id);
          }}
          aria-label="Kursni saqlash"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors shadow-2xs cursor-pointer border border-transparent dark:border-slate-700"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400' : ''}`} />
        </button>

        {/* Category kicker on bottom left of image */}
        <div className="absolute bottom-2 left-2.5 text-[11px] text-white font-medium drop-shadow-sm flex items-center gap-1">
          <span>{getCategoryKicker()}</span>
        </div>

        {/* 25 Lessons Badge */}
        <div className="absolute top-2.5 left-2.5 bg-indigo-600/90 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs shadow-xs">
          {lessonsText}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 mb-1">
            <span>{course.level}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />
              <span>{durationText}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{lessonsText}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(course)}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-1"
          >
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-2">
            {course.shortDescription}
          </p>
        </div>

        <div>
          {/* Instructor & Rating */}
          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <img
                src={instructorAvatar}
                alt={instructorName}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              />
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate text-[10px]">{instructorName}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 font-medium text-slate-700 dark:text-slate-300">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="tabular-nums font-semibold text-[11px]">{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 dark:text-slate-500 text-[9px]">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Single-line Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onStartLesson(course)}
              className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              {isEnrolled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'Продолжить' : language === 'en' ? 'Continue' : 'Davom Ettirish'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  <span>{t('course.start', 'Darsni Boshlash')}</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelect(course)}
              className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer active:scale-95"
            >
              {t('course.details', 'Batafsil')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
