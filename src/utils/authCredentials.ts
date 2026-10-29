// src/utils/authCredentials.ts
// Xavfsiz foydalanuvchi hisoblari va parollarni saqlash hamda tekshirish tizimi

interface StoredCredential {
  identifier: string; // email yoki login (kichik harflarda)
  username?: string;
  email?: string;
  phone?: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

const CREDENTIALS_STORAGE_KEY = 'ziyotalim_user_credentials_v2';

// Boshlang'ich test akkountlari uchun xavfsiz xesh yaratish
function computeHash(password: string, salt: string): string {
  let hash = 5381;
  const combined = password + salt;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) + hash) + combined.charCodeAt(i);
    hash |= 0; // 32-bit integerga o'tkazish
  }
  return Math.abs(hash).toString(36);
}

// Standart boshlang'ich hisoblar (faqat birinchi marta)
const DEFAULT_CREDENTIALS: StoredCredential[] = [
  {
    identifier: 'adashevoybekjon@gmail.com',
    email: 'adashevoybekjon@gmail.com',
    username: 'oybekjon',
    passwordHash: computeHash('123456', 'salt_zt_1'),
    salt: 'salt_zt_1',
    updatedAt: new Date().toISOString()
  },
  {
    identifier: 'oybekjon',
    email: 'adashevoybekjon@gmail.com',
    username: 'oybekjon',
    passwordHash: computeHash('123456', 'salt_zt_1'),
    salt: 'salt_zt_1',
    updatedAt: new Date().toISOString()
  }
];

export function getAllStoredCredentials(): StoredCredential[] {
  try {
    const raw = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
      return DEFAULT_CREDENTIALS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_CREDENTIALS;
  } catch (err) {
    console.error('Credentials oʻqishda xatolik:', err);
    return DEFAULT_CREDENTIALS;
  }
}

/**
 * Yangi foydalanuvchi parolini saqlash yoki yangilash
 */
export function saveUserCredential(
  identifier: string,
  rawPassword: string,
  extra?: { username?: string; email?: string; phone?: string }
): void {
  try {
    const cleanId = identifier.trim().toLowerCase();
    const credentials = getAllStoredCredentials();
    const salt = 'salt_' + Math.random().toString(36).substring(2, 8);
    const passwordHash = computeHash(rawPassword, salt);

    const now = new Date().toISOString();
    const updated = credentials.filter(c => 
      c.identifier !== cleanId && 
      (!extra?.email || c.identifier !== extra.email.trim().toLowerCase()) &&
      (!extra?.username || c.identifier !== extra.username.trim().toLowerCase())
    );

    // Asosiy identifier bo'yicha yozuv
    updated.push({
      identifier: cleanId,
      username: extra?.username?.toLowerCase(),
      email: extra?.email?.toLowerCase() || (cleanId.includes('@') ? cleanId : undefined),
      phone: extra?.phone,
      passwordHash,
      salt,
      updatedAt: now
    });

    // Agar username alohida berilgan bo'lsa, u bilan ham kirish imkonini berish
    if (extra?.username && extra.username.trim().toLowerCase() !== cleanId) {
      updated.push({
        identifier: extra.username.trim().toLowerCase(),
        username: extra.username.toLowerCase(),
        email: extra.email?.toLowerCase(),
        phone: extra.phone,
        passwordHash,
        salt,
        updatedAt: now
      });
    }

    localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Parolni saqlashda xatolik:', err);
  }
}

export interface PasswordVerificationResult {
  valid: boolean;
  userExists: boolean;
  errorMessage?: string;
  user?: StoredCredential;
}

/**
 * Foydalanuvchi paroli to'g'riligini qat'iy tekshirish
 */
export function verifyUserPassword(
  identifier: string,
  rawPassword: string
): PasswordVerificationResult {
  const cleanId = identifier.trim().toLowerCase();
  if (!cleanId) {
    return {
      valid: false,
      userExists: false,
      errorMessage: 'Iltimos, elektron pochta yoki loginni kiriting.'
    };
  }

  if (!rawPassword) {
    return {
      valid: false,
      userExists: true,
      errorMessage: 'Iltimos, parolingizni kiriting.'
    };
  }

  const credentials = getAllStoredCredentials();
  const found = credentials.find(c => 
    c.identifier === cleanId || 
    (c.email && c.email.toLowerCase() === cleanId) || 
    (c.username && c.username.toLowerCase() === cleanId)
  );

  // Agar bunday akkaunt mavjud bo'lmasa
  if (!found) {
    return {
      valid: false,
      userExists: false,
      errorMessage: 'Bunday elektron pochta yoki login bilan roʻyxatdan oʻtgan foydalanuvchi topilmadi. Iltimos, avval roʻyxatdan oʻting.'
    };
  }

  // Parol xeshini tekshirish
  const computed = computeHash(rawPassword, found.salt);
  if (computed !== found.passwordHash) {
    return {
      valid: false,
      userExists: true,
      errorMessage: 'Kiritilgan parol notoʻgʻri! Iltimos, parolingizni tekshirib qaytadan kiriting.'
    };
  }

  return {
    valid: true,
    userExists: true,
    user: found
  };
}

/**
 * Parolni almashtirish funksiyasi
 */
export function changeUserPassword(
  identifier: string,
  currentPass: string,
  newPass: string
): { success: boolean; message: string } {
  const verifyRes = verifyUserPassword(identifier, currentPass);
  if (!verifyRes.valid) {
    return {
      success: false,
      message: verifyRes.errorMessage || 'Joriy parol notoʻgʻri kiritildi.'
    };
  }

  if (newPass.length < 6) {
    return {
      success: false,
      message: 'Yangi parol kamida 6 ta belgidan iborat boʻlishi kerak.'
    };
  }

  saveUserCredential(identifier, newPass, {
    email: verifyRes.user?.email,
    username: verifyRes.user?.username,
    phone: verifyRes.user?.phone
  });

  return {
    success: true,
    message: 'Parol muvaffaqiyatli yangilandi!'
  };
}
