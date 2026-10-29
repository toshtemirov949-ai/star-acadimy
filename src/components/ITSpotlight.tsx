import React from 'react';
import { Code, Terminal, ArrowRight, Cpu, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ITSpotlightProps {
  onOpenITPlayground: () => void;
  onFilterIT: () => void;
}

export const ITSpotlight: React.FC<ITSpotlightProps> = ({
  onOpenITPlayground,
  onFilterIT,
}) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-5 sm:py-6 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Code className="w-3.5 h-3.5" />
              <span>{t('itHub.badge', 'IT & Dasturlash Akademiyasi')}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
              {t('itHub.title', 'Kelajak IT Mutaxassisligi')}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t('itHub.subtitle', 'Frontend, Backend, Python, Kiberxavfsizlik va Mobil ilovalar yaratishni real loyihalar orqali oʻrganing')}
            </p>

            <div className="grid grid-cols-2 gap-1.5 pt-0.5 text-xs">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-slate-200 font-medium text-[11px]">React & TypeScript</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-medium text-[11px]">Python & AI Lab</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-200 font-medium text-[11px]">Node.js & Backend</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-200 font-medium text-[11px]">
                  {language === 'ru' ? 'Кибербезопасность' : language === 'en' ? 'Cybersecurity' : 'Kiberxavfsizlik'}
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={onOpenITPlayground}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{t('itHub.sandboxBtn', 'IT Kodlash Maydoni')}</span>
              </button>

              <button
                onClick={onFilterIT}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                {t('itHub.exploreBtn', 'Barcha IT Kurslar')} →
              </button>
            </div>
          </div>

          {/* Right Visual / Code Terminal Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
              {/* Terminal Title Bar */}
              <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                  <span className="ml-1.5 font-mono text-[10px] text-slate-400">ziyotalim_sandbox.ts</span>
                </div>
                <span className="text-emerald-400 font-mono text-[10px]">Node.js v22.14</span>
              </div>

              {/* Code snippet display */}
              <div className="p-3 font-mono text-[10.5px] text-slate-300 space-y-0.5 overflow-x-auto">
                <p className="text-slate-500">
                  {language === 'ru' ? '// Анализ данных и искусственный интеллект' : language === 'en' ? '// Artificial Intelligence & Data Analytics' : '// Sunʼiy intellekt va maʼlumotlar tahlili'}
                </p>
                <p><span className="text-indigo-400">import</span> &#123; AIModel, DataPipeline &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@ziyotalim/ai'</span>;</p>
                <p><span className="text-indigo-400">const</span> studentCourse = <span className="text-indigo-400">new</span> <span className="text-yellow-400">CoursePath</span>(&#123;</p>
                <p className="pl-3">name: <span className="text-emerald-400">"Fullstack & AI Engineering"</span>,</p>
                <p className="pl-3">skills: [<span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"IELTS"</span>],</p>
                <p className="pl-3">mentorSupport: <span className="text-amber-400">true</span></p>
                <p>&#125;);</p>
                <p className="text-emerald-400 pt-0.5">
                  {language === 'ru' ? '✔ Успешно скомпилировано. Готовы учиться?' : language === 'en' ? '✔ Successfully compiled. Ready to learn?' : '✔ Muvaffaqiyatli kompilyatsiya qilindi. Oʻrganishga tayyormisiz?'}
                </p>
              </div>

              <div className="px-3.5 py-2 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[10px]">
                  {language === 'ru' ? 'Статус: 0 ошибок · 100% практика' : language === 'en' ? 'Status: 0 errors · 100% practical' : 'Status: 0 xato · 100% amaliyot'}
                </span>
                <button
                  onClick={onOpenITPlayground}
                  className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <span>{language === 'ru' ? 'Тестировать код' : language === 'en' ? 'Run Code' : 'Kodni sinash'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
