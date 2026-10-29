import { Course } from '../types';
import { SupportedLanguage } from '../context/LanguageContext';

export interface LocalizedCourseData {
  title: string;
  shortDescription: string;
  description: string;
  level: string;
  badge?: string;
  highlights?: string[];
  kicker: string;
}

export const COURSE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedCourseData>> = {
  'lang-en-ielts': {
    uz: {
      title: 'IELTS Masterclass 7.5+ va Akademik Ingliz Tili',
      shortDescription: 'IELTS Listening, Reading, Writing Task 1-2 va Speaking boʻyicha xalqaro standartdagi toʻliq 25 darslik master-kurs.',
      description: 'Ushbu kurs sizni IELTS imtihonida kamida 7.5+ ball olishingiz uchun barcha 4 ta modul (Tinglab tushunish, Oʻqish, Yozish va Soʻzlashuv) boʻyicha eng samarali strategiyalar, haqiqiy imtihon savollari va leksik resurslar bilan taʼminlaydi.',
      level: 'Ilgʻor',
      badge: 'Xaridorgir',
      kicker: 'Xorijiy Tillar / Ingliz Tili',
      highlights: [
        '25 ta toʻliq video va amaliy darslik',
        'Speaking boʻyicha jonli interaktiv audio mashqlar',
        'Writing Task 1 va Task 2 insho andozalari',
        'Rasmiy tasdiqlangan kurs sertifikati'
      ]
    },
    ru: {
      title: 'Мастер-класс IELTS 7.5+ и Академический Английский',
      shortDescription: 'Полный курс из 25 уроков по международным стандартам IELTS: Listening, Reading, Writing и Speaking.',
      description: 'Курс нацелен на достижение балла 7.5+ на экзамене IELTS по всем 4 модулям с реальными материалами тестов, академическим словарным запасом и интерактивной практикой устной речи.',
      level: 'Продвинутый',
      badge: 'Популярный',
      kicker: 'Иностранные Языки / Английский',
      highlights: [
        '25 полных видео и практических уроков',
        'Интерактивная тренировка секции Speaking',
        'Шаблоны сочинений Writing Task 1 и Task 2',
        'Официальный именной сертификат с QR-кодом'
      ]
    },
    en: {
      title: 'IELTS Masterclass 7.5+ & Academic English',
      shortDescription: 'Comprehensive 25-lesson curriculum covering IELTS Listening, Reading, Writing Task 1-2, and Speaking.',
      description: 'This masterclass equips you with proven strategies, authentic test questions, and rich academic vocabulary to achieve band 7.5+ on the IELTS academic examination.',
      level: 'Advanced',
      badge: 'Bestseller',
      kicker: 'Foreign Languages / English',
      highlights: [
        '25 full video and interactive modules',
        'Interactive audio practice for Speaking',
        'Proven templates for Writing Task 1 and Task 2',
        'Official verified certificate with QR code'
      ]
    }
  },

  'it-py-ai': {
    uz: {
      title: 'Python Dasturlash Asoslari va Sunʼiy Intellekt',
      shortDescription: 'Sintaksisdan tortib algoritmlar, maʼlumotlar tahlili va neyrotarmoqlar yaratishgacha boʻlgan 25 ta amaliy dars.',
      description: 'Zamonaviy IT olamining eng mashhur dasturlash tili boʻlgan Pythonni noldan boshlab oʻrganing. Amaliy masalalar, fayllar bilan ishlash, kutubxonalar (NumPy, Pandas) va sunʼiy intellekt modellarini oʻz ichiga oladi.',
      level: 'Boshlangʻich',
      badge: 'Top Kurs',
      kicker: 'IT & Dasturlash Akademiyasi',
      highlights: [
        'Interaktiv brauzer ichidagi Python sandbox',
        'Algoritmlar va maʼlumotlar tuzilmasi',
        'Sunʼiy intellekt (AI) va Pandas amaliyoti',
        'Bitiruv amaliy loyihasi'
      ]
    },
    ru: {
      title: 'Основы Python и Искусственный Интеллект',
      shortDescription: '25 практических уроков: от базового синтаксиса до алгоритмов, анализа данных и простых нейросетей.',
      description: 'Изучите самый востребованный язык программирования Python с нуля. Курс включает работу с библиотеками (NumPy, Pandas), решение практических задач и запуск простых моделей машинного обучения.',
      level: 'Начальный',
      badge: 'Топ Курс',
      kicker: 'IT и Программирование',
      highlights: [
        'Интерактивная песочница Python в браузере',
        'Алгоритмы и структуры данных',
        'Практика анализа данных и AI',
        'Итоговый выпускной проект в портфолио'
      ]
    },
    en: {
      title: 'Python Programming Fundamentals & AI',
      shortDescription: '25 hands-on lessons covering syntax, data structures, algorithms, data analytics, and neural networks.',
      description: 'Master the world’s most versatile programming language from absolute basics to working with NumPy, Pandas, and foundational artificial intelligence models.',
      level: 'Beginner',
      badge: 'Top Rated',
      kicker: 'IT & Coding Academy',
      highlights: [
        'In-browser interactive Python sandbox',
        'Algorithms and data structures',
        'Data analysis with Pandas & NumPy',
        'Hands-on capstone portfolio project'
      ]
    }
  },

  'it-fe-react': {
    uz: {
      title: 'Zamonaviy Web Dasturlash (HTML, CSS, JavaScript, React)',
      shortDescription: 'Veb-saytlar dizayni, moslashuvchan maketlar (Flexbox, Grid) va React kutubxonasida SPA ilovalar yaratish.',
      description: 'Frontend dasturchi kasbini egallang: toza semantik HTML5, zamonaviy CSS3 animatsiyalar, JavaScript ES6+ funksiyalari va React komponentlar arxitekturasi.',
      level: 'Oʻrta',
      badge: 'Amaliy',
      kicker: 'IT & Dasturlash Akademiyasi',
      highlights: [
        'HTML5 & Modern CSS3 Grid/Flexbox',
        'JavaScript ES6+ interaktiv dasturlash',
        'React Hooks va komponentlar',
        'Jonli Web Sandbox muharriri'
      ]
    },
    ru: {
      title: 'Современная Веб-Разработка (HTML, CSS, JS, React)',
      shortDescription: 'Создание адаптивных сайтов (Flexbox, Grid), современный JavaScript ES6+ и разработка приложений на React.',
      description: 'Освойте профессию Frontend разработчика: семантическая верстка, анимации, работа с API, современный JavaScript и компонентная архитектура React.',
      level: 'Средний',
      badge: 'Практический',
      kicker: 'IT и Программирование',
      highlights: [
        'HTML5 и CSS3 Grid/Flexbox верстка',
        'JavaScript ES6+ и работа с DOM/API',
        'Компоненты и хуки React',
        'Интерактивная веб-песочница'
      ]
    },
    en: {
      title: 'Modern Web Development (HTML, CSS, JS, React)',
      shortDescription: 'Responsive layouts (Flexbox, Grid), modern JavaScript ES6+, and building dynamic React applications.',
      description: 'Become a job-ready Frontend engineer: write semantic HTML5, design fluid responsive layouts with CSS3, master modern JavaScript, and build interactive SPAs in React.',
      level: 'Intermediate',
      badge: 'Hands-on',
      kicker: 'IT & Coding Academy',
      highlights: [
        'HTML5 & modern CSS3 Flexbox/Grid',
        'JavaScript ES6+ and DOM manipulation',
        'React components and state management',
        'Live in-browser Web Sandbox'
      ]
    }
  },

  'lang-ru-speaking': {
    uz: {
      title: 'Rus Tili: Boshlangʻichdan Erkin Soʻzlashuvgacha',
      shortDescription: 'Kundalik muloqot, toʻgʻri urgʻu, 6 ta kelishik va amaliy dialoglarni oʻz ichiga olgan tizimli 25 ta dars.',
      description: 'Rus tilida ravon gapirishni istaysizmi? Ushbu darslik sizga talaffuz, eng koʻp ishlatiladigan 3000 ta soʻz va murakkab grammatik qoidalarni tushunarli usulda oʻrgatadi.',
      level: 'Boshlangʻich',
      badge: 'Talabgir',
      kicker: 'Xorijiy Tillar / Rus Tili',
      highlights: [
        '6 ta rus tili kelishigi (падежи)',
        'Audio talaffuz va dialoglar',
        'Kundalik soʻzlashuv leksikasi',
        'TRKI darajadagi test savollari'
      ]
    },
    ru: {
      title: 'Русский Язык: От Базового до Свободного Общения',
      shortDescription: '25 системных уроков: постановка произношения, 6 падежей, практические диалоги и словарный запас.',
      description: 'Освойте правильную русскую речь, грамматическую структуру предложений, согласование падежей и активный лексикон для повседневного и делового общения.',
      level: 'Начальный',
      badge: 'Востребованный',
      kicker: 'Иностранные Языки / Русский',
      highlights: [
        'Все 6 падежей с понятными примерами',
        'Аудио произношение и живые диалоги',
        'Лексика повседневного общения',
        'Тестовые задания формата ТРКИ'
      ]
    },
    en: {
      title: 'Russian Language: Beginner to Fluent Speaking',
      shortDescription: '25 structured lessons focusing on natural pronunciation, the 6 cases, real dialogues, and core vocabulary.',
      description: 'Build confident fluency in Russian with step-by-step guidance on phonetics, essential grammar, verb conjugations, and everyday conversation.',
      level: 'Beginner',
      badge: 'Popular',
      kicker: 'Foreign Languages / Russian',
      highlights: [
        'Mastering the 6 Russian noun cases',
        'Audio pronunciation and interactive dialogues',
        'Core vocabulary for daily life',
        'Practice questions modeled after TRKI'
      ]
    }
  },

  'lang-fr-delf': {
    uz: {
      title: 'Fransuz Tili: DELF A1-B2 va Soʻzlashuv Madaniyati',
      shortDescription: 'Parij lahjasi, fransuzcha nozik fonetika, grammatika va DELF xalqaro imtihoniga tayyorgarlik kursi.',
      description: 'Fransuz tilining nafisligi va qoidalarini professional ustoz bilan oʻrganing. R tovushining toʻgʻri artikulyatsiyasi, kundalik iboralar va sayohat leksikasi.',
      level: 'Oʻrta',
      badge: 'Yevropa Tili',
      kicker: 'Xorijiy Tillar / Fransuz Tili',
      highlights: [
        'DELF A1-B2 imtihoniga tayyorgarlik',
        'Fransuz fonetikasi va talaffuz sirlari',
        'Fransiyada sayohat va madaniyat',
        'Interaktiv audio mashqlar'
      ]
    },
    ru: {
      title: 'Французский Язык: DELF A1-B2 и Культура Общения',
      shortDescription: 'Французская фонетика, грамматика, разговорные конструкции и подготовка к международному экзамену DELF.',
      description: 'Погрузитесь в изучение французского языка: правильная артикуляция звуков, глагольные времена, культура и полезный словарный запас для путешествий и учебы во Франции.',
      level: 'Средний',
      badge: 'Европейский',
      kicker: 'Иностранные Языки / Французский',
      highlights: [
        'Подготовка к сертификации DELF A1-B2',
        'Французская фонетика и произношение',
        'Лексика для путешествий по Франции',
        'Интерактивные аудио упражнения'
      ]
    },
    en: {
      title: 'French Language: DELF A1-B2 & Conversational Fluency',
      shortDescription: 'Authentic French phonetics, essential grammar, and thorough preparation for DELF international certificates.',
      description: 'Explore the elegance of the French language with detailed guidance on pronunciation, nasal vowels, practical dialogues, and European CEFR standards.',
      level: 'Intermediate',
      badge: 'European',
      kicker: 'Foreign Languages / French',
      highlights: [
        'DELF A1-B2 curriculum alignment',
        'French phonetics and clear articulation',
        'Travel, culture, and daily phrases',
        'Interactive audio exercises'
      ]
    }
  },

  'lang-de-goethe': {
    uz: {
      title: 'Nemis Tili: Goethe A1-B2 va Germaniyada Taʼlim',
      shortDescription: 'Nemis grammatikasi (Artikel, Akkusativ, Dativ), Satzbau va Germaniyada bepul oʻqish (DAAD/Ausbildung) kursi.',
      description: 'Germaniya, Avstriya va Shveytsariyada taʼlim olish yoki ishlashni rejalashtirganlar uchun maxsus Goethe instituti talablariga moslashtirilgan dastur.',
      level: 'Oʻrta',
      badge: 'DAAD Grantlari',
      kicker: 'Xorijiy Tillar / Nemis Tili',
      highlights: [
        'Goethe-Zertifikat A1-B2 talablari',
        'Nemis tili gap tuzilishi (Satzbau)',
        'Ausbildung va DAAD konsultatsiyasi',
        'Audio darslar va lugʻat trenajori'
      ]
    },
    ru: {
      title: 'Немецкий Язык: Goethe A1-B2 и Образование в Германии',
      shortDescription: 'Немецкая грамматика (артикли, падежи, порядок слов) и подготовка к учебе в Германии (DAAD / Ausbildung).',
      description: 'Курс немецкого языка, ориентированный на стандарты институтов Гёте и TestDaF. Изучите синтаксис, правильное склонение и подготовьтесь к бесплатной учебе в Германии.',
      level: 'Средний',
      badge: 'Гранты DAAD',
      kicker: 'Иностранные Языки / Немецкий',
      highlights: [
        'Стандарты Goethe-Zertifikat A1-B2',
        'Порядок слов и грамматика (Satzbau)',
        'Ориентация на программы Ausbildung и DAAD',
        'Аудио тренажёр и лексическая база'
      ]
    },
    en: {
      title: 'German Language: Goethe A1-B2 & Study in Germany',
      shortDescription: 'German grammar, articles, sentence structure (Satzbau), and preparation for free education in Germany (DAAD / Ausbildung).',
      description: 'Structured to meet Goethe Institute and TestDaF benchmarks, this course guides learners through cases, word order, and academic German.',
      level: 'Intermediate',
      badge: 'DAAD Grants',
      kicker: 'Foreign Languages / German',
      highlights: [
        'Goethe-Zertifikat A1-B2 alignment',
        'German syntax and word order rules',
        'Guidance for Ausbildung and DAAD applicants',
        'Interactive audio practice and vocabulary'
      ]
    }
  },

  'sci-math-algebra': {
    uz: {
      title: 'Oliy Matematika, Algebra va Geometriya',
      shortDescription: 'Funksiyalar, tenglamalar tizimi, hosila, integral va fazoviy geometriya teoremalarining 25 ta mukammal darsi.',
      description: 'Matematikani chuqur va mantiqiy tushunishni xohlovchi oʻquvchilar va abituriyentlar uchun. Formula va teoremalarning isboti hamda amaliy misollar bilan.',
      level: 'Oʻrta',
      badge: 'Fundamental',
      kicker: 'Aniq Fanlar',
      highlights: [
        'Algebraik tenglama va tengsizliklar',
        'Matematik analiz: hosila va integrallar',
        'Planimetriya va stereometriya',
        'Formulalar pasporti va interaktiv testlar'
      ]
    },
    ru: {
      title: 'Высшая Математика, Алгебра и Геометрия',
      shortDescription: 'Функции, системы уравнений, производные, интегралы и теоремы стереометрии в 25 подробных уроках.',
      description: 'Курс для глубокого и логического освоения математических дисциплин. Доказательства теорем, пошаговый разбор задач и подготовка к экзаменам.',
      level: 'Средний',
      badge: 'Фундаментальный',
      kicker: 'Точные Науки',
      highlights: [
        'Алгебраические уравнения и неравенства',
        'Математический анализ: производные и интегралы',
        'Планиметрия и пространственная геометрия',
        'Паспорт формул и тесты знаний'
      ]
    },
    en: {
      title: 'Higher Mathematics, Algebra & Geometry',
      shortDescription: 'Functions, systems of equations, derivatives, integrals, and spatial geometry theorems across 25 lessons.',
      description: 'Build rigorous mathematical reasoning and problem-solving skills with clear step-by-step theorem proofs, formulas, and real-world applications.',
      level: 'Intermediate',
      badge: 'Fundamental',
      kicker: 'Exact Sciences',
      highlights: [
        'Equations, inequalities, and functions',
        'Calculus: derivatives and integrals',
        'Planimetry and 3D spatial geometry',
        'Formula dossier and interactive quizzes'
      ]
    }
  },

  'sci-phys-quantum': {
    uz: {
      title: 'Zamonaviy Fizika va Astronomiya Asoslari',
      shortDescription: 'Klassik mexanika, termodinamika, elektromagnetizm, optika va kvant fizikasi qonuniyatlari.',
      description: 'Koinot va tabiat hodisalarining fizik qonunlarini interaktiv simulyatorlar va formulalar yordamida kashf eting.',
      level: 'Oʻrta',
      badge: 'Interaktiv',
      kicker: 'Aniq Fanlar',
      highlights: [
        'Nyuton mexanikasi va dinamika',
        'Elektromagnetizm va optika qonunlari',
        'Kvant fizikasi va astrofizika asoslari',
        '3D virtual tajribalar'
      ]
    },
    ru: {
      title: 'Современная Физика и Основы Астрономии',
      shortDescription: 'Классическая механика, термодинамика, электромагнетизм, оптика и квантовая физика в 25 уроках.',
      description: 'Изучайте фундаментальные физические законы мироздания с помощью наглядных симуляций, интерактивных формул и лабораторных экспериментов.',
      level: 'Средний',
      badge: 'Интерактивный',
      kicker: 'Точные Науки',
      highlights: [
        'Механика Ньютона и кинематика',
        'Электромагнетизм и волновая оптика',
        'Основы квантовой механики и астрономия',
        '3D виртуальные эксперименты'
      ]
    },
    en: {
      title: 'Modern Physics & Fundamentals of Astronomy',
      shortDescription: 'Classical mechanics, thermodynamics, electromagnetism, optics, and quantum physics across 25 lessons.',
      description: 'Discover how the universe works through interactive simulations, proven formulas, and experiments spanning mechanics to quantum phenomena.',
      level: 'Intermediate',
      badge: 'Interactive',
      kicker: 'Exact Sciences',
      highlights: [
        'Newtonian mechanics and dynamics',
        'Electromagnetism and wave optics',
        'Fundamentals of quantum physics and cosmos',
        '3D interactive virtual laboratory'
      ]
    }
  }
};

/**
 * Returns localized course data or falls back to original course fields
 */
export function getLocalizedCourse(course: Course, language: SupportedLanguage): Course {
  const loc = COURSE_TRANSLATIONS[course.id]?.[language];
  if (!loc) {
    return course;
  }
  return {
    ...course,
    title: loc.title,
    shortDescription: loc.shortDescription,
    description: loc.description,
    level: loc.level,
    badge: loc.badge || course.badge,
    highlights: loc.highlights || course.highlights,
  };
}
