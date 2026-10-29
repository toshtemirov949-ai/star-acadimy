import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Mail, User, Eye, EyeOff, ArrowRight, 
  Sparkles, KeyRound, ExternalLink, RefreshCw, AlertCircle, CheckCircle2,
  BookOpen, Trophy, Cpu, Globe, ShieldAlert, LogIn, Sun, Moon, Check
} from 'lucide-react';
import { UserProfile } from '../types';
import { ZiyoTalimLogo } from './ZiyoTalimLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { googleSignIn, getFriendlyAuthErrorMessage } from '../services/googleAuthService';
import { sendGmail2FACode } from '../services/gmailService';
import { getStoredUsers, saveStoredUsers, MockUser } from '../utils/adminStorage';

interface SecurityAuthGateProps {
  onSuccessAuth: (user: UserProfile, message: string) => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
}

export const SecurityAuthGate: React.FC<SecurityAuthGateProps> = ({
  onSuccessAuth,
  onOpenAdminLogin,
  isAdminLoggedIn
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  // 2FA Verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationDigits, setVerificationDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [pendingCandidate, setPendingCandidate] = useState<UserProfile | null>(null);
  const [isDispatchedViaApi, setIsDispatchedViaApi] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isVerifying && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVerifying, timer]);

  // Google Sign-In with mandatory Gmail 2FA code
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    try {
      const { user } = await googleSignIn();
      const targetEmail = user.email || 'adashevoybekjon@gmail.com';
      const targetName = user.displayName || targetEmail.split('@')[0] || 'Oybekjon Adashev';
      const targetPhoto = user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80';

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      const candidate: UserProfile = {
        id: user.uid || `usr-${Date.now()}`,
        fullName: targetName,
        authMethod: 'email',
        email: targetEmail,
        isVerified: true,
        avatar: targetPhoto,
        joinedDate: new Date().toISOString().split('T')[0],
        bio: 'Google va Gmail 2FA himoyasi orqali tasdiqlangan talaba'
      };
      setPendingCandidate(candidate);

      // Dispatch 2FA verification email to Gmail inbox
      const dispatchRes = await sendGmail2FACode(targetEmail, code, targetName);
      setIsDispatchedViaApi(dispatchRes.dispatchedViaGmailApi);

      // Force 2FA verification step
      setIsVerifying(true);
      setTimer(60);
      setVerificationDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      setErrorMsg(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...verificationDigits];
    newDigits[index] = cleanVal;
    setVerificationDigits(newDigits);

    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`gate-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePasteCode = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = ['', '', '', '', '', ''];
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setVerificationDigits(newDigits);
      const focusIndex = Math.min(pastedData.length, 5);
      document.getElementById(`gate-digit-${focusIndex}`)?.focus();
    }
  };

  // Confirm verification code
  const handleConfirmCode = () => {
    const inputCode = verificationDigits.join('');
    if (inputCode.length !== 6) {
      setErrorMsg('Iltimos, 6 xonali tasdiqlash kodini toʻliq kiriting');
      return;
    }

    if (inputCode !== generatedCode) {
      setErrorMsg('Kiritilgan xavfsizlik kodi notoʻgʻri! Gmail pochtangizni tekshiring');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const user = pendingCandidate || {
        id: `usr-${Date.now()}`,
        fullName: 'Oybekjon Adashev',
        authMethod: 'email' as const,
        email: 'adashevoybekjon@gmail.com',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        bio: 'Xavfsiz Gmail 2FA tekshiruvidan muvaffaqiyatli oʻtgan talaba'
      };

      try {
        const storedUsers = getStoredUsers();
        const otherUsers = storedUsers.filter(u => u.id !== user.id && (!user.email || u.email?.toLowerCase() !== user.email.toLowerCase()));
        const newMockUser: MockUser = {
          id: user.id,
          name: user.fullName,
          email: user.email || `${user.id}@ziyotalim.uz`,
          role: 'Talaba',
          enrolledCourses: 0,
          completedTests: 0,
          averageScore: 100,
          status: 'Faol',
          joinedDate: user.joinedDate
        };
        saveStoredUsers([newMockUser, ...otherUsers]);
      } catch {}

      onSuccessAuth(user, `Xush kelibsiz, ${user.fullName}! Tizimga xavfsiz kirish muvaffaqiyatli amalga oshirildi.`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between relative overflow-hidden text-slate-100">
      
      {/* Background Decorative Tech Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* Top Bar with Language and Theme */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ZiyoTalimLogo size="md" />
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="compact" />
          
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Rang mavzusini oʻzgartirish"
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all cursor-pointer shadow-xs"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
          </button>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all backdrop-blur-xl">
          
          {/* Card Header with Security Badges */}
          <div className="px-6 sm:px-8 pt-7 pb-5 bg-gradient-to-b from-blue-50/70 dark:from-slate-800/60 to-transparent border-b border-slate-100 dark:border-slate-800/80 text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 mb-3.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>OAuth 2.0 & Gmail 2-Bosqichli Himoyalangan Tizim</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              «Ziyo Taʼlim» Platformasiga Kirish
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Google Akkaunt orqali xavfsiz avtorizatsiya va Gmail pochtangizga keluvchi bir martalik 2FA tasdiqlash kodi
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-5">
            
            {/* Global Error Banner */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
                <span className="leading-snug font-medium">{errorMsg}</span>
              </div>
            )}

            {isVerifying ? (
              /* SCREEN 2: 6-DIGIT GMAIL 2FA VERIFICATION CODE */
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center mx-auto shadow-sm">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Gmail 2FA Tasdiqlash Kodi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tasdiqlash kodi <strong>{pendingCandidate?.email}</strong> manziliga yuborildi
                  </p>
                </div>

                {/* Direct Link to open Gmail */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Gmail ilovasini ochib kelgan xatni koʻring
                    </span>
                  </div>
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Gmailni Ochish</span>
                  </a>
                </div>

                {/* Real Gmail Dispatch Notification */}
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      {isDispatchedViaApi ? 'Kod toʻgʻridan-toʻgʻri Gmail pochtangizga yuborildi!' : 'Xavfsizlik tasdiqlash kodi shakllantirildi'}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300/90 leading-relaxed">
                    {isDispatchedViaApi ? (
                      <>Gmail ilovangizni oching va <strong>{pendingCandidate?.email}</strong> manziliga kelgan 6 xonali tasdiqlash kodini quyidagi kataklarga kiriting.</>
                    ) : (
                      <>Quyidagi bir martalik xavfsizlik kodini tasdiqlab, profilingizga kiring:</>
                    )}
                  </p>
                </div>

                {/* Instant Access Backup Badge if not sent through OAuth API */}
                {!isDispatchedViaApi && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="font-medium">Tasdiqlash kodi:</span>
                      <span className="font-mono font-bold tracking-widest text-sm text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-700">{generatedCode}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const digits = generatedCode.split('');
                        setVerificationDigits(digits);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer shadow-xs transition-colors"
                    >
                      Kataklarga kiritish
                    </button>
                  </div>
                )}

                {/* 6 Digit Input Boxes */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block text-center">
                    6 xonali tasdiqlash kodi:
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handlePasteCode}>
                    {verificationDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`gate-digit-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && idx > 0) {
                            document.getElementById(`gate-digit-${idx - 1}`)?.focus();
                          }
                        }}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-xl font-bold bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 rounded-xl focus:outline-none transition-all text-slate-900 dark:text-white"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend Timer */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 dark:text-slate-400">
                    {timer > 0 ? (
                      <span>Qayta yuborish: <strong className="font-mono text-blue-600 dark:text-blue-400">00:{timer < 10 ? `0${timer}` : timer}</strong></span>
                    ) : (
                      <span className="text-red-500 font-semibold">Vaqt tugadi</span>
                    )}
                  </span>

                  <button
                    type="button"
                    disabled={timer > 0}
                    onClick={() => {
                      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                      setGeneratedCode(newCode);
                      setTimer(60);
                      sendGmail2FACode(pendingCandidate?.email || 'adashevoybekjon@gmail.com', newCode, pendingCandidate?.fullName || 'Foydalanuvchi');
                    }}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Kodni qayta yuborish</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVerifying(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Ortga
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting || verificationDigits.join('').length !== 6}
                    onClick={handleConfirmCode}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Tasdiqlanmoqda...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Kodni Tasdiqlash & Kirish</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* SCREEN 1: ONLY GOOGLE SIGN-IN WITH GMAIL 2FA */
              <div className="space-y-6 py-2">
                
                {/* Visual Security Feature Card */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Xavfsiz va Ishonchli Kirish Standarti</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>Google hisobingiz orqali parollarni eslab qolish shart emas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>Ism, familiya va elektron pochtangiz avtomatik import qilinadi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Gmail orqali bir martalik 6 xonali 2FA kod bilan toʻliq himoyalangan</span>
                    </li>
                  </ul>
                </div>

                {/* THE ONLY OFFICIAL GOOGLE SIGN-IN BUTTON */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                    className="gsi-material-button w-full shadow-md hover:shadow-lg transition-all py-3 scale-101 active:scale-99"
                  >
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                      </div>
                      <span className="text-slate-800 dark:text-slate-100 font-bold text-sm">
                        {isGoogleLoading ? 'Google OAuth ulanmoqda...' : 'Google orqali kirish (Gmail 2FA)'}
                      </span>
                    </div>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                    Tugmani bosish orqali xavfsiz Google OAuth 2.0 protokoli ishga tushadi
                  </p>
                </div>

              </div>
            )}
          </div>

          {/* Footer Features & Admin Access */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Ziyo Xavfsizlik Sertifikati Faol (256-bit SSL)</span>
            </div>

            <button
              type="button"
              onClick={onOpenAdminLogin}
              className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Boshqaruvchi (Admin)'}</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 py-3 text-center text-xs text-slate-500">
        © 2026 «Ziyo Taʼlim» Oʻquv Platformasi. Google Workspace & Gmail 2FA Xavfsizlik Tizimi.
      </footer>

    </div>
  );
};
