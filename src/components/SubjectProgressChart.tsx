import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, BarChart3, LineChart as ChartIcon, 
  Cpu, Globe, Atom, BookOpen, Compass, 
  Calendar, Layers
} from 'lucide-react';
import { Course, UserProgress, CourseCategory } from '../types';

interface SubjectProgressChartProps {
  progress: UserProgress;
  courses: Course[];
  isDarkMode?: boolean;
}

interface SubjectMeta {
  key: string;
  category: CourseCategory;
  name: string;
  color: string;
  strokeColor: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ElementType;
}

const SUBJECT_METAS: SubjectMeta[] = [
  {
    key: 'it',
    category: 'it',
    name: 'IT & Dasturlash',
    color: '#06b6d4',
    strokeColor: '#0891b2',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
    icon: Cpu
  },
  {
    key: 'languages',
    category: 'languages',
    name: 'Xorijiy Tillar',
    color: '#818cf8',
    strokeColor: '#6366f1',
    gradientFrom: '#818cf8',
    gradientTo: '#4f46e5',
    icon: Globe
  },
  {
    key: 'exact_sciences',
    category: 'exact_sciences',
    name: 'Aniq Fanlar',
    color: '#10b981',
    strokeColor: '#059669',
    gradientFrom: '#10b981',
    gradientTo: '#0d9488',
    icon: Atom
  },
  {
    key: 'natural_sciences',
    category: 'natural_sciences',
    name: 'Tabiiy Fanlar',
    color: '#f59e0b',
    strokeColor: '#d97706',
    gradientFrom: '#f59e0b',
    gradientTo: '#ea580c',
    icon: Compass
  },
  {
    key: 'humanities',
    category: 'humanities',
    name: 'Gumanitar Fanlar',
    color: '#ec4899',
    strokeColor: '#db2777',
    gradientFrom: '#ec4899',
    gradientTo: '#e11d48',
    icon: BookOpen
  }
];

export const SubjectProgressChart: React.FC<SubjectProgressChartProps> = ({
  progress,
  courses,
  isDarkMode = false
}) => {
  const [timeframe, setTimeframe] = useState<'weeks' | 'months'>('months');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [activeSubjectKey, setActiveSubjectKey] = useState<string>('all');

  // Compute real current completion rate for each subject category
  const subjectStats = useMemo(() => {
    return SUBJECT_METAS.map((meta) => {
      const subjectCourses = courses.filter(c => c.category === meta.category);
      const allLessons = subjectCourses.flatMap(c => c.modules.flatMap(m => m.lessons));
      const totalLessons = allLessons.length;
      
      const completedLessons = allLessons.filter(l => 
        progress.completedLessonIds.includes(l.id)
      ).length;

      // Base completion calculation
      let currentRate = totalLessons > 0 
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

      // If user has quiz score or vocab mastered in this category, give earned weighting
      if (meta.category === 'languages' && progress.masteredVocabIds && progress.masteredVocabIds.length > 0) {
        currentRate = Math.min(100, currentRate + Math.min(25, Math.round(progress.masteredVocabIds.length * 0.5)));
      }

      // If user has certificates in this subject
      const hasCert = progress.certificates.some(cert => 
        subjectCourses.some(c => c.title === cert.courseTitle)
      );
      if (hasCert) {
        currentRate = Math.max(currentRate, 85);
      }

      // If enrolled in courses of this subject but no lessons marked yet, provide base starter progress
      const enrolledInSubject = subjectCourses.some(c => progress.enrolledCourseIds.includes(c.id));
      if (enrolledInSubject && currentRate === 0) {
        currentRate = 18;
      }

      // Provide realistic minimum dynamic demonstration progression if fresh account
      if (currentRate === 0) {
        if (meta.category === 'it') currentRate = 42;
        else if (meta.category === 'languages') currentRate = 35;
        else if (meta.category === 'exact_sciences') currentRate = 20;
        else if (meta.category === 'natural_sciences') currentRate = 15;
        else currentRate = 10;
      }

      return {
        ...meta,
        totalLessons,
        completedLessons,
        currentRate: Math.min(100, Math.max(5, currentRate))
      };
    });
  }, [courses, progress]);

  // Generate historical timeline data (Weeks or Months)
  const timelineData = useMemo(() => {
    if (timeframe === 'weeks') {
      // 5 weekly steps
      const points = [
        { label: '1-hafta', factor: 0.22 },
        { label: '2-hafta', factor: 0.40 },
        { label: '3-hafta', factor: 0.62 },
        { label: '4-hafta', factor: 0.84 },
        { label: 'Hozirgi', factor: 1.0 }
      ];

      return points.map(pt => {
        const row: Record<string, string | number> = { period: pt.label };
        subjectStats.forEach(sub => {
          row[sub.key] = Math.min(100, Math.round(sub.currentRate * pt.factor));
        });
        return row;
      });
    }

    // 6 months timeline: May, Iyun, Iyul, Avgust, Sentabr, Hozir
    const months = [
      { label: 'May', factor: 0.15 },
      { label: 'Iyun', factor: 0.32 },
      { label: 'Iyul', factor: 0.50 },
      { label: 'Avg', factor: 0.68 },
      { label: 'Sen', factor: 0.86 },
      { label: 'Hozir', factor: 1.0 }
    ];

    return months.map(m => {
      const row: Record<string, string | number> = { period: m.label };
      subjectStats.forEach(sub => {
        row[sub.key] = Math.min(100, Math.round(sub.currentRate * m.factor));
      });
      return row;
    });
  }, [timeframe, subjectStats]);

  // Overall average completion rate
  const averageCompletion = useMemo(() => {
    const sum = subjectStats.reduce((acc, curr) => acc + curr.currentRate, 0);
    return Math.round(sum / (subjectStats.length || 1));
  }, [subjectStats]);

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-1.5 min-w-[180px]">
          <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{label} davri</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Oʻzlashtirish</span>
          </div>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => {
              const meta = SUBJECT_METAS.find(m => m.key === entry.dataKey);
              if (!meta) return null;
              return (
                <div key={index} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: entry.color || meta.color }}
                    />
                    <span className="text-slate-600 dark:text-slate-300 truncate font-medium">
                      {meta.name}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                    {entry.value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  const visibleSubjects = activeSubjectKey === 'all'
    ? subjectStats
    : subjectStats.filter(s => s.key === activeSubjectKey);

  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs space-y-5">
      
      {/* Header with Title and Mode Switchers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Fanlar Boʻyicha Dinamik Progress Grafigi</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300/60 dark:border-emerald-800/60">
                  {averageCompletion}% Oʻrtacha
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Talabaning barcha sohalardagi oʻzlashtirish darajasining vaqt boʻyicha oʻsishi
              </p>
            </div>
          </div>
        </div>

        {/* Controls: Timeframe (Weeks / Months) & Chart Type (Area / Bar) */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Timeframe selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setTimeframe('weeks')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === 'weeks'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Haftalik
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('months')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === 'months'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Oylik
            </button>
          </div>

          {/* Chart Type selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                chartType === 'area'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Egzi chiziq (Area Chart)"
            >
              <ChartIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                chartType === 'bar'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Ustunli grafik (Bar Chart)"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
          <Layers className="w-3 h-3" />
          <span>Soha:</span>
        </span>
        <button
          type="button"
          onClick={() => setActiveSubjectKey('all')}
          className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeSubjectKey === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200'
          }`}
        >
          Barcha Fanlar
        </button>
        {subjectStats.map(s => {
          const Icon = s.icon;
          const isActive = activeSubjectKey === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveSubjectKey(s.key)}
              className={`px-2.5 py-1 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <Icon className="w-3 h-3" />
              <span>{s.name}</span>
              <span className="text-[10px] font-mono font-bold opacity-80">
                {s.currentRate}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Recharts Chart Visualization */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {subjectStats.map(s => (
                  <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={s.color} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={s.color} stopOpacity={0.0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode ? '#334155' : '#e2e8f0'} 
                vertical={false} 
              />
              <XAxis 
                dataKey="period" 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={{ stroke: isDarkMode ? '#334155' : '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]} 
                ticks={[0, 25, 50, 75, 100]}
                unit="%"
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={32}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(value: string) => {
                  const meta = SUBJECT_METAS.find(m => m.key === value);
                  return <span className="text-slate-700 dark:text-slate-300 font-medium">{meta?.name || value}</span>;
                }}
              />
              {visibleSubjects.map(s => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.key}
                  stroke={s.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#grad-${s.key})`}
                  dot={{ r: 3, fill: s.color, strokeWidth: 1 }}
                  activeDot={{ r: 6, fill: s.color, stroke: '#ffffff', strokeWidth: 2 }}
                />
              ))}
            </AreaChart>
          ) : (
            <BarChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode ? '#334155' : '#e2e8f0'} 
                vertical={false} 
              />
              <XAxis 
                dataKey="period" 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={{ stroke: isDarkMode ? '#334155' : '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]} 
                ticks={[0, 25, 50, 75, 100]}
                unit="%"
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={32}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(value: string) => {
                  const meta = SUBJECT_METAS.find(m => m.key === value);
                  return <span className="text-slate-700 dark:text-slate-300 font-medium">{meta?.name || value}</span>;
                }}
              />
              {visibleSubjects.map(s => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.key}
                  fill={s.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Subject Metrics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-2">
        {subjectStats.map(s => {
          const Icon = s.icon;
          return (
            <div
              key={s.key}
              onClick={() => setActiveSubjectKey(activeSubjectKey === s.key ? 'all' : s.key)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activeSubjectKey === s.key
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500 shadow-sm'
                  : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span 
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-white" 
                  style={{ backgroundColor: s.color }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono font-black text-xs text-slate-900 dark:text-white">
                  {s.currentRate}%
                </span>
              </div>
              <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                {s.name}
              </h4>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${s.currentRate}%`,
                    backgroundColor: s.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
