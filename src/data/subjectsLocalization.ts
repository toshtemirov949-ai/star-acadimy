import { SubjectInfo } from './subjectsData';
import { SUBJECTS_DATA } from './subjectsData';
import { SupportedLanguage } from '../context/LanguageContext';

export const SUBJECTS_LOCALIZATION: Record<'ru' | 'en', Record<string, Partial<SubjectInfo>>> = {
  ru: {
    matematika: {
      name: 'Математика',
      fullName: 'Математика: Алгебра, Геометрия и Математический Анализ',
      categoryName: 'Точные Науки',
      tagline: 'Царица всех точных наук и фундамент абстрактного логического мышления',
      description: 'Математика — фундаментальная наука о количествах, структурах, пространственных формах и закономерностях. Она систематизирует человеческое мышление и лежит в основе IT, инженерии и экономики.',
      importance: 'В современном мире математика является базой для нейросетей ИИ, алгоритмов криптографии, финансовой аналитики и космических расчетов.'
    },
    fizika: {
      name: 'Физика',
      fullName: 'Общая Физика: Механика, Электродинамика и Квантовая Теория',
      categoryName: 'Точные Науки',
      tagline: 'Фундаментальная наука, раскрывающая законы мироздания и природы',
      description: 'Физика изучает свойства материи, энергии, пространства и фундаментальных взаимодействий Вселенной — от субатомных частиц до космических галактик.',
      importance: 'Основа всей современной инженерии, электроники, полупроводников, лазерных технологий и аэрокосмических систем.'
    },
    kimyo: {
      name: 'Химия',
      fullName: 'Химия: Неорганическая, Органическая и Физическая Химия',
      categoryName: 'Естественные Науки',
      tagline: 'Наука о молекулярных превращениях, веществах и созидании материи',
      description: 'Химия исследует состав, строение, свойства веществ и процессы их превращений с изменением химических связей.',
      importance: 'Ключевая дисциплина для фармацевтики, синтеза лекарств, биотехнологий, экологии и материаловедения будущего.'
    },
    biologiya: {
      name: 'Биология',
      fullName: 'Общая Биология: Генетика, Молекулярная Биология и Анатомия',
      categoryName: 'Естественные Науки',
      tagline: 'Наука о жизни, живых организмах, биосфере и генетическом коде',
      description: 'Биология раскрывает тайны живой природы: от строения клетки и структуры ДНК до физиологии человека и эволюционных процессов.',
      importance: 'Фундамент современной медицины, генной инженерии, продления жизни и сохранения экосистем планеты.'
    },
    tarix: {
      name: 'История',
      fullName: 'Всемирная История и История Цивилизаций Востока',
      categoryName: 'Социально-Гуманитарные',
      tagline: 'Память человечества, уроки цивилизаций и мост в будущее',
      description: 'История анализирует развитие человеческого общества, эпохальные события, культуру, государственность и великие свершения предков.',
      importance: 'Формирует критическое мышление, национальное самосознание и понимание глобальных геополитических процессов.'
    },
    'ona-tili': {
      name: 'Родной Язык и Литература',
      fullName: 'Родной Язык, Филология и Классическая Литература',
      categoryName: 'Социально-Гуманитарные',
      tagline: 'Зеркало национальной идентичности, культура речи и богатство слова',
      description: 'Изучение грамматического строя, норм литературной речи, семантики текста и великого поэтического наследия классиков.',
      importance: 'Основа ораторского искусства, журналистики, медиа-коммуникаций и высокой интеллектуальной культуры.'
    },
    'ingliz-tili': {
      name: 'Английский Язык',
      fullName: 'Английский Язык: Международное Общение, IELTS и Академическое Письмо',
      categoryName: 'Иностранные Языки',
      tagline: 'Глобальный язык науки, бизнеса, технологий и международных возможностей',
      description: 'Освоение 4 ключевых навыков (Listening, Reading, Writing, Speaking) для свободного взаимодействия на международном уровне.',
      importance: 'Открывает двери в лучшие мировые университеты, международные корпорации и научные сообщества.'
    },
    'it-dasturlash': {
      name: 'IT и Программирование',
      fullName: 'IT, Разработка Программного Обеспечения и Архитектура Систем',
      categoryName: 'IT и Технологии',
      tagline: 'Инженерия цифрового века, автоматизация и создание будущего',
      description: 'Алгоритмы, веб-технологии, backend-архитектура, искусственный интеллект и кибербезопасность современных сервисов.',
      importance: 'Самая востребованная индустрия мировой экономики с неограниченными возможностями для инноваций.'
    }
  },
  en: {
    matematika: {
      name: 'Mathematics',
      fullName: 'Mathematics: Algebra, Geometry & Mathematical Analysis',
      categoryName: 'Exact Sciences',
      tagline: 'The Queen of Sciences and the foundation of abstract logical reasoning',
      description: 'Mathematics is the fundamental study of quantities, structures, spatial relationships, and change, driving all computing, physics, and economics.',
      importance: 'Essential for AI neural networks, cryptography, financial modeling, computer graphics, and aerospace engineering.'
    },
    fizika: {
      name: 'Physics',
      fullName: 'General Physics: Mechanics, Electrodynamics & Quantum Systems',
      categoryName: 'Exact Sciences',
      tagline: 'The fundamental science unlocking the laws of nature and the cosmos',
      description: 'Physics explores matter, energy, spacetime, and the fundamental forces governing everything from subatomic particles to galaxies.',
      importance: 'The bedrock of modern engineering, microchips, renewable energy, telecommunications, and space exploration.'
    },
    kimyo: {
      name: 'Chemistry',
      fullName: 'Chemistry: Inorganic, Organic & Physical Chemistry',
      categoryName: 'Natural Sciences',
      tagline: 'The central science of molecular transformation and matter creation',
      description: 'Chemistry examines the composition, structure, properties, and reactions of substances at the atomic and molecular scale.',
      importance: 'Pivotal for pharmaceuticals, novel materials, green biotechnology, and renewable energy storage.'
    },
    biologiya: {
      name: 'Biology',
      fullName: 'General Biology: Genetics, Molecular Biology & Anatomy',
      categoryName: 'Natural Sciences',
      tagline: 'The science of living organisms, cellular systems, and the genetic code',
      description: 'Biology investigates the mechanics of living organisms, DNA transcription, Mendelian inheritance, and human physiology.',
      importance: 'The foundation for healthcare, genetic engineering, immunology, and ecological conservation.'
    },
    tarix: {
      name: 'History',
      fullName: 'World History, Civilizations & Cultural Heritage',
      categoryName: 'Humanities & Social Sciences',
      tagline: 'The memory of humanity, lessons of civilizations, and roadmap to the future',
      description: 'History examines the evolution of human societies, cultural milestones, philosophical movements, and modern statehood.',
      importance: 'Fosters analytical thinking, contextual awareness, and deep understanding of contemporary world affairs.'
    },
    'ona-tili': {
      name: 'Language & Literature',
      fullName: 'Philology, Linguistics & Classical Literature',
      categoryName: 'Humanities & Social Sciences',
      tagline: 'The mirror of cultural identity, rhetoric, and literary excellence',
      description: 'Comprehensive study of grammar, syntax, textual analysis, and classical literary masterpieces.',
      importance: 'Vital for persuasion, media communication, journalism, and high intellectual literacy.'
    },
    'ingliz-tili': {
      name: 'English Language',
      fullName: 'English: Global Communication, IELTS & Academic Writing',
      categoryName: 'Foreign Languages',
      tagline: 'The universal language of global science, business, and technology',
      description: 'Mastering the 4 core skills (Listening, Reading, Writing, Speaking) for unrestricted international collaboration.',
      importance: 'Unlocks admission to top global universities, multinational careers, and international research.'
    },
    'it-dasturlash': {
      name: 'IT & Software Engineering',
      fullName: 'Software Development, System Architecture & AI',
      categoryName: 'IT & Technology',
      tagline: 'Digital engineering, automation, and shaping the future of technology',
      description: 'Coding algorithms, modern web development, cloud computing, neural networks, and cybersecurity.',
      importance: 'The highest-growth global industry powering global innovation and economic digital transformation.'
    }
  }
};

export function getLocalizedSubjects(lang: SupportedLanguage, baseSubjects: SubjectInfo[] = SUBJECTS_DATA): SubjectInfo[] {
  if (lang === 'uz') return baseSubjects;

  const loc = SUBJECTS_LOCALIZATION[lang];
  if (!loc) return baseSubjects;

  return baseSubjects.map((s) => {
    const patch = loc[s.id];
    if (!patch) return s;

    return {
      ...s,
      ...patch
    };
  });
}
