import React, { useState, useEffect } from 'react';
import { 
  X, User, ShieldCheck, Bell, Sliders, PlayCircle, 
  Check, Save, Eye, EyeOff, Laptop, Smartphone, Monitor,
  Trash2, Globe, Moon, Sun, CheckCircle2, AlertCircle,
  Camera, Lock, RefreshCw, Send, ChevronRight, Sparkles
} from 'lucide-react';
import { 
  FullUserSettings, 
  ActiveSession, 
  AppTheme, 
  AppLanguage, 
  VideoQuality 
} from '../types/settings';
import { 
  getStoredSettings, 
  saveStoredSettings, 
  changeStoredPassword, 
  getStoredActiveSessions, 
  terminateStoredSession 
} from '../utils/settingsStorage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  onUpdateUser?: (updated: UserProfile) => void;
  initialTab?: 'personal' | 'security' | 'notifications' | 'interface' | 'learning';
  showGlobalToast?: (msg: string) => void;
}

type SettingsTab = 'personal' | 'security' | 'notifications' | 'interface' | 'learning';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80'
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  initialTab = 'personal',
  showGlobalToast
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [settings, setSettings] = useState<FullUserSettings>(getStoredSettings());
  const [sessions, setSessions] = useState<ActiveSession[]>(getStoredActiveSessions());

  // Shaxsiy ma'lumotlar formasi
  const [firstName, setFirstName] = useState(settings.firstName);
  const [lastName, setLastName] = useState(settings.lastName);
  const [email, setEmail] = useState(settings.email);
  const [phone, setPhone] = useState(settings.phone);
  const [bio, setBio] = useState(settings.bio);
  const [avatarUrl, setAvatarUrl] = useState(settings.avatarUrl);

  // Xavfsizlik formasi
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Bildirishnomalar
  const [emailNotif, setEmailNotif] = useState(settings.emailNotifications);
  const [pushNotif, setPushNotif] = useState(settings.pushNotifications);
  const [telegramNotif, setTelegramNotif] = useState(settings.telegramNotifications);

  // Interfeys
  const [selectedTheme, setSelectedTheme] = useState<AppTheme>(isDarkMode ? 'dark' : 'light');
  const [selectedLang, setSelectedLang] = useState<AppLanguage>(language as AppLanguage);

  // O'quv jarayoni
  const [videoQuality, setVideoQuality] = useState<VideoQuality>(settings.videoQuality);
  const [autoplay, setAutoplay] = useState(settings.autoplay);

  // Modal ichki toast bildirishnomasi
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Escape tugmasi orqali yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Sozlamalarni yangilash va parollarni tozalash
  useEffect(() => {
    if (isOpen) {
      const fresh = getStoredSettings();
      setSettings(fresh);

      // Foydalanuvchi ma'lumotlarini sinxronlash (namuna emaillar ko'rinmasin)
      if (currentUser) {
        const parts = (currentUser.fullName || '').trim().split(/\s+/);
        setFirstName(parts[0] || '');
        setLastName(parts.slice(1).join(' ') || '');
        setEmail(currentUser.email || '');
        setPhone(currentUser.phone || '');
        setBio(currentUser.bio || '');
        setAvatarUrl(currentUser.avatar || fresh.avatarUrl || AVATAR_PRESETS[0]);
      } else {
        setFirstName(fresh.firstName || '');
        setLastName(fresh.lastName || '');
        setEmail(fresh.email || '');
        setPhone(fresh.phone || '');
        setBio(fresh.bio || '');
        setAvatarUrl(fresh.avatarUrl || AVATAR_PRESETS[0]);
      }

      // Parol maydonlarini mutlaqo tozalash (hech qachon eski yoki namuna parol turmasin)
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPass(false);
      setShowNewPass(false);
      setShowConfirmPass(false);
      setToast(null);

      setEmailNotif(fresh.emailNotifications);
      setPushNotif(fresh.pushNotifications);
      setTelegramNotif(fresh.telegramNotifications);
      setSelectedTheme(isDarkMode ? 'dark' : 'light');
      setSelectedLang(language as AppLanguage);
      setVideoQuality(fresh.videoQuality);
      setAutoplay(fresh.autoplay);
      setSessions(getStoredActiveSessions());
    }
  }, [isOpen, isDarkMode, language, currentUser]);

  if (!isOpen) return null;

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    if (showGlobalToast) showGlobalToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // 1. Shaxsiy ma'lumotlarni saqlash
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      showNotification('Iltimos, ismingizni kiriting', 'error');
      return;
    }

    const updated = saveStoredSettings({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
      avatarUrl
    });

    setSettings(updated);
    if (currentUser && onUpdateUser) {
      onUpdateUser({
        ...currentUser,
        fullName: `${firstName} ${lastName}`.trim(),
        email: email.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        avatar: avatarUrl
      });
    }

    showNotification('Shaxsiy maʼlumotlar muvaffaqiyatli saqlandi!');
  };

  // 2. Parolni o'zgartirish
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await changeStoredPassword({
      currentPassword,
      newPassword,
      confirmPassword
    });

    if (res.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showNotification(res.message, 'success');
    } else {
      showNotification(res.message, 'error');
    }
  };

  // Sessiyani tugatish
  const handleTerminateSession = (sessionId: string) => {
    const updated = terminateStoredSession(sessionId);
    setSessions(updated);
    showNotification('Sessiya muvaffaqiyatli yakunlandi va qurilma chiqarildi.');
  };

  // 3. Bildirishnomalarni saqlash
  const handleSaveNotifications = () => {
    const updated = saveStoredSettings({
      emailNotifications: emailNotif,
      pushNotifications: pushNotif,
      telegramNotifications: telegramNotif
    });
    setSettings(updated);
    showNotification('Bildirishnoma sozlamalari saqlandi!');
  };

  // 4. Interfeys sozlamalarini saqlash
  const handleSaveInterface = () => {
    // Theme sinxronlash
    if ((selectedTheme === 'dark' && !isDarkMode) || (selectedTheme === 'light' && isDarkMode)) {
      toggleDarkMode();
    }

    // Til sinxronlash
    if (selectedLang !== language) {
      setLanguage(selectedLang);
    }

    const updated = saveStoredSettings({
      theme: selectedTheme,
      language: selectedLang
    });
    setSettings(updated);
    showNotification('Interfeys va til sozlamalari yangilandi!');
  };

  // 5. O'quv jarayonini saqlash
  const handleSaveLearning = () => {
    const updated = saveStoredSettings({
      videoQuality,
      autoplay
    });
    setSettings(updated);
    showNotification('Oʻquv jarayoni parametrlari saqlandi!');
  };

  const navTabs = [
    { id: 'personal' as SettingsTab, label: 'Shaxsiy Maʼlumotlar', icon: User, color: 'from-blue-600 to-indigo-600' },
    { id: 'security' as SettingsTab, label: 'Xavfsizlik & Sessiyalar', icon: ShieldCheck, color: 'from-rose-500 to-pink-600' },
    { id: 'notifications' as SettingsTab, label: 'Bildirishnomalar', icon: Bell, color: 'from-amber-500 to-orange-600' },
    { id: 'interface' as SettingsTab, label: 'Interfeys & Til', icon: Sliders, color: 'from-emerald-500 to-teal-600' },
    { id: 'learning' as SettingsTab, label: 'Oʻquv Jarayoni', icon: PlayCircle, color: 'from-sky-500 to-blue-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Toast Notification Alert */}
      {toast && (
        <div className={`fixed top-6 right-6 z-60 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top-3 duration-300 ${
          toast.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-950/90 border-rose-500/40 text-rose-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Settings Modal Box */}
      <div className="relative w-full max-w-4xl bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[580px] max-h-[92vh]">
        
        {/* LEFT SIDEBAR (Tabs & User Profile Summary) */}
        <aside className="w-full md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-slate-200/70 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Sozlamalar
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    Ziyo Taʼlim v3.5
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Mini Banner */}
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
              <img
                src={avatarUrl}
                alt={firstName}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {firstName} {lastName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {email}
                </div>
              </div>
            </div>

            {/* Nav Tabs List */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Boʻlimlar
              </div>
              {navTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-0.5 opacity-100' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

          </div>

          {/* Quick Close Button for Sidebar */}
          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">PostgreSQL DB Ready</span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </aside>

        {/* RIGHT CONTENT STAGE */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-7">
          
          {/* Top Bar with Modal Close icon */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {navTabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeTab === 'personal' && 'Profil maʼlumotlari, ism-familiya va avatarni boshqarish'}
                {activeTab === 'security' && 'Maxfiy parol va faol ulangan qurilmalar (sessiyalar)'}
                {activeTab === 'notifications' && 'Email, Push va Telegram xabarnomalarini sozlash'}
                {activeTab === 'interface' && 'Dastur mavzusi (Dark/Light) va rasmiy tilni tanlash'}
                {activeTab === 'learning' && 'Video sifati va avtomatik dars ijrosini moslash'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              title="Yopish (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: SHAXSIY MA'LUMOTLAR */}
          {activeTab === 'personal' && (
            <form onSubmit={handleSavePersonalInfo} className="space-y-5 animate-in fade-in duration-200">
              {/* Avatar Tanlash */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Profil Avatari</span>
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt="Current"
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-indigo-500 shadow-md"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    {AVATAR_PRESETS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatarUrl(url)}
                        className={`w-9 h-9 rounded-xl overflow-hidden cursor-pointer transition-all ${
                          avatarUrl === url
                            ? 'ring-2 ring-indigo-600 scale-105'
                            : 'opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Inputlari */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Ism (First Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Oybekjon"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Familiya (Last Name)
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Adashev"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Elektron Pochta (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="adashevoybekjon@gmail.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Telefon Raqam (Phone)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Oʻzingiz haqingizda qisqacha (Bio)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Qiziqishlaringiz, maqsadlaringiz va oʻqiyotgan sohangiz..."
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 ml-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Oʻzgarishlarni Saqlash</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: XAVFSIZLIK & PAROL */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Parolni o'zgartirish formasi */}
              <form onSubmit={handlePasswordChange} className="space-y-4 p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200/50 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Lock className="w-4 h-4 text-rose-500" />
                  <span>Parolni Yangilash</span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Joriy Parol
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3.5 py-2 pr-10 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Yangi Parol
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3.5 py-2 pr-10 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Kamida 6 ta belgi"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Parolni Tasdiqlang
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPass ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3.5 py-2 pr-10 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Parolni qayta kiriting"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Yangi Parolni Oʻrnatish
                  </button>
                </div>
              </form>

              {/* Faol Sessiyalar Ro'yxati (Active Devices) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Faol Qurilmalar va Sessiyalar ({sessions.length})</span>
                  </h4>
                </div>

                <div className="rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden text-xs">
                  {sessions.map((sess) => (
                    <div key={sess.id} className="p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          sess.isCurrent ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {sess.deviceName.toLowerCase().includes('iphone') || sess.deviceName.toLowerCase().includes('phone') ? (
                            <Smartphone className="w-4 h-4" />
                          ) : (
                            <Monitor className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{sess.deviceName}</span>
                            {sess.isCurrent && (
                              <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[9px] font-bold">
                                Joriy Qurilma
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {sess.browser} · IP: {sess.ipAddress} · {sess.location}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Oxirgi faollik: {sess.lastActive}
                          </div>
                        </div>
                      </div>

                      {!sess.isCurrent && (
                        <button
                          type="button"
                          onClick={() => handleTerminateSession(sess.id)}
                          className="px-2.5 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                          Chiqarish
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BILDIRISHNOMALAR */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                
                {/* 1. Email bildirishnomalari */}
                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Elektron Pochta (Email) Xabarnomalari
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Yangi kurslar, sertifikat tasdiqlari va muhim haftalik hisobotlarni emailga yuborish
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEmailNotif(!emailNotif)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 flex items-center ${
                      emailNotif ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                  </button>
                </div>

                {/* 2. Push bildirishnomalari */}
                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Brauzer va Push Bildirishnomalar
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Kunlik streak (uzluksiz oʻrganish) eslatmalari va dars taymer signallari
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPushNotif(!pushNotif)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 flex items-center ${
                      pushNotif ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                  </button>
                </div>

                {/* 3. Telegram bildirishnomalari */}
                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Telegram Bot Xabarnomalari
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        @ZiyoTalimBot orqali yangi topshiriqlar va test natijalarini toʻgʻridan-toʻgʻri Telegramga olish
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTelegramNotif(!telegramNotif)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 flex items-center ${
                      telegramNotif ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                  </button>
                </div>

              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ml-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Oʻzgarishlarni Saqlash</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: INTERFEYS & TIL */}
          {activeTab === 'interface' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Mavzu (Theme) Sozlamasi */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Dastur Mavzusi (Theme)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTheme('light')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                      selectedTheme === 'light'
                        ? 'bg-white dark:bg-slate-800 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                        : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Kunduzgi rejim</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Yorugʻ va toza koʻrinish</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTheme('dark')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                      selectedTheme === 'dark'
                        ? 'bg-white dark:bg-slate-800 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                        : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Tungi rejim</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Koʻzlarni charchatmaydi</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dastur Tili (Language) */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Dastur Tili (Platform Language)</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { code: 'uz' as AppLanguage, label: 'Oʻzbekcha', sub: 'Oʻzbek tili', flag: '🇺🇿' },
                    { code: 'ru' as AppLanguage, label: 'Русский', sub: 'Русский язык', flag: '🇷🇺' },
                    { code: 'en' as AppLanguage, label: 'English', sub: 'Global English', flag: '🇬🇧' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setSelectedLang(l.code)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        selectedLang === l.code
                          ? 'bg-white dark:bg-slate-800 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                          : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white'
                      }`}
                    >
                      <span className="text-xl mb-1">{l.flag}</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{l.label}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{l.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleSaveInterface}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ml-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Oʻzgarishlarni Saqlash</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 5: O'QUV JARAYONI */}
          {activeTab === 'learning' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Standart Video Sifati */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Darslar Videopleyeri Standart Sifati
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { value: '1080p' as VideoQuality, label: '1080p Full HD', desc: 'Eng yuqori tiniqlik' },
                    { value: '720p' as VideoQuality, label: '720p HD', desc: 'Trafik tejovchi rejim' },
                    { value: 'auto' as VideoQuality, label: 'Auto (Avtomatik)', desc: 'Internet tezligiga mos' }
                  ].map((q) => (
                    <button
                      key={q.value}
                      type="button"
                      onClick={() => setVideoQuality(q.value)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        videoQuality === q.value
                          ? 'bg-white dark:bg-slate-800 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                          : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">{q.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{q.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Avtomatik ijro parametri */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Avtomatik Ijro (Autoplay)
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Dars ochilganda video hamda yangi soʻz ochilganda audio talaffuz avtomatik ijro etilsin
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAutoplay(!autoplay)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 flex items-center ${
                    autoplay ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                </button>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleSaveLearning}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ml-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Oʻzgarishlarni Saqlash</span>
                </button>
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
};
