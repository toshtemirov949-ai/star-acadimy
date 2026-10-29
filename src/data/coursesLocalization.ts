import { Course, CourseModule, Lesson, CourseCategory } from '../types';
import { COURSES_DATA } from './coursesData';
import { SupportedLanguage } from '../context/LanguageContext';

export interface LocalizedCourseData {
  title: string;
  shortDescription: string;
  description: string;
  level: string;
  badge: string;
  highlights: string[];
  instructorRole: string;
  instructorBio: string;
  moduleTranslations?: {
    title: string;
    lessonTitles: string[];
  }[];
}

// Full, professional, accurate translations for Russian and English for all 17 courses in the database
export const COURSES_LOCALIZATION: Record<'ru' | 'en', Record<string, LocalizedCourseData>> = {
  ru: {
    'lang-en-ielts': {
      title: 'Мастер-класс IELTS 7.5+ и академический английский язык',
      shortDescription: 'Полный мастер-курс из 25 уроков по международным стандартам: IELTS Listening, Reading, Writing Task 1-2 и Speaking.',
      description: 'Курс предоставляет самые эффективные стратегии, реальные экзаменационные материалы и лексические ресурсы по всем 4 модулям (Аудирование, Чтение, Письмо и Говорение) для достижения балла 7.5+ на экзамене IELTS.',
      level: 'Продвинутый (Advanced)',
      badge: 'Бестселлер',
      highlights: [
        '25 полноценных видео и практических уроков',
        'Интерактивные аудиоупражнения для развития беглой речи (Speaking)',
        'Шаблоны академических эссе Writing Task 1 и Task 2',
        'Официальный верифицированный сертификат курса'
      ],
      instructorRole: 'Обладатель IELTS 8.5, сертифицированный кембриджский инструктор',
      instructorBio: 'Международный репетитор с опытом более 10 лет, свыше 2000 студентов с результатом IELTS 7.0+.'
    },
    'lang-en-general': {
      title: 'General English: От нуля A1 до уровня B2',
      shortDescription: 'Доступная грамматика, 25 пошаговых интерактивных уроков и живые диалоги для начинающих изучать английский язык.',
      description: 'Освойте свободное общение на английском языке благодаря повседневным фразам, согласованию времен, правильной фонетике и аудио-тренажерам.',
      level: 'Начальный (Beginner)',
      badge: 'Популярный',
      highlights: [
        '25 структурированных интерактивных занятий',
        'Проверочные тесты после каждой пройденной темы',
        'Аудио-произношение и практические диалоги',
        'Официальный сертификат уровня B2'
      ],
      instructorRole: 'Преподаватель УзГУМЯ, обладатель диплома CELTA',
      instructorBio: 'Опытный специалист по методике интерактивного преподавания иностранных языков.'
    },
    'lang-ru-speaking': {
      title: 'Разговорный Русский: Свободное общение без барьеров',
      shortDescription: 'Фонетика, 6 падежей, глаголы движения и 25 практических уроков для легкой и уверенной русской речи.',
      description: 'Секреты беглой русской речи, понимание фильмов и музыки, устранение акцента и уверенное общение в реальных жизненных ситуациях.',
      level: 'Средний (Intermediate)',
      badge: 'Рекомендуется',
      highlights: [
        '25 практических уроков живой разговорной речи',
        'Простое и понятное объяснение системы 6 падежей',
        'Аудио-тренажер произношения и диалогов',
        'Именной сертификат академии'
      ],
      instructorRole: 'Филолог русского языка, международный лектор',
      instructorBio: 'Специалист с многолетним стажем обучения русскому языку через современный коммуникативный подход.'
    },
    'lang-ru-business': {
      title: 'Деловой и Официальный Русский Язык',
      shortDescription: 'Деловая переписка, переговоры, составление контрактов, международное резюме и подготовка к ТРКИ.',
      description: '25 специализированных уроков делового русского языка для руководителей компаний, менеджеров и специалистов международных организаций.',
      level: 'Продвинутый (Advanced)',
      badge: 'Профессиональный',
      highlights: [
        '25 тем корпоративного делового этикета и языка',
        'Шаблоны реальных контрактов и коммерческих предложений',
        'Практические задания формата ТРКИ B1/B2',
        'Официальный сертификат профессионального уровня'
      ],
      instructorRole: 'Бизнес-консультант и корпоративный тренер',
      instructorBio: 'Эксперт с 12-летним опытом ведения переговоров и деловых связей в международных корпорациях.'
    },
    'lang-fr-delft': {
      title: 'Французский Язык от A1 до B2: DELF и Живая Речь',
      shortDescription: 'Парижская фонетика, носовые звуки, спряжение глаголов и подготовка к международному экзамену DELF.',
      description: 'Изящное французское произношение, разговорная речь и 25 полноценных уроков для поступления в университеты Франции.',
      level: 'Начальный (Beginner)',
      badge: 'Международный',
      highlights: [
        '25 структурированных уроков и аудиодиалогов',
        'Тестовые модули стандартов DELF A1/A2/B1',
        'Интерактивная постановка парижского произношения',
        'Сертификат подтверждения уровня французского языка'
      ],
      instructorRole: 'Сертифицированные педагоги Alliance Française',
      instructorBio: 'Выпускники французских вузов с многолетней практикой подготовки к DELF и DALF.'
    },
    'lang-de-goethe': {
      title: 'Немецкий Язык от A1 до B2: Goethe-Zertifikat & TestDaF',
      shortDescription: '25 системных уроков, артикли, падежи и экзаменационные тесты для учебы и работы в Германии.',
      description: 'Секреты Der/Die/Das, построение предложений (Satzbau), падежи Akkusativ/Dativ и 25 полноценных модулей для сдачи экзаменов Goethe и TestDaF.',
      level: 'Начальный (Beginner)',
      badge: 'Топ-курс',
      highlights: [
        '25 модульных уроков немецкой грамматики и лексики',
        'Образцовые тесты формата Goethe-Zertifikat A1-B2',
        'Аудиотренировки и свободное немецкое общение',
        'Официальный сертификат выпускника'
      ],
      instructorRole: 'Обладатель TestDaF C1, стипендиат DAAD',
      instructorBio: 'Выпускник Мюнхенского технического университета, более 6 лет готовит к успешной сдаче экзаменов.'
    },
    'it-react-frontend': {
      title: 'Современная Frontend-Разработка: HTML, CSS, React и Tailwind',
      shortDescription: 'Станьте профессиональным Frontend-разработчиком с нуля: 25 практических уроков с кодом и реальными проектами.',
      description: 'Семантика HTML5, современные CSS Flexbox/Grid, Tailwind CSS, JavaScript ES6+, React Hooks, работа с API и создание полноценного интернет-магазина.',
      level: 'Средний (Intermediate)',
      badge: 'Востребованный',
      highlights: [
        '25 практических уроков веб-программирования',
        'Интерактивная песочница кода прямо в браузере',
        'Создание реального проекта для портфолио',
        'Официальный сертификат Frontend-инженера'
      ],
      instructorRole: 'Senior Frontend Инженер (Fintech)',
      instructorBio: '8 лет международного IT-опыта, архитектор масштабных платформ на React и TypeScript.'
    },
    'it-python-ai': {
      title: 'Python и Основы Искусственного Интеллекта (AI & Data Science)',
      shortDescription: 'Синтаксис Python, NumPy, Pandas, Scikit-learn и создание прикладных решений с большими языковыми моделями (LLM).',
      description: 'Алгоритмы с нуля, анализ данных, машинное обучение (Machine Learning) и разработка интеллектуальных сервисов с Gemini и OpenAI API.',
      level: 'Средний (Intermediate)',
      badge: 'Новое поколение',
      highlights: [
        '25 углубленных уроков по Python и ИИ',
        'Анализ реальных датасетов с Pandas и NumPy',
        'Интеграция нейросетей и Gemini API',
        'Сертификат Data Science & AI специалиста'
      ],
      instructorRole: 'AI Исследователь и Data Scientist',
      instructorBio: 'Специалист по нейросетям и машинному обучению, победитель международных IT-хакатонов.'
    },
    'it-backend-node': {
      title: 'Backend-Разработка: Node.js, Express и PostgreSQL',
      shortDescription: 'Высоконагруженные серверы, REST API, базы данных SQL, безопасность JWT и развертывание в Docker.',
      description: 'Архитектура серверов, проектирование реляционных баз данных, безопасная авторизация, микросервисы и разработка чат-приложения реального времени.',
      level: 'Продвинутый (Advanced)',
      badge: 'Профессиональный',
      highlights: [
        '25 интенсивных уроков серверной разработки',
        'Реляционная база данных PostgreSQL и сложные SQL-запросы',
        'Надежная аутентификация на основе JWT и сессий',
        'Сертификат Backend-инженера'
      ],
      instructorRole: 'Lead Backend Инженер',
      instructorBio: '9 лет профессионального опыта создания серверных платформ для финтеха и электронной коммерции.'
    },
    'it-cybersecurity': {
      title: 'Кибербезопасность и Защита Информационных Систем',
      shortDescription: 'Сетевые протоколы, безопасность Linux, уязвимости OWASP Top 10 и этичный хакинг.',
      description: 'Практические навыки специалиста по информационной безопасности: Nmap, Wireshark, криптография, предотвращение кибератак и защита инфраструктуры.',
      level: 'Средний (Intermediate)',
      badge: 'Безопасность',
      highlights: [
        '25 практических занятий по киберзащите',
        'Обнаружение и устранение уязвимостей OWASP Top 10',
        'Анализ сетевого трафика в Wireshark и Nmap',
        'Сертификат специалиста по кибербезопасности'
      ],
      instructorRole: 'Сертифицированный этичный хакер (CEH)',
      instructorBio: 'Ведущий аудитор информационной безопасности государственных и банковских систем.'
    },
    'exact-math-higher': {
      title: 'Высшая Математика, Алгебра и Национальный Сертификат',
      shortDescription: '25 углубленных уроков: уравнения, производные, интегралы, стереометрия и теория вероятностей.',
      description: 'Фундаментальная теория, формулы и решение олимпиадных задач для поступления в вузы и получения 100% результата на Национальном сертификате.',
      level: 'Средний (Intermediate)',
      badge: 'Академический',
      highlights: [
        '25 фундаментальных уроков с практическими разборами',
        'Производные, интегралы и сложная пространственная геометрия',
        'Тесты уровня Национального сертификата и DTM',
        'Сертификат по высшей математике'
      ],
      instructorRole: 'Кандидат физико-математических наук, Национальный сертификат A+',
      instructorBio: 'Преподаватель, чьи ученики регулярно занимают призовые места на республиканских и международных олимпиадах.'
    },
    'exact-physics': {
      title: 'Общая Физика: Механика, Электродинамика и Квантовые Основы',
      shortDescription: 'Законы Ньютона, термодинамика, электрические цепи, оптика и атомная физика в 25 уроках.',
      description: 'Практические эксперименты, глубокое логическое понимание физических явлений и простые алгоритмы решения сложных расчетных задач.',
      level: 'Средний (Intermediate)',
      badge: 'Фундаментальный',
      highlights: [
        '25 полноценных теоретических и экспериментальных уроков',
        'Наглядный анализ формул и физических процессов',
        'База олимпиадных и вступительных тестов DTM',
        'Сертификат по общей физике'
      ],
      instructorRole: 'Учитель физики высшей категории',
      instructorBio: 'Педагог с 15-летним стажем, подготовивший сотни студентов к поступлению в ведущие технические университеты.'
    },
    'natural-chemistry': {
      title: 'Химия: Лаборатория Органической и Неорганической Химии',
      shortDescription: 'Строение атома, периодический закон, растворы, окислительно-восстановительные реакции и классы органики.',
      description: '25 углубленных видеоуроков, химические уравнения и расчетные задачи для поступающих в медицинские и фармацевтические вузы.',
      level: 'Средний (Intermediate)',
      badge: 'Медицинский профиль',
      highlights: [
        '25 модульных уроков химической лаборатории',
        'Уравнения реакций и электронный баланс',
        'Решение задач на концентрацию растворов и стехиометрию',
        'Сертификат химической лаборатории'
      ],
      instructorRole: 'Доктор химических наук, доцент',
      instructorBio: 'Преподаватель медицинской академии с многолетним стажем, наставник более 1000 будущих врачей.'
    },
    'natural-biology': {
      title: 'Биология: Генетика, Анатомия Человека и Цитология',
      shortDescription: 'Тайны клетки, биосинтез ДНК, законы Менделя, физиология органов человека и теория эволюции.',
      description: '25 детализированных уроков: красочные 3D-модели, решение генетических задач и требования Национального сертификата.',
      level: 'Средний (Intermediate)',
      badge: 'Популярный',
      highlights: [
        '25 наглядных и подробных уроков биологии',
        'Быстрые алгоритмы решения задач по генетике',
        'Тесты по анатомии и физиологии человека',
        'Сертификат курса биологии'
      ],
      instructorRole: 'Биолог-генетик, эксперт международных олимпиад',
      instructorBio: 'Практикующий исследователь в области генетики и молекулярной биологии клетки.'
    },
    'natural-geography': {
      title: 'География: Материки, Природные и Экономические Карты',
      shortDescription: 'Картография, литосферные плиты, климатические пояса, мировой океан и экономическая география.',
      description: 'Природа планеты, континенты, реки, полезные ископаемые и детальный анализ регионов в 25 уроках с интерактивными картами.',
      level: 'Начальный (Beginner)',
      badge: 'Курс с картами',
      highlights: [
        '25 уроков по картографии и материкам',
        'Практика топографии, масштаба и координат',
        'Анализ мировой и региональной экономики',
        'Сертификат выпускника географии'
      ],
      instructorRole: 'Магистр географических наук, картограф',
      instructorBio: 'Соавтор национальных учебников географии, эксперт по интерактивным геоинформационным картам.'
    },
    'hum-history': {
      title: 'История: Цивилизации, Эпоха Темуридов и Мировая История',
      shortDescription: 'От древних эпох до наших дней: Амир Темур, движение Джадидов, мировые цивилизации и независимость.',
      description: '25 увлекательных научно-популярных уроков: исторические даты, ключевые личности, поворотные битвы и культурное наследие в строгой хронологии.',
      level: 'Средний (Intermediate)',
      badge: 'Национальное наследие',
      highlights: [
        '25 хронологических уроков всемирной истории',
        'Глубокий анализ эпохи Амира Темура и наследия Джадидов',
        'Интерактивные тесты на запоминание дат и личностей',
        'Сертификат по курсу истории'
      ],
      instructorRole: 'Доктор исторических наук, академический исследователь',
      instructorBio: 'Автор десятков научных монографий по востоковедению и истории Центральной Азии.'
    },
    'hum-uzbek-lit': {
      title: 'Родной Язык и Литература: Подготовка к Национальному Тестированию',
      shortDescription: 'Фонетика, морфология, синтаксический анализ, пунктуация и литература от Алишера Навои до современности.',
      description: '25 комплексных уроков для достижения высшего балла на Национальном сертификате и вступительных экзаменах по языку и литературе.',
      level: 'Средний (Intermediate)',
      badge: 'Национальный сертификат',
      highlights: [
        '25 модульных уроков грамматики и литературного анализа',
        'Работа с текстом, правила синтаксиса и орфоэпии',
        'Тесты по классической и современной литературе',
        'Официальный сертификат по филологии'
      ],
      instructorRole: 'Эксперт по языку и литературе, Национальный сертификат A+',
      instructorBio: 'Педагог с 14-летним стажем, чьи ученики успешно учатся на филологических факультетах ведущих вузов.'
    }
  },
  en: {
    'lang-en-ielts': {
      title: 'IELTS Masterclass 7.5+ & Academic English',
      shortDescription: 'Comprehensive 25-lesson masterclass covering IELTS Listening, Reading, Writing Tasks 1-2, and Speaking to international standards.',
      description: 'This course equips you with proven strategies, authentic exam tasks, and high-band lexical resources across all 4 modules (Listening, Reading, Writing, Speaking) to score 7.5+ on the IELTS exam.',
      level: 'Advanced',
      badge: 'Bestseller',
      highlights: [
        '25 in-depth video and interactive practical lessons',
        'Live interactive audio drills for fluent Speaking mastery',
        'High-scoring templates for Writing Task 1 and Task 2 essays',
        'Official verified course completion certificate'
      ],
      instructorRole: 'IELTS 8.5 Holder, Cambridge Certified Instructor',
      instructorBio: 'International tutor with over 10 years of experience; over 2,000 students achieved IELTS 7.0+.'
    },
    'lang-en-general': {
      title: 'General English: Complete Pathway from A1 to B2',
      shortDescription: 'Accessible grammar, 25 step-by-step interactive lessons, and real-life dialogues for English language learners.',
      description: 'Learn to communicate fluently and naturally through daily conversational phrases, verb tenses, phonetics, and interactive listening exercises.',
      level: 'Beginner',
      badge: 'Popular',
      highlights: [
        '25 structured interactive lessons from basics to fluency',
        'Knowledge-check quizzes after every lesson module',
        'Audio pronunciation practice and conversational roleplays',
        'Official B2 graduation certificate'
      ],
      instructorRole: 'Senior English Lecturer, CELTA Certified',
      instructorBio: 'Experienced specialist in interactive foreign language teaching methodologies.'
    },
    'lang-ru-speaking': {
      title: 'Conversational Russian: Fluency & Everyday Communication',
      shortDescription: 'Phonetics, the 6 cases, verbs of motion, and 25 immersive lessons to speak Russian fluently without barriers.',
      description: 'Unlock fluent Russian speech, understand media, correct pronunciation nuances, and communicate confidently in everyday life.',
      level: 'Intermediate',
      badge: 'Recommended',
      highlights: [
        '25 live conversational and speaking practice lessons',
        'Clear and intuitive breakdown of the 6 Russian cases',
        'Audio pronunciation and interactive dialogue simulator',
        'Official Academy Certificate'
      ],
      instructorRole: 'Russian Philologist, International Lecturer',
      instructorBio: 'Expert educator teaching Russian via modern communicative and communicative immersion approaches.'
    },
    'lang-ru-business': {
      title: 'Business & Professional Russian',
      shortDescription: 'Business correspondence, negotiations, contract drafting, international resume writing, and TORFL exam preparation.',
      description: '25 professional lessons tailored for executives, managers, and specialists working in bilateral and global organizations.',
      level: 'Advanced',
      badge: 'Professional',
      highlights: [
        '25 corporate business communication topics',
        'Real contract and commercial proposal templates',
        'Practice tasks aligned with TORFL B1/B2 exams',
        'Official certified professional certificate'
      ],
      instructorRole: 'Business Consultant & Corporate Trainer',
      instructorBio: 'Expert with 12 years of experience in negotiations and corporate relations across global enterprises.'
    },
    'lang-fr-delft': {
      title: 'French from A1 to B2: DELF & Natural Conversation',
      shortDescription: 'Parisian phonetics, nasal vowels, verb conjugations, and preparation for international DELF exams.',
      description: 'Master authentic French pronunciation, daily conversational fluency, and academic skills across 25 comprehensive modules.',
      level: 'Beginner',
      badge: 'International',
      highlights: [
        '25 detailed lessons and native-speaker dialogues',
        'DELF A1/A2/B1 practice test simulations',
        'Interactive phonetics and pronunciation coaching',
        'Official French language proficiency certificate'
      ],
      instructorRole: 'Alliance Française Certified Educators',
      instructorBio: 'Educated in France with extensive track record in DELF/DALF examination preparation.'
    },
    'lang-de-goethe': {
      title: 'German from A1 to B2: Goethe-Zertifikat & TestDaF',
      shortDescription: '25 systematic lessons, articles, sentence structure, and test prep for studying and working in Germany.',
      description: 'Master Der/Die/Das, German syntax (Satzbau), Akkusativ/Dativ cases, and test strategies across 25 complete modules.',
      level: 'Beginner',
      badge: 'Top Course',
      highlights: [
        '25 modular grammar and vocabulary lessons',
        'Goethe-Zertifikat A1-B2 mock test simulations',
        'Immersive listening practice and spoken German drills',
        'Official graduation certificate'
      ],
      instructorRole: 'TestDaF C1 Holder, DAAD Scholar',
      instructorBio: 'Technical University of Munich graduate with 6+ years of excellence in German language training.'
    },
    'it-react-frontend': {
      title: 'Modern Frontend Engineering: HTML, CSS, React & Tailwind',
      shortDescription: 'Become a professional Frontend developer from scratch: 25 practical coding lessons and real-world projects.',
      description: 'Master semantic HTML5, CSS Flexbox/Grid, Tailwind CSS, JavaScript ES6+, React Hooks, API integration, and build a complete e-commerce application.',
      level: 'Intermediate',
      badge: 'High Demand',
      highlights: [
        '25 hands-on web development coding lessons',
        'Live in-browser code editor and sandbox',
        'Real-world portfolio capstone project with code review',
        'Official Frontend Developer certificate'
      ],
      instructorRole: 'Senior Frontend Engineer (Fintech)',
      instructorBio: '8 years of international IT experience, architect of large-scale React and TypeScript platforms.'
    },
    'it-python-ai': {
      title: 'Python, AI & Data Science Fundamentals',
      shortDescription: 'Python syntax, NumPy, Pandas, Scikit-learn, and building applications with Large Language Models (LLMs).',
      description: 'Learn algorithms from scratch, data analysis, Machine Learning pipelines, and intelligent AI apps powered by Gemini and OpenAI APIs.',
      level: 'Intermediate',
      badge: 'Next-Gen',
      highlights: [
        '25 intensive Python and Artificial Intelligence lessons',
        'Real data manipulation using Pandas and NumPy',
        'Gemini AI API integration and neural networks',
        'Data Science & AI graduation certificate'
      ],
      instructorRole: 'AI Researcher & Data Scientist',
      instructorBio: 'Researcher in artificial intelligence and deep learning, international hackathon champion.'
    },
    'it-backend-node': {
      title: 'Backend Engineering: Node.js, Express & PostgreSQL',
      shortDescription: 'High-concurrency servers, RESTful APIs, SQL databases, JWT security, and containerized Docker deployment.',
      description: 'Master server architecture, relational database design, secure authentication, microservices, and build a production-grade real-time chat backend.',
      level: 'Advanced',
      badge: 'Professional',
      highlights: [
        '25 intensive server-side programming lessons',
        'PostgreSQL relational modeling and complex SQL queries',
        'Production-ready JWT authentication & security best practices',
        'Official Backend Engineer certificate'
      ],
      instructorRole: 'Lead Backend Engineer',
      instructorBio: '9 years of professional engineering experience building fintech and e-commerce platforms.'
    },
    'it-cybersecurity': {
      title: 'Cybersecurity & Information Systems Defense',
      shortDescription: 'Network protocols, Linux hardening, OWASP Top 10 vulnerabilities, and ethical hacking fundamentals.',
      description: 'Essential practical skills for infosec specialists: Nmap, Wireshark, cryptography, cyber incident response, and infrastructure protection.',
      level: 'Intermediate',
      badge: 'Security',
      highlights: [
        '25 hands-on cyber defense and security lessons',
        'Remediating OWASP Top 10 web vulnerabilities',
        'Network packet inspection with Wireshark & Nmap',
        'Information Security Specialist certificate'
      ],
      instructorRole: 'Certified Ethical Hacker (CEH)',
      instructorBio: 'Lead cybersecurity auditor for government and financial enterprise systems.'
    },
    'exact-math-higher': {
      title: 'Higher Mathematics: Algebra, Calculus & Olympiad Prep',
      shortDescription: '25 comprehensive lessons covering equations, derivatives, integrals, stereometry, and probability theory.',
      description: 'Rigorous mathematical theory, formula mastery, and problem-solving techniques for university admissions and A+ National Certification.',
      level: 'Intermediate',
      badge: 'Academic',
      highlights: [
        '25 modular lessons on fundamental and higher mathematics',
        'Calculus, differentiation, integration, and 3D geometry',
        'Challenging National Certificate and admission exam problems',
        'Mathematics course graduation certificate'
      ],
      instructorRole: 'PhD in Physics & Mathematics, National Certificate A+',
      instructorBio: 'Mentor whose students consistently win national and international math olympiad medals.'
    },
    'exact-physics': {
      title: 'General Physics: Mechanics, Electrodynamics & Quantum Basics',
      shortDescription: 'Newton\'s laws, thermodynamics, circuit analysis, optics, and atomic physics across 25 dynamic lessons.',
      description: 'Explore real experiments, intuitive understanding of physical laws beyond rote formulas, and problem-solving strategies.',
      level: 'Intermediate',
      badge: 'Fundamental',
      highlights: [
        '25 complete theoretical and laboratory lessons',
        'Visual breakdown of physical phenomena and equations',
        'Curated pool of DTM and university entrance test problems',
        'General Physics certificate'
      ],
      instructorRole: 'Senior Physics Master Educator',
      instructorBio: '15 years of pedagogical excellence preparing students for top engineering universities.'
    },
    'natural-chemistry': {
      title: 'Chemistry: Organic & Inorganic Laboratory Mastery',
      shortDescription: 'Atomic structure, periodic law, solutions, redox reactions, and classes of organic chemistry.',
      description: '25 in-depth video lessons, reaction equation mastery, and stoichiometry problems for medical and pharmaceutical university candidates.',
      level: 'Intermediate',
      badge: 'Medical Track',
      highlights: [
        '25 modular chemical laboratory and theory lessons',
        'Reaction mechanisms and redox electron balancing',
        'Solution concentration and stoichiometry problem solving',
        'Chemistry Laboratory Certificate'
      ],
      instructorRole: 'Doctor of Chemical Sciences, Associate Professor',
      instructorBio: 'Medical Academy faculty mentor with decades of experience guiding future healthcare leaders.'
    },
    'natural-biology': {
      title: 'Biology: Genetics, Human Anatomy & Cytology',
      shortDescription: 'Cellular mechanics, DNA replication, Mendelian genetics, human organ systems, and evolutionary theory.',
      description: '25 rich lessons with 3D anatomical models, genetics problem-solving, and National Certificate prep.',
      level: 'Intermediate',
      badge: 'Popular',
      highlights: [
        '25 visual, highly detailed biology modules',
        'Fast algorithms for solving complex genetics problems',
        'Human anatomy and organ system diagnostic tests',
        'Biology Mastery Certificate'
      ],
      instructorRole: 'Geneticist & Biology Olympiad Expert',
      instructorBio: 'Practicing researcher and educator specializing in genetics and cellular biology.'
    },
    'natural-geography': {
      title: 'Geography: Continents, Physical & Economic Cartography',
      shortDescription: 'Cartography, tectonic plates, climate zones, world oceans, and global economic geography.',
      description: 'Explore Earth\'s ecosystems, continents, waterways, natural resources, and regional economies through 25 interactive map lessons.',
      level: 'Beginner',
      badge: 'Map-Based',
      highlights: [
        '25 interactive lessons on physical and human geography',
        'Topography, scale calculation, and spatial analysis drills',
        'Global and regional economic geography analysis',
        'Geography course completion certificate'
      ],
      instructorRole: 'M.Sc. in Geography, Professional Cartographer',
      instructorBio: 'Co-author of national geography textbooks and digital GIS mapping curriculum expert.'
    },
    'hum-history': {
      title: 'History: World Civilizations, Timurid Era & Modern Heritage',
      shortDescription: 'From antiquity to modern era: Amir Timur, the Jadid enlightenment, world civilizations, and nationhood.',
      description: '25 engaging history lessons covering landmark dates, iconic figures, battles, and cultural heritage in clear chronological sequence.',
      level: 'Intermediate',
      badge: 'Heritage',
      highlights: [
        '25 chronological world and regional history lessons',
        'Comprehensive analysis of the Timurid epoch and Jadid thinkers',
        'Active recall quizzes for historical dates and figures',
        'History course completion certificate'
      ],
      instructorRole: 'Doctor of Historical Sciences, Academic Researcher',
      instructorBio: 'Author of multiple monographs on Oriental studies and Central Asian history.'
    },
    'hum-uzbek-lit': {
      title: 'Native Language & Literature: National Certificate Mastery',
      shortDescription: 'Phonetics, morphology, syntax analysis, punctuation, and literary classics from Alisher Navoi to modernity.',
      description: '25 in-depth lessons designed to score maximum points on National Certification and university language exams.',
      level: 'Intermediate',
      badge: 'National Certificate',
      highlights: [
        '25 modular grammar and literary analysis lessons',
        'Text analysis, comprehension, and punctuation rules',
        'Classical and contemporary literature mock exams',
        'Official Language & Literature Certificate'
      ],
      instructorRole: 'Language & Literature Specialist, Certificate A+',
      instructorBio: 'Master educator with 14 years of teaching excellence, mentoring hundreds of future philologists.'
    }
  }
};

/**
 * Localize module & lesson titles smoothly for the given language
 */
function localizeModules(modules: CourseModule[] | undefined, lang: SupportedLanguage): CourseModule[] {
  if (!modules || modules.length === 0) return [];
  if (lang === 'uz') return modules;

  return modules.map((mod, modIdx) => {
    let modTitle = mod.title;
    if (lang === 'ru') {
      modTitle = modTitle
        .replace(/(\d+)-Modul:/gi, '$1-й Модуль:')
        .replace(/Strategiyalari/gi, 'Стратегии')
        .replace(/Tricklari/gi, 'Секреты и лайфхаки')
        .replace(/Asoslari/gi, 'Основы')
        .replace(/Mahorati/gi, 'Мастерство')
        .replace(/Tahlili/gi, 'Анализ')
        .replace(/Kirish/gi, 'Введение');
    } else if (lang === 'en') {
      modTitle = modTitle
        .replace(/(\d+)-Modul:/gi, 'Module $1:')
        .replace(/Strategiyalari/gi, 'Strategies')
        .replace(/Tricklari/gi, 'Techniques & Hacks')
        .replace(/Asoslari/gi, 'Fundamentals')
        .replace(/Mahorati/gi, 'Mastery')
        .replace(/Tahlili/gi, 'Analysis')
        .replace(/Kirish/gi, 'Introduction');
    }

    const localizedLessons: Lesson[] = mod.lessons.map((lesson) => {
      let lTitle = lesson.title;
      let durationStr = lesson.duration || '30 min';

      if (lang === 'ru') {
        lTitle = lTitle
          .replace(/(\d+)-Dars:/gi, 'Урок $1:')
          .replace(/daqiqa/gi, 'минут');
        durationStr = durationStr.replace(/daqiqa/gi, 'мин');
      } else if (lang === 'en') {
        lTitle = lTitle
          .replace(/(\d+)-Dars:/gi, 'Lesson $1:')
          .replace(/daqiqa/gi, 'min');
        durationStr = durationStr.replace(/daqiqa/gi, 'min');
      }

      return {
        ...lesson,
        title: lTitle,
        duration: durationStr
      };
    });

    return {
      ...mod,
      title: modTitle,
      lessons: localizedLessons
    };
  });
}

/**
 * Get completely localized courses database based on selected platform language
 */
export function getLocalizedCourses(lang: SupportedLanguage, baseCourses: Course[] = COURSES_DATA): Course[] {
  if (lang === 'uz') return baseCourses;

  const loc = COURSES_LOCALIZATION[lang];
  if (!loc) return baseCourses;

  return baseCourses.map((c) => {
    const item = loc[c.id];
    if (!item) return c;

    return {
      ...c,
      title: item.title,
      shortDescription: item.shortDescription,
      description: item.description,
      fullDescription: item.description,
      level: item.level,
      badge: item.badge,
      highlights: item.highlights,
      instructor: {
        ...c.instructor,
        role: item.instructorRole,
        bio: item.instructorBio
      },
      duration: lang === 'ru' 
        ? (c.durationHours ? `${c.durationHours} ч.` : '36 ч.')
        : (c.durationHours ? `${c.durationHours} hrs` : '36 hrs'),
      price: lang === 'ru' ? 'Бесплатный доступ' : 'Free Access',
      modules: localizeModules(c.modules, lang)
    };
  });
}

/**
 * Localized categories configuration
 */
export function getLocalizedCategories(lang: SupportedLanguage) {
  if (lang === 'ru') {
    return [
      { id: 'all', label: 'Все направления', count: 17 },
      { id: 'languages', label: 'Иностранные языки (Английский, Русский, Французский, Немецкий)', count: 6 },
      { id: 'it', label: 'IT и Программирование', count: 4 },
      { id: 'exact_sciences', label: 'Точные науки (Математика, Физика)', count: 2 },
      { id: 'natural_sciences', label: 'Естественные науки (Химия, Биология, География)', count: 3 },
      { id: 'humanities', label: 'Социально-гуманитарные (История, Родной язык)', count: 2 },
    ];
  }
  if (lang === 'en') {
    return [
      { id: 'all', label: 'All Disciplines', count: 17 },
      { id: 'languages', label: 'Foreign Languages (English, Russian, French, German)', count: 6 },
      { id: 'it', label: 'IT & Programming', count: 4 },
      { id: 'exact_sciences', label: 'Exact Sciences (Mathematics, Physics)', count: 2 },
      { id: 'natural_sciences', label: 'Natural Sciences (Chemistry, Biology, Geography)', count: 3 },
      { id: 'humanities', label: 'Humanities & Social Sciences (History, Native Language)', count: 2 },
    ];
  }
  return [
    { id: 'all', label: 'Barcha Yoʻnalishlar', count: 17 },
    { id: 'languages', label: 'Xorijiy Tillar (Ingliz, Rus, Fransuz, Nemis)', count: 6 },
    { id: 'it', label: 'IT & Dasturlash', count: 4 },
    { id: 'exact_sciences', label: 'Aniq Fanlar (Matematika, Fizika)', count: 2 },
    { id: 'natural_sciences', label: 'Tabiiy Fanlar (Kimyo, Biologiya, Geografiya)', count: 3 },
    { id: 'humanities', label: 'Ijtimoiy-Gumanitar (Tarix, Ona Tili)', count: 2 },
  ];
}
