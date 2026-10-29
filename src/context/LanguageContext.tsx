import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'uz' | 'ru' | 'en';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'uz', name: 'Oʻzbekcha', nativeName: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
];

export interface TranslationsType {
  // Hero section
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchClear: string;
  searchSubmit: string;
  heroStartIT: string;
  heroExploreLanguages: string;
  heroAskAI: string;
  heroQuickJump: string;
  heroQuickIT: string;
  heroQuickLanguages: string;
  heroQuickAI: string;
  statStudents: string;
  statCertificates: string;
  statCourses: string;
  statLanguages: string;
  statSatisfaction: string;
  statFreeAccess: string;
  statGrowthWeek: string;
  
  // Hero Right Card
  heroCardTitle: string;
  heroCardSubtitle: string;
  heroCardIT: string;
  heroCardITDesc: string;
  heroCardLang: string;
  heroCardLangDesc: string;
  heroCardAI: string;
  heroCardAIDesc: string;
  heroCardCert: string;
  heroCardFree: string;

  // Navbar
  'nav.rating': string;
  'nav.adminCabinet': string;
  'nav.login': string;
  'nav.changeLang': string;
  'nav.lightMode': string;
  'nav.darkMode': string;

  // Mode Switcher
  'mode.switchClassic': string;
  'mode.switchTechzone': string;
  'mode.academyTitle': string;
  'mode.changeInterface': string;
  'mode.selectLang': string;

  // Language Hub
  'langHub.badge': string;
  'langHub.audioBadge': string;
  'langHub.title': string;
  'langHub.subtitle': string;
  'langHub.translatorBtn': string;
  'langHub.labBtn': string;
  'langHub.practiceBtn': string;
  'langHub.coursesBtn': string;
  'langHub.students': string;
  'langHub.listenSample': string;
  'langHub.stopAudio': string;
  'langHub.mainModules': string;
  'langHub.speed': string;

  // IT Spotlight
  'itHub.badge': string;
  'itHub.title': string;
  'itHub.subtitle': string;
  'itHub.sandboxBtn': string;
  'itHub.exploreBtn': string;

  // Catalog & Categories
  'cat.catalogTitle': string;
  'cat.catalogBadge': string;
  'cat.foundCount': string;
  'cat.passport': string;
  'cat.all': string;
  'cat.it': string;
  'cat.languages': string;
  'cat.exact': string;
  'cat.natural': string;
  'cat.humanities': string;
  'cat.primary': string;
  'cat.creative': string;
  'cat.levelAll': string;
  'cat.levelBeginner': string;
  'cat.levelIntermediate': string;
  'cat.levelAdvanced': string;
  'cat.langAll': string;

  // Courses
  'course.start': string;
  'course.details': string;
  'course.lessons': string;
  'course.lessonsUnit': string;
  'course.hoursUnit': string;
  'course.free': string;
  'course.certificate': string;
  'course.freeBadge': string;

  // Techzone Dashboard
  'tech.aiTitle': string;
  'tech.aiHighlight': string;
  'tech.aiDesc': string;
  'tech.realTranslator': string;
  'tech.languages10': string;
  'tech.activeStatus': string;
  'tech.descShort': string;
  'tech.btnVoice': string;
  'tech.btnVoiceDesc': string;
  'tech.btnChat': string;
  'tech.btnChatDesc': string;
  'tech.btnAnalysis': string;
  'tech.btnAnalysisDesc': string;
  'tech.btnTest': string;
  'tech.btnTestDesc': string;
  'tech.btnHistory': string;
  'tech.btnHistoryDesc': string;
  'tech.btnOpenTranslator': string;
  'tech.startLesson': string;
  'tech.itSandbox': string;
  'tech.activeLearners': string;
  'tech.qrCertificates': string;
  'tech.virtualLabsTitle': string;
  'tech.virtualLabsSub': string;
  'tech.allLabs': string;
  'tech.labAi': string;
  'tech.labPhysics': string;
  'tech.labChemistry': string;
  'tech.viewExp': string;

  // Leaderboard
  'leaderboard.title': string;
  'leaderboard.subtitle': string;

  // Footer
  'footer.desc': string;
  'footer.rights': string;
  'footer.quickLinks': string;
  'footer.contact': string;
  'footer.address': string;

  // Common
  'common.search': string;
  'common.back': string;
  'common.close': string;
  'common.save': string;
  'common.loading': string;
  'common.all': string;

  [key: string]: string;
}

export type TFunction = ((key: string, fallback?: string) => string) & TranslationsType;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TFunction;
  languagesList: LanguageInfo[];
}

const translations: Record<SupportedLanguage, TranslationsType> = {
  uz: {
    heroBadge: 'Zamonaviy Taʼlim Ekologiyasi',
    heroTitle: 'Kelajak kasblari va global tillarni',
    heroHighlight: 'ZiyoTaʼlim bilan oʻrganing',
    heroSubtitle: 'Axborot texnologiyalari, IT dasturlash, 10 ta jahon tillari hamda sunʼiy intellekt repetitori yordamida bilimingizni eng yuqori darajaga olib chiqing.',
    searchPlaceholder: 'Kurslar, fanlar yoki yoʻnalishlarni qidirish...',
    searchClear: 'Qidiruvni tozalash',
    searchSubmit: 'Qidirish',
    heroStartIT: 'IT Kurslarini Boshlash',
    heroExploreLanguages: 'Chet Tillarini Oʻrganish',
    heroAskAI: 'AI Yordamchi Bilan Suhbat',
    heroQuickJump: 'Tezkor:',
    heroQuickIT: 'IT Dasturlash',
    heroQuickLanguages: 'Chet Tillari',
    heroQuickAI: 'AI Yordamchi',
    statStudents: 'Faol oʻquvchilar',
    statCertificates: 'QR-sertifikatlar',
    statCourses: 'Amaliy kurslar',
    statLanguages: 'Jahon tillari',
    statSatisfaction: 'Ijobiy baholar',
    statFreeAccess: '100% Bepul Kirish',
    statGrowthWeek: '▲ +12% bu hafta',

    heroCardTitle: 'Interaktiv Taʼlim Platformasi',
    heroCardSubtitle: 'Zamonaviy bilimlar va fanlar ekotizimi',
    heroCardIT: 'IT Kodlash Maydoni',
    heroCardITDesc: 'HTML, CSS, JS va Python kodlarini sinash',
    heroCardLang: 'Interaktiv Tillar Laboratoriyasi',
    heroCardLangDesc: 'Audio talaffuz va 4,000 ta soʻz bazasi',
    heroCardAI: 'AI Maslahatchi & Kod Tahlili',
    heroCardAIDesc: '24/7 savol-javob va grammatik tekshiruv',
    heroCardCert: 'Xalqaro standartdagi sertifikat',
    heroCardFree: '100% Bepul Kirish',

    'nav.rating': 'Reyting',
    'nav.adminCabinet': 'Admin Kabineti',
    'nav.login': 'Kirish',
    'nav.changeLang': 'Sayt tilini tanlash',
    'nav.lightMode': 'Yorugʻ rejimga oʻtish',
    'nav.darkMode': 'Qorongʻu rejimga oʻtish',

    'mode.switchClassic': '🔄 Klassik koʻrinish',
    'mode.switchTechzone': '✨ Akademiya koʻrinishi',
    'mode.academyTitle': 'Ziyo Talim akademiyasi',
    'mode.changeInterface': 'Interfeys:',
    'mode.selectLang': 'Sayt tili:',

    'langHub.badge': 'Xorijiy Tillar Markazi',
    'langHub.audioBadge': '🔊 Audio Talaffuz & Fonetika',
    'langHub.title': 'Ingliz, Rus, Fransuz va Nemis Tillari',
    'langHub.subtitle': 'Har bir til boʻyicha noldan boshlab xalqaro sertifikatlar (IELTS, TRKI, DELF, Goethe) gacha toʻliq oʻquv tizimi',
    'langHub.translatorBtn': '10 Tilli Real Tarjimon',
    'langHub.labBtn': 'Til Laboratoriyasi',
    'langHub.practiceBtn': 'Mashq Qilish',
    'langHub.coursesBtn': 'Kurslar',
    'langHub.students': 'talaba',
    'langHub.listenSample': 'Ovozli namuna',
    'langHub.stopAudio': 'Toʻxtatish',
    'langHub.mainModules': 'Asosiy modullar:',
    'langHub.speed': 'Tezlik:',

    'itHub.badge': 'IT & Dasturlash Akademiyasi',
    'itHub.title': 'Kelajak IT Mutaxassisligi',
    'itHub.subtitle': 'Frontend, Backend, Python, Kiberxavfsizlik va Mobil ilovalar yaratishni real loyihalar orqali oʻrganing',
    'itHub.sandboxBtn': 'IT Kodlash Maydoni',
    'itHub.exploreBtn': 'Barcha IT Kurslar',

    'cat.catalogTitle': 'Barcha Fanlar va Amaliy Kurslar',
    'cat.catalogBadge': 'Oʻquv Dasturlari Katalogi',
    'cat.foundCount': 'Topilgan kurslar:',
    'cat.passport': 'Fanlar pasporti:',
    'cat.all': 'Barcha Kurslar',
    'cat.it': 'IT & Dasturlash',
    'cat.languages': 'Xorijiy Tillar',
    'cat.exact': 'Aniq Fanlar',
    'cat.natural': 'Tabiiy Fanlar',
    'cat.humanities': 'Ijtimoiy-Gumanitar',
    'cat.primary': 'Boshlangʻich & Maktab',
    'cat.creative': 'Ijod & Dizayn',
    'cat.levelAll': 'Barcha darajalar',
    'cat.levelBeginner': 'Boshlangʻich',
    'cat.levelIntermediate': 'Oʻrta',
    'cat.levelAdvanced': 'Yuqori',
    'cat.langAll': 'Barcha tillar',

    'course.start': 'Darsni Boshlash',
    'course.details': 'Batafsil',
    'course.lessons': 'dars',
    'course.lessonsUnit': 'ta dars',
    'course.hoursUnit': 'soat',
    'course.free': 'Bepul',
    'course.certificate': 'Sertifikatli',
    'course.freeBadge': '100% Bepul',

    'tech.aiTitle': 'Shaxsiy AI-Oʻqituvchi &',
    'tech.aiHighlight': 'Zamonaviy Taʼlim Markazi',
    'tech.aiDesc': 'Techie AI bilan 10 ta jahon tilida muloqot qiling, grammatika tahlilini oʻrganing hamda IT sohasidagi eng talabgir darsliklarda bilimingizni oshiring.',
    'tech.realTranslator': 'Real Tarjimon & AI Markazi',
    'tech.languages10': '10 Jahon Tili',
    'tech.activeStatus': 'Faol',
    'tech.descShort': 'Ovozli gaplashish, AI chat, yozishma grammatik tahlili va bilimni tekshirish testlari',
    'tech.btnVoice': 'Real Tarjimon & Ovoz',
    'tech.btnVoiceDesc': 'Ovozli gaplashish va tinglash',
    'tech.btnChat': 'AI Bilan Gaplashish (Chat)',
    'tech.btnChatDesc': 'Interaktiv suhbat va real-vaqt muloqot',
    'tech.btnAnalysis': 'Yozishma Tahlili',
    'tech.btnAnalysisDesc': 'Morfologiya, sintaksis va grammatik tahlil',
    'tech.btnTest': 'Bilimni Sinash Testlari',
    'tech.btnTestDesc': '1-testdan 25-testgacha bilim sinovlari',
    'tech.btnHistory': 'Tarix',
    'tech.btnHistoryDesc': 'Tarjimalar va test natijalari arxivi',
    'tech.btnOpenTranslator': 'Real Tarjimon Oynasini Ochish',
    'tech.startLesson': 'Darsni Boshlash',
    'tech.itSandbox': 'IT Sandbox',
    'tech.activeLearners': 'Faol talabalar (▲ +12%)',
    'tech.qrCertificates': 'QR-kodli sertifikatlar',
    'tech.virtualLabsTitle': 'Virtual 3D Laboratoriyalar & Simulyatorlar',
    'tech.virtualLabsSub': 'Nazariy bilimlarni interaktiv tajribalar orqali mustahkamlang',
    'tech.allLabs': 'Barchasi',
    'tech.labAi': 'AI Asoslari',
    'tech.labPhysics': 'Fizika',
    'tech.labChemistry': 'Kimyo',
    'tech.viewExp': 'Tajribani koʻrish',

    'leaderboard.title': 'Eng Faol Oʻquvchilar Reytingi',
    'leaderboard.subtitle': 'Haftalik va oylik oʻquv koʻrsatkichlari boʻyicha yetakchilar roʻyxati',

    'footer.desc': 'Oʻzbekistondagi eng ilgʻor zamonaviy taʼlim platformasi. IT, tillar va fanlarni noldan professional darajagacha bepul oʻrganing.',
    'footer.rights': 'Barcha huquqlar himoyalangan.',
    'footer.quickLinks': 'Tezkor havolalar',
    'footer.contact': 'Bogʻlanish',
    'footer.address': 'Toshkent shahri, Oʻzbekiston',

    'common.search': 'Qidirish',
    'common.back': 'Orqaga',
    'common.close': 'Yopish',
    'common.save': 'Saqlash',
    'common.loading': 'Yuklanmoqda...',
    'common.all': 'Barchasi',
  },

  ru: {
    heroBadge: 'Современная Образовательная Среда',
    heroTitle: 'Изучайте профессии будущего и мировые языки',
    heroHighlight: 'вместе с ZiyoTaʼlim',
    heroSubtitle: 'Информационные технологии, IT программирование, 10 мировых языков и персональный AI-репетитор для достижения максимальных результатов.',
    searchPlaceholder: 'Поиск курсов, предметов или направлений...',
    searchClear: 'Очистить поиск',
    searchSubmit: 'Найти',
    heroStartIT: 'Начать IT Курсы',
    heroExploreLanguages: 'Изучать Языки',
    heroAskAI: 'Общаться с AI',
    heroQuickJump: 'Быстрый переход:',
    heroQuickIT: 'IT Программирование',
    heroQuickLanguages: 'Иностранные Языки',
    heroQuickAI: 'AI Помощник',
    statStudents: 'Активных студентов',
    statCertificates: 'QR-сертификатов',
    statCourses: 'Практических курсов',
    statLanguages: 'Мировых языков',
    statSatisfaction: 'Положительных отзывов',
    statFreeAccess: '100% Бесплатный Доступ',
    statGrowthWeek: '▲ +12% за неделю',

    heroCardTitle: 'Интерактивная Образовательная Платформа',
    heroCardSubtitle: 'Экосистема современных знаний и предметов',
    heroCardIT: 'IT Песочница Кода',
    heroCardITDesc: 'Практика HTML, CSS, JS и Python кода',
    heroCardLang: 'Интерактивная Лаборатория Языков',
    heroCardLangDesc: 'Аудио произношение и база из 4,000 слов',
    heroCardAI: 'AI Консультант и Анализ Кода',
    heroCardAIDesc: '24/7 ответы на вопросы и проверка грамматики',
    heroCardCert: 'Сертификат международного стандарта',
    heroCardFree: '100% Бесплатный Доступ',

    'nav.rating': 'Рейтинг',
    'nav.adminCabinet': 'Панель администратора',
    'nav.login': 'Войти',
    'nav.changeLang': 'Выбрать язык сайта',
    'nav.lightMode': 'Светлая тема',
    'nav.darkMode': 'Тёмная тема',

    'mode.switchClassic': '🔄 Классический вид',
    'mode.switchTechzone': '✨ Вид Академии',
    'mode.academyTitle': 'Академия Ziyo Talim',
    'mode.changeInterface': 'Интерфейс:',
    'mode.selectLang': 'Язык сайта:',

    'langHub.badge': 'Центр Иностранных Языков',
    'langHub.audioBadge': '🔊 Аудио Произношение и Фонетика',
    'langHub.title': 'Английский, Русский, Французский и Немецкий Языки',
    'langHub.subtitle': 'Полная система обучения от нуля до международных сертификатов (IELTS, TRKI, DELF, Goethe)',
    'langHub.translatorBtn': 'Реальный Переводчик на 10 Языков',
    'langHub.labBtn': 'Лаборатория Языков',
    'langHub.practiceBtn': 'Практиковаться',
    'langHub.coursesBtn': 'Курсы',
    'langHub.students': 'студентов',
    'langHub.listenSample': 'Аудио образец',
    'langHub.stopAudio': 'Остановить',
    'langHub.mainModules': 'Основные модули:',
    'langHub.speed': 'Скорость:',

    'itHub.badge': 'Академия IT и Программирования',
    'itHub.title': 'IT Профессии Будущего',
    'itHub.subtitle': 'Frontend, Backend, Python, Кибербезопасность и разработка мобильных приложений на реальных проектах',
    'itHub.sandboxBtn': 'IT Песочница',
    'itHub.exploreBtn': 'Все IT Курсы',

    'cat.catalogTitle': 'Все Предметы и Практические Курсы',
    'cat.catalogBadge': 'Каталог Учебных Программ',
    'cat.foundCount': 'Найдено курсов:',
    'cat.passport': 'Паспорт предметов:',
    'cat.all': 'Все Курсы',
    'cat.it': 'IT и Программирование',
    'cat.languages': 'Иностранные Языки',
    'cat.exact': 'Точные Науки',
    'cat.natural': 'Естественные Науки',
    'cat.humanities': 'Гуманитарные Науки',
    'cat.primary': 'Начальная и Школа',
    'cat.creative': 'Творчество и Дизайн',
    'cat.levelAll': 'Все уровни',
    'cat.levelBeginner': 'Начальный',
    'cat.levelIntermediate': 'Средний',
    'cat.levelAdvanced': 'Продвинутый',
    'cat.langAll': 'Все языки',

    'course.start': 'Начать Урок',
    'course.details': 'Подробнее',
    'course.lessons': 'уроков',
    'course.lessonsUnit': 'уроков',
    'course.hoursUnit': 'ч.',
    'course.free': 'Бесплатно',
    'course.certificate': 'С сертификатом',
    'course.freeBadge': '100% Бесплатно',

    'tech.aiTitle': 'Персональный AI-Репетитор и',
    'tech.aiHighlight': 'Современный Образовательный Центр',
    'tech.aiDesc': 'Общайтесь с Techie AI на 10 мировых языках, изучайте грамматику и осваивайте востребованные IT направления.',
    'tech.realTranslator': 'Реальный Переводчик и AI Центр',
    'tech.languages10': '10 Мировых Языков',
    'tech.activeStatus': 'Активен',
    'tech.descShort': 'Голосовое общение, AI чат, грамматический анализ и тесты для проверки знаний',
    'tech.btnVoice': 'Реальный Переводчик и Голос',
    'tech.btnVoiceDesc': 'Голосовое общение и прослушивание',
    'tech.btnChat': 'Общение с AI (Чат)',
    'tech.btnChatDesc': 'Интерактивная беседа и живой диалог',
    'tech.btnAnalysis': 'Анализ Текста',
    'tech.btnAnalysisDesc': 'Морфология, синтаксис и грамматика',
    'tech.btnTest': 'Тесты Знаний',
    'tech.btnTestDesc': 'Тесты с 1 по 25 для проверки знаний',
    'tech.btnHistory': 'История',
    'tech.btnHistoryDesc': 'Архив переводов и результатов тестов',
    'tech.btnOpenTranslator': 'Открыть Реальный Переводчик',
    'tech.startLesson': 'Начать Урок',
    'tech.itSandbox': 'IT Песочница',
    'tech.activeLearners': 'Активных студентов (▲ +12%)',
    'tech.qrCertificates': 'QR-сертификаты',
    'tech.virtualLabsTitle': 'Виртуальные 3D Лаборатории и Симуляторы',
    'tech.virtualLabsSub': 'Закрепляйте теорию через интерактивные эксперименты',
    'tech.allLabs': 'Все',
    'tech.labAi': 'Основы AI',
    'tech.labPhysics': 'Физика',
    'tech.labChemistry': 'Химия',
    'tech.viewExp': 'Смотреть опыт',

    'leaderboard.title': 'Рейтинг Активных Студентов',
    'leaderboard.subtitle': 'Список лидеров по еженедельным и ежемесячным учебным показателям',

    'footer.desc': 'Ведущая современная образовательная платформа Узбекистана. Изучайте IT, языки и предметы бесплатно от нуля до профи.',
    'footer.rights': 'Все права защищены.',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.contact': 'Контакты',
    'footer.address': 'г. Ташкент, Узбекистан',

    'common.search': 'Поиск',
    'common.back': 'Назад',
    'common.close': 'Закрыть',
    'common.save': 'Сохранить',
    'common.loading': 'Загрузка...',
    'common.all': 'Все',
  },

  en: {
    heroBadge: 'Modern Learning Ecosystem',
    heroTitle: 'Master Future Careers & Global Languages',
    heroHighlight: 'with ZiyoTaʼlim',
    heroSubtitle: 'Information technology, software engineering, 10 global languages, and personal AI tutoring to elevate your skills to the highest level.',
    searchPlaceholder: 'Search courses, subjects, or career paths...',
    searchClear: 'Clear search',
    searchSubmit: 'Search',
    heroStartIT: 'Start IT Courses',
    heroExploreLanguages: 'Explore Languages',
    heroAskAI: 'Ask AI Assistant',
    heroQuickJump: 'Quick jump:',
    heroQuickIT: 'IT Programming',
    heroQuickLanguages: 'World Languages',
    heroQuickAI: 'AI Assistant',
    statStudents: 'Active Students',
    statCertificates: 'QR Certificates',
    statCourses: 'Practical Courses',
    statLanguages: 'World Languages',
    statSatisfaction: 'Satisfaction Rate',
    statFreeAccess: '100% Free Access',
    statGrowthWeek: '▲ +12% this week',

    heroCardTitle: 'Interactive Learning Platform',
    heroCardSubtitle: 'Modern skills & knowledge ecosystem',
    heroCardIT: 'IT Coding Playground',
    heroCardITDesc: 'Practice HTML, CSS, JS and Python code',
    heroCardLang: 'Interactive Language Lab',
    heroCardLangDesc: 'Audio pronunciation and 4,000 vocab words',
    heroCardAI: 'AI Consultant & Code Analysis',
    heroCardAIDesc: '24/7 Q&A and grammar checks',
    heroCardCert: 'International standard certificate',
    heroCardFree: '100% Free Access',

    'nav.rating': 'Leaderboard',
    'nav.adminCabinet': 'Admin Panel',
    'nav.login': 'Sign In',
    'nav.changeLang': 'Select Site Language',
    'nav.lightMode': 'Light Mode',
    'nav.darkMode': 'Dark Mode',

    'mode.switchClassic': '🔄 Classic View',
    'mode.switchTechzone': '✨ Academy View',
    'mode.academyTitle': 'Ziyo Talim Academy',
    'mode.changeInterface': 'Interface:',
    'mode.selectLang': 'Site language:',

    'langHub.badge': 'Foreign Languages Center',
    'langHub.audioBadge': '🔊 Audio Pronunciation & Phonetics',
    'langHub.title': 'English, Russian, French & German Languages',
    'langHub.subtitle': 'Complete learning system from zero to international certificates (IELTS, TRKI, DELF, Goethe)',
    'langHub.translatorBtn': '10-Language Real Translator',
    'langHub.labBtn': 'Language Lab',
    'langHub.practiceBtn': 'Practice Now',
    'langHub.coursesBtn': 'Courses',
    'langHub.students': 'students',
    'langHub.listenSample': 'Audio Sample',
    'langHub.stopAudio': 'Stop Audio',
    'langHub.mainModules': 'Key Modules:',
    'langHub.speed': 'Speed:',

    'itHub.badge': 'IT & Software Academy',
    'itHub.title': 'Future IT Careers',
    'itHub.subtitle': 'Master Frontend, Backend, Python, Cybersecurity, and Mobile Apps through real-world projects',
    'itHub.sandboxBtn': 'IT Sandbox',
    'itHub.exploreBtn': 'All IT Courses',

    'cat.catalogTitle': 'All Subjects & Practical Courses',
    'cat.catalogBadge': 'Curriculum Catalog',
    'cat.foundCount': 'Courses found:',
    'cat.passport': 'Subject dossier:',
    'cat.all': 'All Courses',
    'cat.it': 'IT & Programming',
    'cat.languages': 'Foreign Languages',
    'cat.exact': 'Exact Sciences',
    'cat.natural': 'Natural Sciences',
    'cat.humanities': 'Humanities',
    'cat.primary': 'Primary & School',
    'cat.creative': 'Creative & Design',
    'cat.levelAll': 'All levels',
    'cat.levelBeginner': 'Beginner',
    'cat.levelIntermediate': 'Intermediate',
    'cat.levelAdvanced': 'Advanced',
    'cat.langAll': 'All languages',

    'course.start': 'Start Lesson',
    'course.details': 'Details',
    'course.lessons': 'lessons',
    'course.lessonsUnit': 'lessons',
    'course.hoursUnit': 'hrs',
    'course.free': 'Free',
    'course.certificate': 'With Certificate',
    'course.freeBadge': '100% Free',

    'tech.aiTitle': 'Personal AI Tutor &',
    'tech.aiHighlight': 'Modern Learning Center',
    'tech.aiDesc': 'Chat with Techie AI in 10 world languages, master grammar analysis, and learn in-demand IT courses.',
    'tech.realTranslator': 'Real Translator & AI Hub',
    'tech.languages10': '10 World Languages',
    'tech.activeStatus': 'Active',
    'tech.descShort': 'Voice conversations, AI chat, writing analysis, and knowledge test quizzes',
    'tech.btnVoice': 'Real Translator & Voice',
    'tech.btnVoiceDesc': 'Voice speech and listening',
    'tech.btnChat': 'Chat with AI',
    'tech.btnChatDesc': 'Interactive dialogue and real-time talk',
    'tech.btnAnalysis': 'Text Analysis',
    'tech.btnAnalysisDesc': 'Morphology, syntax, and grammar checks',
    'tech.btnTest': 'Knowledge Quizzes',
    'tech.btnTestDesc': 'Tests 1 to 25 to check skills',
    'tech.btnHistory': 'History',
    'tech.btnHistoryDesc': 'Archive of translations and test scores',
    'tech.btnOpenTranslator': 'Open Real Translator',
    'tech.startLesson': 'Start Lesson',
    'tech.itSandbox': 'IT Sandbox',
    'tech.activeLearners': 'Active students (▲ +12%)',
    'tech.qrCertificates': 'QR Certificates',
    'tech.virtualLabsTitle': 'Virtual 3D Laboratories & Simulators',
    'tech.virtualLabsSub': 'Reinforce theory through interactive experiments',
    'tech.allLabs': 'All',
    'tech.labAi': 'AI Foundations',
    'tech.labPhysics': 'Physics',
    'tech.labChemistry': 'Chemistry',
    'tech.viewExp': 'View Experiment',

    'leaderboard.title': 'Top Students Leaderboard',
    'leaderboard.subtitle': 'Rankings of students by weekly and monthly academic achievements',

    'footer.desc': 'Uzbekistan\'s premier modern education platform. Master IT, languages, and sciences for free from scratch to professional level.',
    'footer.rights': 'All rights reserved.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.address': 'Tashkent city, Uzbekistan',

    'common.search': 'Search',
    'common.back': 'Back',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.loading': 'Loading...',
    'common.all': 'All',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ziyo_language');
      if (stored === 'uz' || stored === 'ru' || stored === 'en') {
        return stored;
      }
    }
    return 'uz';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ziyo_language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
  };

  const currentTranslations = translations[language] || translations.uz;

  // Build callable and object-accessible t
  const tFunc = ((key: string, fallback?: string): string => {
    return currentTranslations[key] || fallback || key;
  }) as TFunction;

  // Assign dictionary properties directly to function
  Object.assign(tFunc, currentTranslations);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t: tFunc,
      languagesList: SUPPORTED_LANGUAGES 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
