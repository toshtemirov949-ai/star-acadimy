import { 
  FullUserSettings, 
  ActiveSession, 
  ChangePasswordRequest 
} from '../types/settings';
import { getStoredUser, saveStoredUser } from './storage';
import { UserProfile } from '../types';
import { verifyUserPassword, saveUserCredential } from './authCredentials';

const SETTINGS_STORAGE_KEY = 'ziyotalim_user_full_settings_v1';
const SESSIONS_STORAGE_KEY = 'ziyotalim_user_active_sessions_v1';
const PASSWORD_HASH_KEY = 'ziyotalim_user_password_hash_v1';

export const DEFAULT_SETTINGS: FullUserSettings = {
  id: 'set-default-user',
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bio: '',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  emailNotifications: true,
  pushNotifications: true,
  telegramNotifications: true,
  theme: 'light',
  language: 'uz',
  videoQuality: '1080p',
  autoplay: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const DEFAULT_ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: 'sess-1',
    deviceName: 'MacBook Pro 16" (Joriy qurilma)',
    browser: 'Chrome 128.0 · macOS Sonoma',
    ipAddress: '84.54.82.114',
    location: 'Toshkent shahri, Oʻzbekiston',
    lastActive: 'Hozir faol',
    isCurrent: true
  },
  {
    id: 'sess-2',
    deviceName: 'iPhone 15 Pro Max',
    browser: 'Safari Mobile 18.0 · iOS',
    ipAddress: '84.54.82.195',
    location: 'Toshkent shahri, Oʻzbekiston',
    lastActive: 'Bugun, 14:22',
    isCurrent: false
  },
  {
    id: 'sess-3',
    deviceName: 'Lenovo ThinkPad X1',
    browser: 'Firefox 130 · Windows 11',
    ipAddress: '213.230.87.12',
    location: 'Samarqand, Oʻzbekiston',
    lastActive: '3 kun oldin',
    isCurrent: false
  }
];

/**
 * Saqlangan sozlamalarni o'qish (agar bo'sh bo'lsa default qaytaradi)
 */
export function getStoredSettings(): FullUserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const currentUser = getStoredUser();

    let settings = DEFAULT_SETTINGS;
    if (raw) {
      settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }

    // CurrentUser bilan shaxsiy ma'lumotlarni sinxronlashtirish
    if (currentUser) {
      const parts = (currentUser.fullName || '').trim().split(/\s+/);
      const firstName = parts[0] || settings.firstName;
      const lastName = parts.slice(1).join(' ') || settings.lastName;

      settings = {
        ...settings,
        firstName,
        lastName,
        email: currentUser.email || settings.email,
        phone: currentUser.phone || settings.phone,
        bio: currentUser.bio || settings.bio,
        avatarUrl: currentUser.avatar || settings.avatarUrl
      };
    }

    return settings;
  } catch (err) {
    console.error('Sozlamalarni oʻqishda xatolik:', err);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Sozlamalarni yangilash va localStorage'ga saqlash
 */
export function saveStoredSettings(partial: Partial<FullUserSettings>): FullUserSettings {
  try {
    const current = getStoredSettings();
    const updated: FullUserSettings = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));

    // Foydalanuvchi asosiy profili bilan ham avtomatik sinxronlash
    const existingUser = getStoredUser();
    if (existingUser) {
      const fullName = `${updated.firstName} ${updated.lastName}`.trim() || existingUser.fullName;
      const syncedUser: UserProfile = {
        ...existingUser,
        fullName,
        email: updated.email,
        phone: updated.phone,
        bio: updated.bio,
        avatar: updated.avatarUrl
      };
      saveStoredUser(syncedUser);
    }

    return updated;
  } catch (err) {
    console.error('Sozlamalarni saqlashda xatolik:', err);
    return getStoredSettings();
  }
}

/**
 * Xavfsizlik parolini o'zgartirish
 */
export async function changeStoredPassword(
  payload: ChangePasswordRequest
): Promise<{ success: boolean; message: string }> {
  const { currentPassword, newPassword, confirmPassword } = payload;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: 'Iltimos, barcha maydonlarni toʻldiring.' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: 'Yangi parollar bir-biriga mos kelmadi.' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'Yangi parol kamida 6 ta belgidan iborat boʻlishi kerak.' };
  }

  const currentUser = getStoredUser();
  const identifier = currentUser?.email || currentUser?.phone || 'adashevoybekjon@gmail.com';

  const verifyRes = verifyUserPassword(identifier, currentPassword);
  if (!verifyRes.valid) {
    return { success: false, message: 'Joriy parol notoʻgʻri kiritildi!' };
  }

  // Yangi parolni xavfsiz saqlash
  saveUserCredential(identifier, newPassword, {
    email: currentUser?.email,
    phone: currentUser?.phone,
    username: currentUser?.fullName ? currentUser.fullName.split(' ')[0].toLowerCase() : undefined
  });
  localStorage.setItem(PASSWORD_HASH_KEY, newPassword);

  return { 
    success: true, 
    message: 'Xavfsizlik paroli muvaffaqiyatli yangilandi!' 
  };
}

/**
 * Faol sessiyalar ro'yxatini olish
 */
export function getStoredActiveSessions(): ActiveSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return DEFAULT_ACTIVE_SESSIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACTIVE_SESSIONS;
  } catch {
    return DEFAULT_ACTIVE_SESSIONS;
  }
}

/**
 * Biror sessiyani tugatish (Chiqarib yuborish)
 */
export function terminateStoredSession(sessionId: string): ActiveSession[] {
  try {
    const sessions = getStoredActiveSessions();
    const updated = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_ACTIVE_SESSIONS;
  }
}
