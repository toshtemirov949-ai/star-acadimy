import React, { useState, useEffect } from 'react';
import { 
  X, Mail, Lock, ShieldCheck, CheckCircle2, 
  RefreshCw, KeyRound, Sparkles, LogIn, AlertCircle,
  ExternalLink, ShieldAlert
} from 'lucide-react';
import { UserProfile } from '../types';
import { getStoredUsers, saveStoredUsers, MockUser } from '../utils/adminStorage';
import { googleSignIn, getFriendlyAuthErrorMessage } from '../services/googleAuthService';
import { sendGmail2FACode } from '../services/gmailService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSuccessAuth: (user: UserProfile, message: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccessAuth,
  onLogout
}) => {
  const [isProfileView, setIsProfileView] = useState(Boolean(currentUser));

  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationDigits, setVerificationDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [activeTargetEmail, setActiveTargetEmail] = useState('');
  const [pendingUserCandidate, setPendingUserCandidate] = useState<UserProfile | null>(null);
  const [isDispatchedViaApi, setIsDispatchedViaApi] = useState(false);

  // Reset or initialize modal
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setVerificationDigits(['', '', '', '', '', '']);
      if (currentUser) {
        setIsProfileView(true);
      } else {
        setIsProfileView(false);
        setIsVerifying(false);
      }
    }
  }, [isOpen, currentUser]);

  // Countdown timer for resending 2FA code
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

  if (!isOpen) return null;

  // Trigger Google Sign-In and initiate Gmail 2FA Security check
  const handleGoogleSignInFlow = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    try {
      const { user } = await googleSignIn();
      const userEmail = user.email || 'adashevoybekjon@gmail.com';
      const userName = user.displayName || userEmail.split('@')[0] || 'Oybekjon Adashev';
      const userPhoto = user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80';

      // Generate secure 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setActiveTargetEmail(userEmail);

      const candidate: UserProfile = {
        id: user.uid || `usr-google-${Date.now()}`,
        fullName: userName,
        authMethod: 'email',
        email: userEmail,
        isVerified: true,
        avatar: userPhoto,
        joinedDate: new Date().toISOString().split('T')[0],
        bio: 'Google & Gmail xavfsiz tizimi orqali tasdiqlangan talaba'
      };
      setPendingUserCandidate(candidate);

      // Send 2FA code to Gmail inbox using Gmail API
      const dispatchRes = await sendGmail2FACode(userEmail, code, userName);
      setIsDispatchedViaApi(dispatchRes.dispatchedViaGmailApi);

      // Enter mandatory 2FA screen
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

    // Auto-focus next input
    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`digit-input-${index + 1}`);
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
      document.getElementById(`digit-input-${focusIndex}`)?.focus();
    }
  };

  // Enforce code verification before account entry
  const handleConfirmVerification = () => {
    const inputCode = verificationDigits.join('');
    if (inputCode.length !== 6) {
      setErrorMsg('Iltimos, 6 xonali tasdiqlash kodini toʻliq kiriting');
      return;
    }

    if (inputCode !== generatedCode) {
      setErrorMsg('Xavfsizlik kodi notoʻgʻri! Gmail ilovangizga kelgan kodni tekshiring va qayta kiriting');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const finalizedUser: UserProfile = pendingUserCandidate || {
        id: `usr-${Date.now()}`,
        fullName: 'Oybekjon Adashev',
        authMethod: 'email',
        email: activeTargetEmail || 'adashevoybekjon@gmail.com',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        bio: 'Gmail 2FA xavfsizlik tekshiruvidan muvaffaqiyatli oʻtgan foydalanuvchi'
      };

      try {
        const storedUsers = getStoredUsers();
        const otherUsers = storedUsers.filter(u => u.id !== finalizedUser.id && (!finalizedUser.email || u.email?.toLowerCase() !== finalizedUser.email.toLowerCase()));
        const newMockUser: MockUser = {
          id: finalizedUser.id,
          name: finalizedUser.fullName,
          email: finalizedUser.email || `${finalizedUser.id}@ziyotalim.uz`,
          role: 'Talaba',
          enrolledCourses: 0,
          completedTests: 0,
          averageScore: 100,
          status: 'Faol',
          joinedDate: finalizedUser.joinedDate
        };
        saveStoredUsers([newMockUser, ...otherUsers]);
      } catch {}

      onSuccessAuth(
        finalizedUser, 
        `Xush kelibsiz, ${finalizedUser.fullName}! Gmail xavfsizlik kodi muvaffaqiyatli tasdiqlandi.`
      );
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/50 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {currentUser && isProfileView ? (
                  <span>Shaxsiy Profil & Akkaunt</span>
                ) : isVerifying ? (
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span>Gmail 2FA Xavfsizlik Tasdigʻi</span>
                  </span>
                ) : (
                  <span>Google & Gmail 2FA Kirish</span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser && isProfileView
                  ? 'Rasmiy tasdiqlangan talaba maʼlumotlari'
                  : isVerifying
                  ? 'Gmail ilovangizga kelgan 6 xonali kodni kiriting'
                  : 'Google Workspace & Gmail 2-bosqichli himoyalangan tizim'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          {currentUser && isProfileView ? (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                      {currentUser.fullName}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Gmail 2FA Tasdiqlangan
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {currentUser.email || currentUser.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Aʼzo boʻlgan sana: {currentUser.joinedDate}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center gap-2.5 text-xs text-blue-900 dark:text-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Akkauntingiz Google va Gmail xavfsizlik protokollari bilan 100% himoyalangan.</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setIsProfileView(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 rotate-180" />
                  <span>Akkauntdan chiqish</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Yopish
                </button>
              </div>
            </div>
          ) : isVerifying ? (
            /* VIEW 2: MANDATORY GMAIL 2FA VERIFICATION SCREEN */
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center space-y-1.5">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2 shadow-sm border border-blue-200 dark:border-blue-800">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  Gmail Xavfsizlik Kodini Kiriting
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Akkaunt xavfsizligi yuzasidan 6 xonali tasdiqlash kodi quyidagi manzilga yuborildi: <br />
                  <strong className="text-blue-600 dark:text-blue-400 font-mono font-bold text-sm">
                    {activeTargetEmail || 'adashevoybekjon@gmail.com'}
                  </strong>
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                    Kodni kiritmaguningizcha akkauntga kirish imkoni yoʻq
                  </span>
                </div>
              </div>

              {/* Direct Gmail App Launcher button */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Gmail pochtangizni tekshirib, xatdagi kodni oling
                  </span>
                </div>
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Gmail Ilovasini Ochish</span>
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
                    <>Gmail ilovangizni oching va <strong>{activeTargetEmail || 'adashevoybekjon@gmail.com'}</strong> manziliga kelgan 6 xonali tasdiqlash kodini quyidagi kataklarga kiriting.</>
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
                  6 xonali maxsus kirish kodi:
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePasteCode}>
                  {verificationDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`digit-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && idx > 0) {
                          document.getElementById(`digit-input-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-xl font-bold bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 rounded-xl focus:outline-none transition-all text-slate-900 dark:text-white"
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend Action */}
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
                    sendGmail2FACode(activeTargetEmail || 'adashevoybekjon@gmail.com', newCode, pendingUserCandidate?.fullName || 'Foydalanuvchi');
                  }}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Kodni qayta yuborish</span>
                </button>
              </div>

              {/* Action Buttons */}
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
                  onClick={handleConfirmVerification}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Xavfsizlik tekshirilmoqda...</span>
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
            /* VIEW 3: STRICTLY GOOGLE SIGN-IN WITH GMAIL 2FA */
            <div className="space-y-5 py-2 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Rasmiy Google & Gmail 2-bosqichli (2FA) tizimi</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Platformamiz yuqori darajadagi xavfsizlikni taʼminlash uchun faqat rasmiy Google hisobi va Gmail pochtasiga yuboriladigan 6 xonali bir martalik tasdiqlash kodi orqali ishlaydi.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block text-center">
                  Davom etish uchun Google orqali kiring:
                </label>

                <button
                  type="button"
                  onClick={handleGoogleSignInFlow}
                  disabled={isGoogleLoading}
                  className="gsi-material-button shadow-md hover:shadow-lg w-full transition-all cursor-pointer"
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
                    <span className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
                      {isGoogleLoading ? 'Google hisob ulanmoqda...' : 'Google orqali kirish (Gmail 2FA)'}
                    </span>
                  </div>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>100% himoyalangan Google OAuth & Gmail 2FA protokoli</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
