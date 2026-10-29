import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App safely (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Workspace OAuth Scopes configured for sending 2FA verification codes
export const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send'
];

export const googleProvider = new GoogleAuthProvider();
SCOPES.forEach(scope => googleProvider.addScope(scope));

// In-memory token caching per Workspace skill guidelines (NO localStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    cachedUser = user;
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token not cached in this fresh session, user is logged in to Firebase
        if (onAuthSuccess) onAuthSuccess(user, '');
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const getFriendlyAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  const msg = error?.message || '';

  if (code === 'auth/popup-blocked' || msg.includes('popup-blocked')) {
    return 'Brauzeringiz qalqib chiquvchi oynani (popup) toʻsib qoʻydi. Brauzer sozlamalarida pop-uplarga ruxsat bering yoki quyidagi login/parol shaklidan foydalaning.';
  }
  if (code === 'auth/cancelled-popup-request' || msg.includes('cancelled-popup-request')) {
    return 'Oldingi soʻrov bekor qilindi. Iltimos, qayta urinib koʻring.';
  }
  if (code === 'auth/popup-closed-by-user' || msg.includes('popup-closed-by-user')) {
    return 'Google oynasi yopildi. Qayta urinib koʻring yoki login/parol orqali kiring.';
  }
  if (code === 'auth/network-request-failed' || msg.includes('network')) {
    return 'Internet tarmogʻi bilan aloqa sust. Aloqani tekshiring va qayta urinib koʻring.';
  }
  return error?.message || 'Google orqali kirishda kutilmagan xatolik yuz berdi.';
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Google OAuth access token olinmadi');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.warn('Google Sign-In natijasi:', error?.code || error?.message);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const setAccessTokenManually = (token: string | null) => {
  cachedAccessToken = token;
};

export const getFirebaseUser = (): User | null => {
  return cachedUser || auth.currentUser;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  cachedUser = null;
};
