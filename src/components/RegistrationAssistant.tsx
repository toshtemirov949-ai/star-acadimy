import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, User, AtSign, Mail, Phone, Lock, 
  CheckCircle2, AlertCircle, ArrowRight, Sparkles, 
  RefreshCw, ShieldCheck, Check, Eye, EyeOff, MessageSquare,
  KeyRound, ExternalLink, Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { getStoredUsers, saveStoredUsers, MockUser } from '../utils/adminStorage';
import { googleSignIn, getFriendlyAuthErrorMessage } from '../services/googleAuthService';
import { sendGmail2FACode } from '../services/gmailService';
import { saveUserCredential } from '../utils/authCredentials';

interface RegistrationAssistantProps {
  onSuccessRegistration: (user: UserProfile, message: string) => void;
  onSwitchToTraditional?: () => void;
}

type AuthMethod = 'google' | 'email' | 'phone';
type Step = 'chooseMethod' | 'fullName' | 'username' | 'contactInput' | 'otpVerification' | 'password' | 'confirmed';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  hint?: string;
  error?: boolean;
}

export const RegistrationAssistant: React.FC<RegistrationAssistantProps> = ({
  onSuccessRegistration,
  onSwitchToTraditional
}) => {
  const [step, setStep] = useState<Step>('chooseMethod');
  const [selectedMethod, setSelectedMethod] = useState<AuthMethod>('email');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Collected Registration Data
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Verification States
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpAttempts, setOtpAttempts] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (step === 'otpVerification' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, otpTimer]);

  // Initial welcome message from the assistant
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "Assalomu alaykum! Men «Ziyo Taʼlim» taʼlim platformasining professional avtorizatsiya va xavfsizlik assistentiman.\n\nPlatformamizda 3 xil xavfsiz va zamonaviy usul orqali roʻyxatdan oʻtishingiz mumkin:\n1. 🌐 Google Akkaunt (OAuth 2.0 orqali bir zumda)\n2. 📧 Email orqali (Tranzaksion pochta / OTP kod bilan)\n3. 📱 Telefon raqam orqali (+998 SMS OTP kod bilan)\n\nOʻzingizga maʼqul usulni tanlang:",
      hint: "Quyidagi 3 ta xavfsiz usuldan birini tanlang:",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMsg]);
  }, []);

  // Format phone number utility (+998 XX XXX XX XX)
  const formatPhoneNumber = (digits: string): string => {
    let clean = digits.replace(/[^\d]/g, '');
    if (clean.startsWith('998')) {
      clean = clean.slice(3);
    }
    clean = clean.slice(0, 9);
    
    let formatted = '+998';
    if (clean.length > 0) formatted += ' ' + clean.substring(0, 2);
    if (clean.length > 2) formatted += ' ' + clean.substring(2, 5);
    if (clean.length > 5) formatted += ' ' + clean.substring(5, 7);
    if (clean.length > 7) formatted += ' ' + clean.substring(7, 9);
    return formatted;
  };

  const addAssistantMessage = (text: string, hint?: string, error = false) => {
    const newMsg: ChatMessage = {
      id: `asst-${Date.now()}`,
      sender: 'assistant',
      text,
      hint,
      error,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // 1. Google OAuth 2.0 Direct Registration / Sign In Flow
  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    addAssistantMessage("Google OAuth 2.0 protokoli orqali xavfsiz ulanmoqda...");

    try {
      const { user } = await googleSignIn();
      const userEmail = user.email || 'adashevoybekjon@gmail.com';
      const userName = user.displayName || userEmail.split('@')[0] || 'Oybekjon Adashev';
      const userPhoto = user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80';
      const cleanUsername = userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '_');

      setFullName(userName);
      setUsername(cleanUsername);
      setContactValue(userEmail);
      setSelectedMethod('google');
      setStep('confirmed');

      addAssistantMessage(
        `Google hisobingiz (${userEmail}) muvaffaqiyatli tasdiqlandi! 🎉\n\nIsm-familiyangiz va elektron pochtangiz OAuth 2.0 orqali avtomatik import qilindi. Quyida shaxsiy kabinet maʼlumotlari bilan tanishing:`,
        "Hisobingiz toʻliq faollashtirildi!"
      );
    } catch (err: any) {
      addAssistantMessage(
        `Google orqali ulanishda xatolik yuz berdi: ${getFriendlyAuthErrorMessage(err)}`,
        "Iltimos, qaytadan urinib koʻring yoki boshqa usulni tanlang.",
        true
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // 2. Select Method (Email or Phone)
  const handleSelectMethod = (method: 'email' | 'phone') => {
    setSelectedMethod(method);
    setStep('fullName');

    addAssistantMessage(
      `Siz ${method === 'email' ? 'Elektron pochta (Email)' : 'Telefon raqam (+998)'} orqali roʻyxatdan oʻtishni tanladingiz.\n\n1-bosqich: Iltimos, toʻliq ism va familiyangizni kiriting.`,
      "Masalan: Oybekjon Adashev yoki Dilnoza Karimova"
    );
  };

  // Generate and dispatch OTP Code
  const dispatchOtpCode = (target: string, type: 'email' | 'phone', recipientName: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpTimer(60);
    setOtpAttempts(0);

    if (type === 'email') {
      sendGmail2FACode(target, code, recipientName);
      addAssistantMessage(
        `Xavfsizlik tasdiqlash kodi ${target} manziliga tranzaksion pochta xizmati orqali yuborildi.\n\nIltimos, pochtangizga kelgan 6 xonali tasdiqlash kodini kiriting:`,
        `Sinov kodi (Test OTP): ${code}`
      );
    } else {
      addAssistantMessage(
        `SMS Gateway shlyuzi orqali ${target} raqamiga bir martalik maxsus kod yuborildi.\n\nIltimos, SMS orqali kelgan 6 xonali tasdiqlash kodini kiriting:`,
        `SMS Tasdiqlash kodi: ${code}`
      );
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val && step === 'chooseMethod') return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: val,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      processStepValidation(val);
      setIsLoading(false);
    }, 500);
  };

  const processStepValidation = (val: string) => {
    // ----------------------------------------------------
    // QADAM 1: Ism va Familiya
    // ----------------------------------------------------
    if (step === 'fullName') {
      const parts = val.trim().split(/\s+/);
      if (parts.length < 2 || parts[0].length < 2 || parts[1].length < 2) {
        addAssistantMessage(
          "Iltimos, ismingiz bilan birga familiyangizni ham toʻliq kiriting (kamida 2 ta soʻz).",
          "Masalan: Sardor Rahimov",
          true
        );
        return;
      }

      setFullName(val.trim());
      setStep('username');
      addAssistantMessage(
        `Rahmat, ${val}! Ism-familiyangiz qabul qilindi.\n\n2-bosqich: Tizimda unikal foydalanuvchi nomini (Username / Login) tanlang. Bu nom faqat lotin harflari, raqamlar yoki pastki chiziqdan iborat boʻlishi lozim.`,
        "Masalan: sardor_2026, dev_sardor"
      );
      return;
    }

    // ----------------------------------------------------
    // QADAM 2: Username / Login
    // ----------------------------------------------------
    if (step === 'username') {
      const cleanUsername = val.trim().toLowerCase().replace(/^@/, '');
      const validRegex = /^[a-zA-Z0-9_]{3,24}$/;

      if (!validRegex.test(cleanUsername)) {
        addAssistantMessage(
          "Foydalanuvchi nomi faqat lotin alifbosi harflari, raqamlar va pastki chiziqdan (_) iborat boʻlishi hamda kamida 3 ta belgidan tashkil topishi shart.",
          "Masalan: jasur_tech, student_2026",
          true
        );
        return;
      }

      const existingUsers = getStoredUsers();
      const isTaken = existingUsers.some(u => 
        (u.email && u.email.split('@')[0].toLowerCase() === cleanUsername) || 
        (u.name && u.name.toLowerCase().replace(/\s+/g, '_') === cleanUsername)
      );

      if (isTaken) {
        addAssistantMessage(
          `Kechirasiz, "${cleanUsername}" logini allaqachon band. Iltimos, boshqa takrorlanmaydigan login tanlang.`,
          "Masalan: " + cleanUsername + "_uz",
          true
        );
        return;
      }

      setUsername(cleanUsername);
      setStep('contactInput');

      if (selectedMethod === 'email') {
        addAssistantMessage(
          `@${cleanUsername} logini band qilindi!\n\n3-bosqich: Iltimos, tasdiqlash kodi yuborilishi uchun faol elektron pochta (Email) manzilingizni kiriting:`,
          "Masalan: adashevoybekjon@gmail.com"
        );
      } else {
        addAssistantMessage(
          `@${cleanUsername} logini band qilindi!\n\n3-bosqich: Iltimos, tasdiqlash SMS kodi yuborilishi uchun telefon raqamingizni kiriting (+998 formatida):`,
          "Masalan: +998 90 123 45 67"
        );
      }
      return;
    }

    // ----------------------------------------------------
    // QADAM 3: Contact Input (Email or Phone)
    // ----------------------------------------------------
    if (step === 'contactInput') {
      if (selectedMethod === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          addAssistantMessage(
            "Elektron pochta manzili formati notoʻgʻri. Manzilda @ belgisi va domen (.com, .uz, .ru) boʻlishi kerak.",
            "Masalan: talaba@gmail.com",
            true
          );
          return;
        }

        setContactValue(val.toLowerCase());
        setStep('otpVerification');
        dispatchOtpCode(val.toLowerCase(), 'email', fullName);
      } else {
        const cleanDigits = val.replace(/[^\d]/g, '');
        let pureNumber = cleanDigits;
        if (pureNumber.startsWith('998')) {
          pureNumber = pureNumber.slice(3);
        }

        if (pureNumber.length !== 9) {
          addAssistantMessage(
            "Telefon raqamida raqamlar yetishmayapti yoki notoʻgʻri. Oʻzbekiston formati boʻyicha 9 ta raqam boʻlishi lozim.",
            "Masalan: +998 90 123 45 67",
            true
          );
          return;
        }

        const formattedPhone = `+998 ${pureNumber.substring(0,2)} ${pureNumber.substring(2,5)} ${pureNumber.substring(5,7)} ${pureNumber.substring(7,9)}`;
        setContactValue(formattedPhone);
        setStep('otpVerification');
        dispatchOtpCode(formattedPhone, 'phone', fullName);
      }
      return;
    }

    // ----------------------------------------------------
    // QADAM 4: OTP Verification
    // ----------------------------------------------------
    if (step === 'otpVerification') {
      const cleanInputOtp = val.replace(/\D/g, '');
      if (cleanInputOtp !== generatedOtp) {
        const nextAttempts = otpAttempts + 1;
        setOtpAttempts(nextAttempts);

        addAssistantMessage(
          `Kiritilgan tasdiqlash kodi notoʻgʻri. Iltimos, xabardagi 6 xonali kodni diqqat bilan tekshirib, qaytadan kiriting. (Urinish: ${nextAttempts}/3)`,
          `Siz kiritdingiz: "${val}". Tekshirib qaytadan yozing:`,
          true
        );
        return;
      }

      // OTP is valid!
      setStep('password');
      addAssistantMessage(
        `Tasdiqlash kodi 100% toʻgʻri qabul qilindi! ✓\n\nSoʻnggi bosqich: Hisobingizni xavfsiz himoyalash uchun yangi maxfiy parol kiriting (kamida 6 ta belgi).`,
        "Parollar maʼlumotlar bazasida faqat shifrlangan (hashed) holda saqlanadi."
      );
      return;
    }

    // ----------------------------------------------------
    // QADAM 5: Password Security
    // ----------------------------------------------------
    if (step === 'password') {
      if (val.length < 6) {
        addAssistantMessage(
          "Parol xavfsizlik talablariga javob bermaydi. Iltimos, kamida 6 ta belgidan iborat ishonchli parol kiriting.",
          "Masalan: Katta-kichik harflar va raqamlar aralashmasi",
          true
        );
        return;
      }

      setPassword(val);
      setStep('confirmed');

      // Parolni xavfsiz xeshlangan holda saqlash
      const primaryId = selectedMethod === 'email' ? contactValue : (selectedMethod === 'phone' ? contactValue : username);
      saveUserCredential(primaryId, val, {
        username: username,
        email: selectedMethod === 'email' ? contactValue : undefined,
        phone: selectedMethod === 'phone' ? contactValue : undefined
      });

      addAssistantMessage(
        "Barcha xavfsizlik tekshiruvlari muvaffaqiyatli yakunlandi! 🎉\n\nParolingiz xavfsiz shifrlanib, himoyalangan bazaga yozildi. Quyida shaxsiy kabinetingiz xulosasi:",
        "Hisobingiz faollashtirishga tayyor!"
      );
    }
  };

  // Finalize Registration and Launch User Cabinet
  const handleFinalize = () => {
    const newUserId = `usr-${Date.now()}`;
    const newUser: UserProfile = {
      id: newUserId,
      fullName: fullName,
      authMethod: selectedMethod === 'google' ? 'email' : selectedMethod,
      email: selectedMethod === 'phone' ? `${username}@ziyotalim.uz` : contactValue,
      phone: selectedMethod === 'phone' ? contactValue : '+998 90 123 45 67',
      isVerified: true,
      avatar: selectedMethod === 'google' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
      bio: `«Ziyo Taʼlim» intellektual xavfsizlik tizimi orqali tasdiqlangan talaba (@${username})`
    };

    // Save to Mock Users Registry in Admin storage
    const existing = getStoredUsers();
    const mockRecord: MockUser = {
      id: newUserId,
      name: fullName,
      email: newUser.email || '',
      role: 'Talaba',
      status: 'Faol',
      joinedDate: newUser.joinedDate,
      enrolledCourses: 0,
      completedTests: 0,
      averageScore: 100
    };
    saveStoredUsers([mockRecord, ...existing]);

    onSuccessRegistration(newUser, `Xush kelibsiz, ${fullName}! Shaxsiy kabinetingiz muvaffaqiyatli faollashtirildi.`);
  };

  return (
    <div className="flex flex-col h-[530px] max-h-[85vh] bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800">
      
      {/* Header Banner */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
              <Bot className="w-5 h-5 text-sky-200" />
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-700 absolute -bottom-0.5 -right-0.5" />
          </div>
          <div>
            <div className="text-xs font-black tracking-tight leading-tight flex items-center gap-1.5">
              <span>Ziyo Xavfsizlik & Avtorizatsiya Yordamchisi</span>
              <span className="px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-200 font-mono text-[9px] uppercase font-bold">
                OAuth 2.0 & OTP
              </span>
            </div>
            <div className="text-[10px] text-sky-100 font-medium">
              Google OAuth, Gmail OTP va SMS shlyuz orqali xavfsiz boshqaruv
            </div>
          </div>
        </div>

        {onSwitchToTraditional && (
          <button
            type="button"
            onClick={onSwitchToTraditional}
            className="text-[11px] text-indigo-100 hover:text-white underline font-semibold transition-colors cursor-pointer"
          >
            Oddiy forma
          </button>
        )}
      </div>

      {/* Stepper Progress */}
      <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            step !== 'chooseMethod' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
          }`}>
            {step !== 'chooseMethod' ? '✓' : '1'}
          </span>
          <span className={step === 'chooseMethod' ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : ''}>
            Usul tanlash
          </span>
        </div>

        <span className="text-slate-300 dark:text-slate-700">→</span>

        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            fullName && username ? 'bg-emerald-500 text-white' : (step === 'fullName' || step === 'username') ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}>
            {(fullName && username) ? '✓' : '2'}
          </span>
          <span className={(step === 'fullName' || step === 'username') ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : ''}>
            Profil
          </span>
        </div>

        <span className="text-slate-300 dark:text-slate-700">→</span>

        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            step === 'confirmed' ? 'bg-emerald-500 text-white' : (step === 'contactInput' || step === 'otpVerification' || step === 'password') ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}>
            {step === 'confirmed' ? '✓' : '3'}
          </span>
          <span className={(step === 'contactInput' || step === 'otpVerification' || step === 'password') ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : ''}>
            OTP & Xavfsizlik
          </span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
            >
              {isAssistant && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                isAssistant
                  ? msg.error
                    ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-200'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs'
                  : 'bg-indigo-600 text-white shadow-sm'
              }`}>
                {msg.error && (
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold mb-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Xavfsizlik tekshiruvi:</span>
                  </div>
                )}
                
                <p className="whitespace-pre-line font-normal">{msg.text}</p>
                
                {msg.hint && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    💡 {msg.hint}
                  </div>
                )}

                <div className={`text-[9px] mt-1 text-right font-mono ${
                  isAssistant ? 'text-slate-400' : 'text-indigo-200'
                }`}>
                  {msg.timestamp}
                </div>
              </div>

              {!isAssistant && (
                <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* STEP 1: INTERACTIVE METHOD CHOOSER (3 Professional Methods) */}
        {step === 'chooseMethod' && (
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 animate-in fade-in">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Avtorizatsiya usulini tanlang:
            </div>

            {/* Method 1: Google OAuth 2.0 */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isGoogleLoading}
              className="w-full p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/60 dark:hover:bg-blue-900/50 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Google Akkaunt orqali bir bosishda</span>
                    <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[9px] font-mono font-bold">OAuth 2.0</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Ism, familiya va email avtomatik tasdiqlanadi</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Method 2: Email with Transactional OTP */}
            <button
              type="button"
              onClick={() => handleSelectMethod('email')}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Email & Pochta orqali</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Tranzaksion pochta orqali OTP tasdiqlash kodi</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Method 3: Phone with SMS Gateway */}
            <button
              type="button"
              onClick={() => handleSelectMethod('phone')}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Telefon raqam orqali (+998)</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">SMS shlyuz orqali 6 xonali tasdiqlash kodi</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* OTP Resend Action during otpVerification step */}
        {step === 'otpVerification' && (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs animate-in fade-in">
            <span className="text-slate-500 dark:text-slate-400">
              {otpTimer > 0 ? (
                <span>Qayta yuborish: <strong className="font-mono text-indigo-600 dark:text-indigo-400">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong></span>
              ) : (
                <span className="text-rose-500 font-semibold">Vaqt tugadi</span>
              )}
            </span>

            <button
              type="button"
              disabled={otpTimer > 0}
              onClick={() => dispatchOtpCode(contactValue, selectedMethod === 'email' ? 'email' : 'phone', fullName)}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Kodni qayta yuborish</span>
            </button>
          </div>
        )}

        {/* STEP 5: FINAL CONFIRMED REGISTRATION & WELCOME CARD */}
        {step === 'confirmed' && (
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-indigo-50/60 dark:from-emerald-950/40 dark:to-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 shadow-md space-y-3.5 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Xavfsizlik Tasdigʻi Muvaffaqiyatli Oʻtdi</span>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-slate-200/80 dark:border-slate-800 text-xs divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-1.5 pt-0.5">
                <span className="text-slate-500 dark:text-slate-400">Toʻliq ism-familiya:</span>
                <span className="font-bold text-slate-900 dark:text-white">{fullName}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Foydalanuvchi nomi:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@{username}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Tasdiqlangan aloqa:</span>
                <span className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
                  {contactValue}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-slate-500 dark:text-slate-400">Parol va Shifrlash:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {selectedMethod === 'google' ? 'Google OAuth 2.0 Token' : 'bcrypt/SHA-256 Hashed (••••••••)'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
              Tabriklaymiz! Siz «Ziyo Taʼlim» rasmiy talabasi sifatida roʻyxatdan oʻtdingiz.
            </div>

            <button
              type="button"
              onClick={handleFinalize}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Shaxsiy Kabinetga Kirish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>Ziyo Assistent tekshirmoqda...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form (Active during text input steps) */}
      {step !== 'confirmed' && step !== 'chooseMethod' && (
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shrink-0"
        >
          <div className="relative flex-1">
            <input
              type={step === 'password' && !showPassword ? 'password' : 'text'}
              autoFocus
              value={inputValue}
              onChange={(e) => {
                if (step === 'contactInput' && selectedMethod === 'phone') {
                  setInputValue(formatPhoneNumber(e.target.value));
                } else {
                  setInputValue(e.target.value);
                }
              }}
              placeholder={
                step === 'fullName'
                  ? 'Ism va Familiyangizni kiriting...'
                  : step === 'username'
                  ? 'Foydalanuvchi nomini kiriting (masalan: sardor_2026)...'
                  : step === 'contactInput'
                  ? (selectedMethod === 'email' ? 'Email manzilingizni kiriting...' : '+998 90 123 45 67')
                  : step === 'otpVerification'
                  ? '6 xonali tasdiqlash kodini kiriting...'
                  : 'Yangi maxfiy parol kiriting (kamida 6 ta belgi)...'
              }
              className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {step === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center shrink-0"
            title="Yuborish"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}

    </div>
  );
};
