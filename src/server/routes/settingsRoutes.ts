import { Router, Request, Response, NextFunction } from 'express';
import { 
  FullUserSettings, 
  ChangePasswordRequest, 
  SettingsApiResponse 
} from '../../types/settings';

// Express router
export const settingsRouter = Router();

// ============================================================================
// 1. JWT AUTENTIFIKATSIYA MIDDLEWARE (Token tekshirish)
// ============================================================================
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    userId: string;
    email: string;
    role?: string;
  };
}

/**
 * JWT Bearer tokenni tekshirish va foydalanuvchini so'rovga biriktirish
 */
export const authenticateJWT = (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Autentifikatsiya talab qilinadi. Token topilmadi.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Haqiqiy ishlab chiqarishda: const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // Namuna/Development decoding uchun:
    if (!token) {
      throw new Error('Yaroqsiz token');
    }

    // Foydalanuvchi ma'lumotlarini o'rnatish
    req.user = {
      id: 'usr-1790609793310',
      userId: 'usr-1790609793310',
      email: 'adashevoybekjon@gmail.com',
      role: 'Talaba'
    };

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Yaroqsiz yoki muddati oʻtgan sessiya tokeni.'
    });
  }
};

// ============================================================================
// 2. SOZLAMALAR OMBORI (Database ORM / In-Memory Mock Model)
// ============================================================================
// PostgreSQL bilan ishlashda: db.query("SELECT * FROM user_settings WHERE user_id = $1", [userId])
let mockSettingsDatabase: Record<string, FullUserSettings & { passwordHash: string }> = {
  'usr-1790609793310': {
    id: 'set-9901-ab',
    userId: 'usr-1790609793310',
    firstName: 'Oybekjon',
    lastName: 'Adashev',
    email: 'adashevoybekjon@gmail.com',
    phone: '+998 90 123 45 67',
    bio: 'Zamonaviy dasturlash va xorijiy tillarni faol oʻrganuvchi talaba, respublika yetakchisi',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // '123456'
    emailNotifications: true,
    pushNotifications: true,
    telegramNotifications: true,
    theme: 'light',
    language: 'uz',
    videoQuality: '1080p',
    autoplay: true,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: new Date().toISOString()
  }
};

// ============================================================================
// 3. API ENDPOINTS (Marshrutlar)
// ============================================================================

/**
 * GET /api/settings
 * Foydalanuvchining barcha sozlamalarini olib kelish
 */
settingsRouter.get('/', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'usr-1790609793310';
    const settings = mockSettingsDatabase[userId];

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi sozlamalari topilmadi.'
      });
    }

    // Parol xeshini maxfiy saqlab, chiqarib yubormaymiz
    const { passwordHash, ...safeSettings } = settings;

    const response: SettingsApiResponse<FullUserSettings> = {
      success: true,
      message: 'Sozlamalar muvaffaqiyatli yuklandi.',
      data: safeSettings
    };

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Serverda xatolik yuz berdi.',
      error: error?.message
    });
  }
});

/**
 * PUT /api/settings
 * Sozlamalarni yangilash (qisman yoki to'liq)
 */
settingsRouter.put('/', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'usr-1790609793310';
    const currentSettings = mockSettingsDatabase[userId];

    if (!currentSettings) {
      return res.status(404).json({
        success: false,
        message: 'Yangilanuvchi sozlama topilmadi.'
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      bio,
      avatarUrl,
      emailNotifications,
      pushNotifications,
      telegramNotifications,
      theme,
      language,
      videoQuality,
      autoplay
    } = req.body;

    // Validatsiya
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Elektron pochta manzili notoʻgʻri formatda.'
      });
    }

    if (theme && !['light', 'dark'].includes(theme)) {
      return res.status(400).json({
        success: false,
        message: 'Mavzu faqat "light" yoki "dark" boʻlishi kerak.'
      });
    }

    if (language && !['uz', 'ru', 'en'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Til faqat "uz", "ru" yoki "en" boʻlishi mumkin.'
      });
    }

    if (videoQuality && !['1080p', '720p', 'auto'].includes(videoQuality)) {
      return res.status(400).json({
        success: false,
        message: 'Video sifati "1080p", "720p" yoki "auto" boʻlishi kerak.'
      });
    }

    // Qiymatlarni xavfsiz birlashtirish (merge)
    const updatedSettings: FullUserSettings & { passwordHash: string } = {
      ...currentSettings,
      firstName: firstName !== undefined ? String(firstName).trim() : currentSettings.firstName,
      lastName: lastName !== undefined ? String(lastName).trim() : currentSettings.lastName,
      email: email !== undefined ? String(email).trim().toLowerCase() : currentSettings.email,
      phone: phone !== undefined ? String(phone).trim() : currentSettings.phone,
      bio: bio !== undefined ? String(bio).trim() : currentSettings.bio,
      avatarUrl: avatarUrl !== undefined ? String(avatarUrl) : currentSettings.avatarUrl,
      emailNotifications: emailNotifications !== undefined ? Boolean(emailNotifications) : currentSettings.emailNotifications,
      pushNotifications: pushNotifications !== undefined ? Boolean(pushNotifications) : currentSettings.pushNotifications,
      telegramNotifications: telegramNotifications !== undefined ? Boolean(telegramNotifications) : currentSettings.telegramNotifications,
      theme: theme !== undefined ? theme : currentSettings.theme,
      language: language !== undefined ? language : currentSettings.language,
      videoQuality: videoQuality !== undefined ? videoQuality : currentSettings.videoQuality,
      autoplay: autoplay !== undefined ? Boolean(autoplay) : currentSettings.autoplay,
      updatedAt: new Date().toISOString()
    };

    mockSettingsDatabase[userId] = updatedSettings;

    const { passwordHash, ...safeResult } = updatedSettings;

    return res.status(200).json({
      success: true,
      message: 'Sozlamalar muvaffaqiyatli saqlandi!',
      data: safeResult
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Sozlamalarni saqlashda server xatoligi yuz berdi.',
      error: error?.message
    });
  }
});

/**
 * POST /api/settings/change-password
 * Joriy parolni tekshirib, yangi parol o'rnatish
 */
settingsRouter.post('/change-password', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'usr-1790609793310';
    const settings = mockSettingsDatabase[userId];

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi hisobi topilmadi.'
      });
    }

    const { currentPassword, newPassword, confirmPassword }: ChangePasswordRequest = req.body;

    // 1. Maydonlarni to'liqligini tekshirish
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Barcha parol maydonlarini toʻldirish shart.'
      });
    }

    // 2. Yangi parollar bir xilligini tekshirish
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Yangi parollar bir-biriga mos kelmadi.'
      });
    }

    // 3. Yangi parol uzunligi va xavfsizligini tekshirish
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Yangi parol kamida 6 ta belgidan iborat boʻlishi kerak.'
      });
    }

    // 4. Joriy parolni tekshirish (haqiqiy bcrypt.compare(currentPassword, settings.passwordHash))
    // Hozirgi development sharoitida oddiy tekshiruv (yoki '123456'):
    const isCurrentPasswordCorrect = currentPassword === '123456' || currentPassword.length >= 6;
    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Joriy parol notoʻgʻri kiritildi.'
      });
    }

    // 5. Yangi parolni xeshlash va saqlash
    // Haqiqiy backendda: const newHash = await bcrypt.hash(newPassword, 10);
    const newHash = `$2b$10$mockHash_${Date.now()}`;
    settings.passwordHash = newHash;
    settings.updatedAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      message: 'Xavfsizlik paroli muvaffaqiyatli oʻzgartirildi! Yangi parol faollashtirildi.'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Parolni oʻzgartirishda kutilmagan xatolik yuz berdi.',
      error: error?.message
    });
  }
});
