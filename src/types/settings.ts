/**
 * "Ziyo Ta'lim" platformasi — Sozlamalar (Settings) modullari uchun TypeScript turlari
 */

export type AppTheme = 'light' | 'dark';
export type AppLanguage = 'uz' | 'ru' | 'en';
export type VideoQuality = '1080p' | '720p' | 'auto';

export interface UserPersonalSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
}

export interface UserNotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  telegramNotifications: boolean;
}

export interface UserInterfaceSettings {
  theme: AppTheme;
  language: AppLanguage;
}

export interface UserLearningSettings {
  videoQuality: VideoQuality;
  autoplay: boolean;
}

export interface ActiveSession {
  id: string;
  deviceName: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface FullUserSettings extends 
  UserPersonalSettings, 
  UserNotificationSettings, 
  UserInterfaceSettings, 
  UserLearningSettings {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SettingsApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
