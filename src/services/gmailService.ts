import { getAccessToken } from './googleAuthService';

/**
 * UTF-8 safe Base64 URL safe encoder according to RFC 4648 § 5
 */
function toBase64Url(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function utf8ToBase64(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary);
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  dispatchedViaGmailApi: boolean;
  error?: string;
}

/**
 * Sends a high-priority 2FA verification code to the user's Gmail inbox
 * using the official Gmail REST API.
 */
export async function sendGmail2FACode(
  toEmail: string,
  code: string,
  recipientName: string = 'Foydalanuvchi'
): Promise<SendEmailResult> {
  const token = await getAccessToken();

  const subject = `ZiyoTalim Tasdiqlash Kodi: ${code}`;
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ZiyoTalim 2FA Xavfsizlik Tasdig'i</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 24px; color: #f8fafc;">
  <div style="max-width: 520px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 24px 28px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
        🎓 ZiyoTalim Akademiya
      </h1>
      <p style="color: #c7d2fe; margin: 6px 0 0 0; font-size: 13px;">
        Gmail Xavfsizlik & 2FA Himoya Tizimi
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 28px;">
      <p style="font-size: 15px; color: #cbd5e1; margin-top: 0;">
        Assalomu alaykum, <strong style="color: #ffffff;">${recipientName}</strong>!
      </p>
      
      <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
        Sizning ZiyoTalim platformasidagi akkauntingizga kirish (yoki roʻyxatdan oʻtish) soʻrovi yuborildi. Xavfsizlik maqsadida quyidagi bir martalik 6 xonali tasdiqlash kodini platformadagi oynaga kiriting:
      </p>

      <!-- Code Box -->
      <div style="margin: 28px 0; padding: 20px; background: #0f172a; border: 2px dashed #3b82f6; border-radius: 12px; text-align: center;">
        <span style="font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #38bdf8; font-family: monospace;">
          ${code}
        </span>
        <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
          ⏱ Ushbu kod 5 daqiqa davomida amal qiladi
        </div>
      </div>

      <div style="background: #0f172a; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0; font-size: 12px; color: #fbbf24; line-height: 1.5;">
          ⚠️ <strong>Eslatma:</strong> Bu kodni hech qachon begonalarga bermang! ZiyoTalim xodimlari sizdan parolingizni yoki tasdiqlash kodini soʻramaydi.
        </p>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
        Agar siz tizimga kirmagan boʻlsangiz, ushbu xabarni eʼtiborsiz qoldiring. Akkauntingiz Google xavfsizlik protokollari bilan himoyalangan.
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #090d16; padding: 16px 28px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #475569;">
      © 2026 ZiyoTalim Education Inc. | Google Workspace & Gmail Secure Integration
    </div>
  </div>
</body>
</html>
  `.trim();

  // Create RFC 2822 Raw Message with encoded subject
  const subjectEncoded = `=?utf-8?B?${utf8ToBase64(subject)}?=`;
  const rawMessage = [
    `To: <${toEmail}>`,
    `Subject: ${subjectEncoded}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlBody
  ].join('\r\n');

  const base64UrlMessage = toBase64Url(rawMessage);

  if (token) {
    try {
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: base64UrlMessage })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('Gmail API orqali xat yuborishda javob:', errorData);
        return {
          success: true,
          dispatchedViaGmailApi: false,
          error: errorData?.error?.message || 'Gmail API yuborish rad etildi'
        };
      }

      const result = await response.json();
      return {
        success: true,
        messageId: result.id,
        dispatchedViaGmailApi: true
      };
    } catch (err: any) {
      console.warn('Gmail API ulanishida ogohlantirish:', err);
      return {
        success: true,
        dispatchedViaGmailApi: false,
        error: err.message
      };
    }
  }

  return {
    success: true,
    dispatchedViaGmailApi: false
  };
}
