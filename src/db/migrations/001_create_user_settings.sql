-- ============================================================================
-- Loyiha: "Ziyo Ta'lim" Ta'lim Platformasi
-- Migratsiya: 001_create_user_settings.sql
-- Tavsif: Foydalanuvchi sozlamalari, shaxsiy ma'lumotlari, xavfsizlik va
--         bildirishnomalar uchun to'liq PostgreSQL sxemasi.
-- ============================================================================

-- 1. UUID kengaytmasini faollashtirish (agar mavjud bo'lmasa)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Foydalanuvchi sozlamalari jadvali (user_settings)
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(128) NOT NULL UNIQUE,
    
    -- Shaxsiy ma'lumotlar
    first_name VARCHAR(100) NOT NULL DEFAULT '',
    last_name VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(30) DEFAULT '',
    bio TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',

    -- Xavfsizlik (parol xeshi)
    password_hash VARCHAR(255) NOT NULL,

    -- Bildirishnomalar (Notifications)
    email_notifications BOOLEAN NOT NULL DEFAULT true,
    push_notifications BOOLEAN NOT NULL DEFAULT true,
    telegram_notifications BOOLEAN NOT NULL DEFAULT false,

    -- Interfeys sozlamalari
    theme VARCHAR(10) NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
    language VARCHAR(10) NOT NULL DEFAULT 'uz' CHECK (language IN ('uz', 'ru', 'en')),

    -- O'quv jarayoni parametrlari
    video_quality VARCHAR(10) NOT NULL DEFAULT '1080p' CHECK (video_quality IN ('1080p', '720p', 'auto')),
    autoplay BOOLEAN NOT NULL DEFAULT true,

    -- Vaqt belgilari (Audit timestamps)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Faol sessiyalar jadvali (Active Sessions)
CREATE TABLE IF NOT EXISTS user_active_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(128) NOT NULL REFERENCES user_settings(user_id) ON DELETE CASCADE,
    device_name VARCHAR(100) NOT NULL, -- masalan: "MacBook Pro", "iPhone 15", "Windows PC"
    browser VARCHAR(100) NOT NULL,     -- masalan: "Chrome 128", "Safari 18", "Firefox"
    ip_address VARCHAR(45) NOT NULL,
    location VARCHAR(120) DEFAULT 'Toshkent, Oʻzbekiston',
    is_current BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Indekslar (Tezkor qidiruv va unumdorlik uchun)
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_email ON user_settings(email);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_active_sessions(user_id);

-- 5. Yangilanish vaqtini (updated_at) avtomatik o'zgartiruvchi trigger funksiyasi
CREATE OR REPLACE FUNCTION update_user_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_settings_updated_at ON user_settings;

CREATE TRIGGER trg_user_settings_updated_at
BEFORE UPDATE ON user_settings
FOR EACH ROW
EXECUTE FUNCTION update_user_settings_timestamp();

-- Izohlar (Documentation in DB)
COMMENT ON TABLE user_settings IS 'Ziyo Taʼlim talabalari va oʻqituvchilarining toʻliq shaxsiy va tizim sozlamalari';
COMMENT ON COLUMN user_settings.password_hash IS 'bcrypt orqali xeshlangan xavfsiz foydalanuvchi paroli';
COMMENT ON COLUMN user_settings.video_quality IS 'Darslar videopleyeri uchun standart sifat: 1080p, 720p yoki auto';
