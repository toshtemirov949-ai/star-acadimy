import React, { useState } from 'react';
import { 
  Globe2, Volume2, ArrowRight, Languages, VolumeX, Sparkles,
  CheckCircle2, Play, Music, Mic, HelpCircle, Palette
} from 'lucide-react';
import { LanguageType } from '../types';
import { LANGUAGES_INFO } from '../data/languagesLabData';
import { playFemaleSpeech, stopAllSpeech, getPhoneticSpokenText } from '../utils/femaleVoiceService';
import { useLanguage } from '../context/LanguageContext';

interface LanguageHubSpotlightProps {
  onOpenLanguageLabWith: (lang: LanguageType) => void;
  onFilterLanguage: (lang: string) => void;
  onOpenTranslator?: () => void;
}

// Exact modules, authentic native pronunciation, and IPA phonetic transcriptions
interface LanguageCardDetail {
  id: LanguageType;
  title: string;
  flag: string;
  studentCount: string;
  description: string;
  accentLabel: string;
  fullSpokenSample: string;
  sampleTranslation: string;
  modules: Array<{
    title: string;
    phoneticSpoken: string;
    ipa: string;
    uzDesc: string;
  }>;
  keyWords: Array<{
    word: string;
    ipa: string;
    translation: string;
    spokenText?: string;
  }>;
}

// Side-border dynamic color palettes for interactive color shifting on click
const LANGUAGE_SIDE_PALETTES: Record<LanguageType, {
  name: string;
  cardBorders: string[];      // Rotates on click
  activeBadge: string;
  activeRing: string;
  activeBg: string;
  moduleBorderPalette: string[];
  wordBorderPalette: string[];
}> = {
  english: {
    name: 'Ingliz Tili',
    cardBorders: [
      'border-l-indigo-500',
      'border-l-blue-500',
      'border-l-sky-400',
      'border-l-violet-500',
      'border-l-emerald-500'
    ],
    activeBadge: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    activeRing: 'ring-2 ring-indigo-400/30',
    activeBg: 'bg-indigo-50/25 dark:bg-indigo-950/20',
    moduleBorderPalette: ['border-l-indigo-500', 'border-l-blue-400', 'border-l-emerald-400'],
    wordBorderPalette: [
      'border-l-indigo-400',
      'border-l-blue-400',
      'border-l-cyan-400',
      'border-l-emerald-400',
      'border-l-violet-400'
    ]
  },
  russian: {
    name: 'Rus Tili',
    cardBorders: [
      'border-l-rose-500',
      'border-l-red-500',
      'border-l-amber-500',
      'border-l-pink-500',
      'border-l-purple-500'
    ],
    activeBadge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    activeRing: 'ring-2 ring-rose-400/30',
    activeBg: 'bg-rose-50/25 dark:bg-rose-950/20',
    moduleBorderPalette: ['border-l-rose-500', 'border-l-red-400', 'border-l-amber-400'],
    wordBorderPalette: [
      'border-l-rose-400',
      'border-l-red-400',
      'border-l-amber-400',
      'border-l-orange-400',
      'border-l-fuchsia-400'
    ]
  },
  french: {
    name: 'Fransuz Tili',
    cardBorders: [
      'border-l-sky-500',
      'border-l-cyan-500',
      'border-l-teal-500',
      'border-l-blue-500',
      'border-l-violet-500'
    ],
    activeBadge: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    activeRing: 'ring-2 ring-sky-400/30',
    activeBg: 'bg-sky-50/25 dark:bg-sky-950/20',
    moduleBorderPalette: ['border-l-sky-500', 'border-l-cyan-400', 'border-l-teal-400'],
    wordBorderPalette: [
      'border-l-sky-400',
      'border-l-cyan-400',
      'border-l-teal-400',
      'border-l-blue-400',
      'border-l-indigo-400'
    ]
  },
  german: {
    name: 'Nemis Tili',
    cardBorders: [
      'border-l-amber-500',
      'border-l-emerald-500',
      'border-l-yellow-500',
      'border-l-lime-500',
      'border-l-orange-500'
    ],
    activeBadge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    activeRing: 'ring-2 ring-amber-400/30',
    activeBg: 'bg-amber-50/25 dark:bg-amber-950/20',
    moduleBorderPalette: ['border-l-amber-500', 'border-l-emerald-400', 'border-l-lime-400'],
    wordBorderPalette: [
      'border-l-amber-400',
      'border-l-emerald-400',
      'border-l-yellow-400',
      'border-l-lime-400',
      'border-l-orange-400'
    ]
  }
};

const LANGUAGES_DATA: Record<LanguageType, LanguageCardDetail> = {
  english: {
    id: 'english',
    title: 'Ingliz Tili',
    flag: '🇬🇧',
    studentCount: '8,400+ talaba',
    description: 'Xalqaro muloqot, IELTS, biznes, IT va global taʼlim tili.',
    accentLabel: 'Oxford / American Native Phonetics',
    fullSpokenSample: 'Welcome to English! Learn genuine native pronunciation, natural cadence, and sound like a fluent speaker.',
    sampleTranslation: 'Ingliz tiliga xush kelibsiz! Haqiqiy mahalliy talaffuz, tabiiy urgʻu va ravon soʻzlashuvni oʻrganing.',
    modules: [
      {
        title: 'IELTS Speaking 7.5+',
        phoneticSpoken: 'IELTS Speaking, band seven point five and above',
        ipa: '[ˈaɪ.ɛlts ˈspiː.kɪŋ]',
        uzDesc: 'Fluency & Lexical Resource'
      },
      {
        title: 'Academic Writing',
        phoneticSpoken: 'Academic Writing',
        ipa: '[ˌæk.əˈdɛm.ɪk ˈraɪ.tɪŋ]',
        uzDesc: 'Task 1 & Task 2 insho'
      },
      {
        title: 'Business English',
        phoneticSpoken: 'Business English',
        ipa: '[ˈbɪz.nɪs ˈɪŋ.ɡlɪʃ]',
        uzDesc: 'Muzokara va taqdimot'
      }
    ],
    keyWords: [
      { word: 'Fluency', ipa: '/ˈfluː.ən.si/', translation: 'Ravonlik' },
      { word: 'Pronunciation', ipa: '/prəˌnʌn.siˈeɪ.ʃən/', translation: 'Talaffuz' },
      { word: 'Knowledge', ipa: '/ˈnɒl.ɪdʒ/', translation: 'Bilim' },
      { word: 'Opportunity', ipa: '/ˌɒp.əˈtjuː.nə.ti/', translation: 'Imkoniyat' }
    ]
  },
  russian: {
    id: 'russian',
    title: 'Rus Tili',
    flag: '🇷🇺',
    studentCount: '6,200+ talaba',
    description: 'MDH hududida erkin soʻzlashuv, oliy taʼlim, savdo va ishbilarmonlik tili.',
    accentLabel: 'Чистая русская литературная речь',
    fullSpokenSample: 'Здравствуйте! Русский язык — это язык богатой литературы, науки и свободного общения. Говорите красиво и чётко.',
    sampleTranslation: 'Assalomu alaykum! Rus tili — boy adabiyot, ilm-fan va erkin muloqot tilidir. Chiroyli va aniq talaffuz qiling.',
    modules: [
      {
        title: 'Разговорная речь',
        phoneticSpoken: 'Разговорная речь',
        ipa: '[rəzɡɐˈvornəjə rʲetɕ]',
        uzDesc: 'Kundalik erkin muloqot'
      },
      {
        title: '6 падежей',
        phoneticSpoken: 'Шесть падежей русского языка',
        ipa: '[ʂɛsʲtʲ pɐdʲɪˈʐɛj]',
        uzDesc: 'Kelishiklar va toʻgʻri qoʻllash'
      },
      {
        title: 'Деловая переписка',
        phoneticSpoken: 'Деловая переписка',
        ipa: '[dʲɪlɐˈvajə pʲɪrʲɪˈpʲiskə]',
        uzDesc: 'Rasmiy hujjatlar & biznes'
      }
    ],
    keyWords: [
      { word: 'Здравствуйте', ipa: '/ˈzdrastvujtʲe/', translation: 'Salom / Assalomu alaykum' },
      { word: 'Великолепно', ipa: '/vʲɪlʲɪkɐˈlʲepnə/', translation: 'Ajoyib / Mukammal' },
      { word: 'Образование', ipa: '/əbrəzɐˈvanʲɪjə/', translation: 'Taʼlim' },
      { word: 'Произношение', ipa: '/prəɪznɐˈʂɛnʲɪjə/', translation: 'Talaffuz' }
    ]
  },
  french: {
    id: 'french',
    title: 'Fransuz Tili',
    flag: '🇫🇷',
    studentCount: '2,800+ talaba',
    description: 'Diplomatiya, Yevropa Ittifoqi, moda, madaniyat va sayohat tili.',
    accentLabel: 'Prononciation parisienne authentique',
    fullSpokenSample: 'Bonjour et bienvenue! La langue française est la langue de la diplomatie et de l’élégance. Écoutez la vraie prononciation.',
    sampleTranslation: 'Salom va xush kelibsiz! Fransuz tili — diplomatiya va nafosat tilidir. Haqiqiy toza talaffuzni tinglang.',
    modules: [
      {
        title: 'Prononciation & R',
        phoneticSpoken: 'La prononciation française et le son R',
        ipa: '[pʁɔ.nɔ̃.sja.sjɔ̃ e lə sɔ̃ ɛʁ]',
        uzDesc: 'Boʻgʻizdagi R va nazal tovushlar'
      },
      {
        title: 'DELF A1-B2',
        phoneticSpoken: 'Diplôme DELF, de A un à B deux',
        ipa: '[dɛlf a œ̃ a be dø]',
        uzDesc: 'Xalqaro sertifikat imtihoni'
      },
      {
        title: 'Voyage en France',
        phoneticSpoken: 'Voyage en France',
        ipa: '[vwa.jaʒ ɑ̃ fʁɑ̃s]',
        uzDesc: 'Sayohat & Parijda muloqot'
      }
    ],
    keyWords: [
      { word: 'Bonjour', ipa: '/bɔ̃.ʒuʁ/', translation: 'Salom / Xayrli tong' },
      { word: 'Enchanté', ipa: '/ɑ̃.ʃɑ̃.te/', translation: 'Tanishganimdan xursandman' },
      { word: 'Élégance', ipa: '/e.le.ɡɑ̃s/', translation: 'Nafosat / Goʻzallik' },
      { word: 'Merci beaucoup', ipa: '/mɛʁ.si bo.ku/', translation: 'Katta rahmat' }
    ]
  },
  german: {
    id: 'german',
    title: 'Nemis Tili',
    flag: '🇩🇪',
    studentCount: '3,900+ talaba',
    description: 'Germaniyada bepul oliy taʼlim (DAAD), Ausbildung va muhandislik tili.',
    accentLabel: 'Klares Standard-Hochdeutsch',
    fullSpokenSample: 'Guten Tag und herzlich willkommen! Deutsch ist die Sprache der Wissenschaft und der Technik. Wir sprechen ganz deutlich.',
    sampleTranslation: 'Xayrli kun va xush kelibsiz! Nemis tili — ilm-fan va texnika tilidir. Biz har bir soʻzni juda aniq talaffuz qilamiz.',
    modules: [
      {
        title: 'Goethe A1-B2',
        phoneticSpoken: 'Goethe Zertifikat, A eins bis B zwei',
        ipa: '[ˈɡøːtə tsɛʁtifiˈkaːt]',
        uzDesc: 'Gyote instituti sertifikati'
      },
      {
        title: 'Satzbau & Grammatik',
        phoneticSpoken: 'Der Satzbau und die Grammatik',
        ipa: '[ˈzats.baʊ̯ ʊnt ɡʁaˈmatɪk]',
        uzDesc: 'Gap qurilishi & grammatika'
      },
      {
        title: 'TestDaF Vorbereitung',
        phoneticSpoken: 'TestDaF Vorbereitung',
        ipa: '[tɛst daf ˈfoːɐ̯bəˌʁaɪ̯tʊŋ]',
        uzDesc: 'Universitetga kirish imtihoni'
      }
    ],
    keyWords: [
      { word: 'Willkommen', ipa: '/vɪlˈkɔmən/', translation: 'Xush kelibsiz' },
      { word: 'Ausbildung', ipa: '/ˈaʊ̯sˌbɪldʊŋ/', translation: 'Kasbiy taʼlim' },
      { word: 'Ausgezeichnet', ipa: '/ˈaʊ̯sɡəˌtsaɪ̯çnət/', translation: 'Aʼlo darajada' },
      { word: 'Entwicklung', ipa: '/ɛntˈvɪklʊŋ/', translation: 'Rivojlanish / Taraqqiyot' }
    ]
  }
};

export const LanguageHubSpotlight: React.FC<LanguageHubSpotlightProps> = ({
  onOpenLanguageLabWith,
  onFilterLanguage,
  onOpenTranslator,
}) => {
  const { language, t } = useLanguage();
  
  // Audio playback tracking
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [activePlayingText, setActivePlayingText] = useState<string | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85); // Natural educational clarity

  // Selected language for expanded pronunciation workbench
  const [selectedPronounceLang, setSelectedPronounceLang] = useState<LanguageType>('english');

  // Dynamic side border colors: clicking changes the side line's color!
  // Card side border index per language
  const [cardColorIndices, setCardColorIndices] = useState<Record<LanguageType, number>>({
    english: 0,
    russian: 0,
    french: 0,
    german: 0,
  });

  // Dynamic word side border color indices (wordIndex -> color palette index)
  const [wordColorIndices, setWordColorIndices] = useState<Record<number, number>>({
    0: 0,
    1: 1,
    2: 2,
    3: 3,
  });

  // Dynamic module side border color tracking
  const [activeModuleKey, setActiveModuleKey] = useState<string | null>(null);

  // Handle card click: selects language AND rotates/changes side border color!
  const handleCardClick = (langId: LanguageType) => {
    setSelectedPronounceLang(langId);
    setCardColorIndices(prev => {
      const currentIdx = prev[langId] || 0;
      const paletteLength = LANGUAGE_SIDE_PALETTES[langId].cardBorders.length;
      return {
        ...prev,
        [langId]: (currentIdx + 1) % paletteLength
      };
    });
  };

  // Handle word click: plays pronunciation AND rotates its side border color!
  const handleWordClick = (wordIndex: number, textToSpeak: string, kwKey: string) => {
    // Rotate word side border color
    setWordColorIndices(prev => {
      const cur = prev[wordIndex] ?? wordIndex;
      const paletteLength = LANGUAGE_SIDE_PALETTES[selectedPronounceLang].wordBorderPalette.length;
      return {
        ...prev,
        [wordIndex]: (cur + 1) % paletteLength
      };
    });

    handlePlayPronunciation(textToSpeak, selectedPronounceLang, kwKey);
  };

  const handlePlayPronunciation = (
    textToSpeak: string, 
    langId: LanguageType, 
    speechKey: string,
    speed?: number
  ) => {
    if (activeSpeechId === speechKey) {
      stopAllSpeech();
      setActiveSpeechId(null);
      setActivePlayingText(null);
      return;
    }

    stopAllSpeech();
    setActiveSpeechId(speechKey);
    setActivePlayingText(textToSpeak);

    playFemaleSpeech({
      text: textToSpeak,
      lang: langId,
      rate: speed || speechSpeed,
      pitch: 1.0,
      onStart: () => {
        setActiveSpeechId(speechKey);
        setActivePlayingText(textToSpeak);
      },
      onEnd: () => {
        setActiveSpeechId(null);
        setActivePlayingText(null);
      },
      onError: () => {
        setActiveSpeechId(null);
        setActivePlayingText(null);
      }
    });
  };

  const currentDetail = LANGUAGES_DATA[selectedPronounceLang];
  const currentPalette = LANGUAGE_SIDE_PALETTES[selectedPronounceLang];

  return (
    <section className="py-5 sm:py-6 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Xorijiy Tillar & Native Talaffuz Markazi</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                <span>Tabiiy Fonetik Talaffuz AI</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Ingliz, Rus, Fransuz va Nemis Tillari
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl">
              Har bir til boʻyicha noldan boshlab xalqaro sertifikatlar (IELTS, TRKI, DELF, Goethe) gacha toʻliq oʻquv tizimi
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto shrink-0">
            {onOpenTranslator && (
              <button
                type="button"
                onClick={onOpenTranslator}
                className="px-2.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>10 Tilli Real Tarjimon</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                stopAllSpeech();
                onOpenLanguageLabWith(selectedPronounceLang);
              }}
              className="px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-lg transition-all cursor-pointer flex items-center gap-1 border border-slate-200 dark:border-slate-700 active:scale-95 shadow-2xs"
            >
              <span>Til Laboratoriyasi</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>

        {/* 4 Languages Main Interactive Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {(Object.keys(LANGUAGES_DATA) as LanguageType[]).map((langId) => {
            const lang = LANGUAGES_DATA[langId];
            const palette = LANGUAGE_SIDE_PALETTES[langId];
            const isCardSamplePlaying = activeSpeechId === `${lang.id}-sample`;
            const isCardSelected = selectedPronounceLang === lang.id;
            const currentBorderColor = palette.cardBorders[cardColorIndices[langId] || 0];

            return (
              <div
                key={lang.id}
                onClick={() => handleCardClick(lang.id)}
                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer border-l-[3.5px] ${
                  isCardSelected
                    ? `${currentBorderColor} ${palette.activeRing} ${palette.activeBg} border-slate-300 dark:border-slate-700 shadow-sm`
                    : `border-l-slate-300 dark:border-l-slate-700 hover:${currentBorderColor} border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850 hover:shadow-2xs`
                }`}
                title="Tanlash va yon chiziq rangini almashtirish uchun bosing"
              >
                <div>
                  {/* Top Bar with Flag, Students & Audio Live Preview */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl drop-shadow-xs">{lang.flag}</span>
                      <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                        {lang.studentCount}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPronunciation(lang.fullSpokenSample, lang.id, `${lang.id}-sample`);
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                          isCardSamplePlaying
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/60'
                        }`}
                        title={isCardSamplePlaying ? "Toʻxtatish" : "Toza jonli talaffuz namunasini tinglash"}
                      >
                        {isCardSamplePlaying ? <VolumeX className="w-2.5 h-2.5 fill-white" /> : <Volume2 className="w-2.5 h-2.5" />}
                        <span>{isCardSamplePlaying ? "Toʻxtatish" : "Jonli Ovoz"}</span>
                      </button>

                      {/* Small visual indicator showing side border can be rotated */}
                      <span 
                        className={`w-2 h-2 rounded-full transition-all ${
                          isCardSelected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
                        }`} 
                        title="Faol holat" 
                      />
                    </div>
                  </div>

                  {/* Title & Accent label */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {lang.title}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPronunciation(lang.title, lang.id, `${lang.id}-title`);
                        }}
                        className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                        title="Til nomini talaffuz qilish"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/50 dark:border-blue-900/40">
                      {lang.accentLabel}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {lang.description}
                  </p>

                  {/* Asosiy Modullar with dynamic side line color! */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                      <span>Asosiy modullar (Talaffuz uchun bosing):</span>
                      <Volume2 className="w-2.5 h-2.5 text-blue-500" />
                    </div>

                    <div className="space-y-1">
                      {lang.modules.map((mod, idx) => {
                        const modKey = `${lang.id}-mod-${idx}`;
                        const isModPlaying = activeSpeechId === modKey;
                        const modSideBorder = palette.moduleBorderPalette[idx % palette.moduleBorderPalette.length];

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModuleKey(modKey);
                              handlePlayPronunciation(mod.phoneticSpoken, lang.id, modKey);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer border-l-[3px] ${
                              isModPlaying
                                ? `bg-blue-600 text-white border-blue-600 ${modSideBorder} shadow-2xs`
                                : `bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80 ${
                                    activeModuleKey === modKey ? modSideBorder : 'border-l-slate-300 dark:border-l-slate-600'
                                  } hover:border-l-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/30`
                            }`}
                            title={`"${mod.title}" talaffuzini eshitish`}
                          >
                            <div className="min-w-0 pr-1.5 flex-1">
                              <div className="flex items-center gap-1">
                                <span className="font-bold truncate text-[11px]">{mod.title}</span>
                                <span className={`text-[9px] font-mono shrink-0 ${isModPlaying ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                                  {mod.ipa}
                                </span>
                              </div>
                              <span className={`text-[9px] block truncate ${isModPlaying ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                {mod.uzDesc}
                              </span>
                            </div>

                            <div className={`p-1 rounded shrink-0 ${isModPlaying ? 'bg-white/20' : 'text-blue-600 dark:text-blue-400'}`}>
                              {isModPlaying ? (
                                <span className="flex items-end gap-0.5 h-2.5">
                                  <span className="w-0.5 h-1.5 bg-white animate-pulse" />
                                  <span className="w-0.5 h-2.5 bg-white animate-pulse delay-75" />
                                  <span className="w-0.5 h-2 bg-white animate-pulse delay-150" />
                                </span>
                              ) : (
                                <Volume2 className="w-3 h-3" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stopAllSpeech();
                      onOpenLanguageLabWith(lang.id);
                    }}
                    className="flex-1 py-1.5 px-2 text-[11px] font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs active:scale-95"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Mashq Qilish</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterLanguage(lang.id);
                    }}
                    className="py-1.5 px-2 text-[11px] font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 active:scale-95"
                  >
                    Kurslar
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* COMPACT & CREATIVE INTERACTIVE PRONUNCIATION LAB WORKBENCH */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-slate-900 via-[#0a1e38] to-slate-900 text-white border border-blue-900/50 shadow-md space-y-3">
          
          {/* Header Row with Flag, Language Selector & Speed */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentDetail.flag}</span>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-black text-white">
                    {currentDetail.title} — Soʻzlar & Fonetik Talaffuz Laboratoriyasi
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Haqiqiy Native Audio
                  </span>
                </div>
                <p className="text-[10px] text-blue-200/80 mt-0.5">
                  Harflarni shunchaki oʻqib bermasdan, haqiqiy til egalariga xos talaffuz va intonatsiya bilan tinglang.
                </p>
              </div>
            </div>

            {/* Quick Language Switcher Tabs & Speed Controls */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
              {/* Quick Tab Switcher */}
              <div className="flex items-center bg-white/10 p-0.5 rounded-lg border border-white/15 text-[10px]">
                {(Object.keys(LANGUAGES_DATA) as LanguageType[]).map((lId) => (
                  <button
                    key={lId}
                    type="button"
                    onClick={() => handleCardClick(lId)}
                    className={`px-1.5 py-0.5 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      selectedPronounceLang === lId
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{LANGUAGES_DATA[lId].flag}</span>
                    <span className="hidden sm:inline">{LANGUAGES_DATA[lId].title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Speed Control Pill */}
              <div className="flex items-center bg-white/10 p-0.5 rounded-lg border border-white/15 text-[10px]">
                <span className="text-slate-400 px-1 font-medium">Tezlik:</span>
                <button
                  type="button"
                  onClick={() => setSpeechSpeed(0.72)}
                  className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    speechSpeed < 0.8 ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  0.75x
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechSpeed(0.88)}
                  className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    speechSpeed >= 0.8 ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  1.0x
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Word Cards with Dynamic Side Border Colors on Click! */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentDetail.keyWords.map((kw, idx) => {
              const kwKey = `${currentDetail.id}-kw-${idx}`;
              const isKwPlaying = activeSpeechId === kwKey;
              
              // Dynamic left border color for this word card!
              const colorIdx = wordColorIndices[idx] ?? idx;
              const sideBorderColor = currentPalette.wordBorderPalette[colorIdx % currentPalette.wordBorderPalette.length];

              return (
                <div
                  key={idx}
                  onClick={() => handleWordClick(idx, kw.spokenText || kw.word, kwKey)}
                  className={`p-2.5 rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer border-l-3 ${sideBorderColor} ${
                    isKwPlaying
                      ? 'bg-blue-600/35 border-blue-400/80 shadow-md ring-1 ring-blue-400/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                  title={`"${kw.word}" talaffuzi. Yon chiziq rangini oʻzgartirish uchun bosing`}
                >
                  <div className="min-w-0 pr-1.5 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-black text-xs text-white tracking-wide truncate">
                        {kw.word}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 font-medium block">
                      {kw.ipa}
                    </span>
                    <span className="text-[9px] text-blue-200/80 block truncate mt-0.5">
                      {kw.translation}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWordClick(idx, kw.spokenText || kw.word, kwKey);
                    }}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                      isKwPlaying
                        ? 'bg-blue-500 text-white shadow-xs animate-pulse'
                        : 'bg-white/10 hover:bg-blue-600 text-white'
                    }`}
                    title={`"${kw.word}" talaffuzini tinglash`}
                  >
                    {isKwPlaying ? (
                      <span className="flex items-end gap-0.5 h-2.5">
                        <span className="w-0.5 h-1.5 bg-white animate-pulse" />
                        <span className="w-0.5 h-2.5 bg-white animate-pulse delay-75" />
                        <span className="w-0.5 h-1 bg-white animate-pulse delay-150" />
                      </span>
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Speaking Status Footer */}
          {activeSpeechId && activePlayingText && (
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-between gap-2 text-xs animate-in fade-in">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="text-blue-200 font-semibold shrink-0 text-[11px]">Talaffuz qilinmoqda:</span>
                <span className="font-bold text-white font-mono truncate text-[11px]">"{activePlayingText}"</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopAllSpeech();
                  setActiveSpeechId(null);
                  setActivePlayingText(null);
                }}
                className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold cursor-pointer shrink-0"
              >
                Toʻxtatish
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
