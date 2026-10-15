/**
 * Brevo Transactional Email Service
 * Dispatches 6-digit OTP codes and 1-click magic access links directly to user's Gmail
 */

const BREVO_KEY =
  (import.meta.env.VITE_BREVO_API_KEY as string) ||
  (import.meta.env.BREVO_API_KEY as string) ||
  '';

export const isBrevoConfigured = (): boolean => {
  return typeof BREVO_KEY === 'string' && BREVO_KEY.trim().startsWith('xkeysib-');
};

export async function sendAccessEmailViaBrevo(
  recipientEmail: string,
  otpCode: string,
  magicLink: string,
  recipientName: string = 'Founder'
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!isBrevoConfigured()) {
    console.warn('Brevo API key is missing or not configured.');
    return {
      success: false,
      error: 'Brevo email service key is not configured in environment.'
    };
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Genesis Access Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F5F5F5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="540" style="max-width: 540px; background-color: #0B0B0D; border: 1px solid rgba(184, 167, 255, 0.25); border-radius: 24px; padding: 36px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
          
          <!-- Logo & Header -->
          <tr>
            <td align="center">
              <div style="display: inline-block; width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #B8A7FF, #9180FF); margin-bottom: 16px;">
                <table width="100%" height="100%">
                  <tr>
                    <td align="center" valign="middle" style="color: #050505; font-weight: bold; font-size: 20px;">G</td>
                  </tr>
                </table>
              </div>
              <h1 style="color: #F5F5F5; font-size: 22px; font-weight: 700; margin: 0 0 6px 0; letter-spacing: -0.5px;">GENESIS</h1>
              <p style="color: #B8A7FF; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 24px 0; font-family: monospace;">Venture Intelligence Platform</p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td align="center" style="padding: 0 10px 20px 10px;">
              <p style="color: #D1D1D6; font-size: 14px; line-height: 1.6; margin: 0;">
                Hello <strong>${recipientName}</strong>,<br>
                Here is your single-use verification code and instant 1-click access link to enter your Genesis venture workspace.
              </p>
            </td>
          </tr>

          <!-- Option A: 6-Digit OTP Code -->
          <tr>
            <td align="center" style="padding: 10px 0 24px 0;">
              <div style="background-color: #121216; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 20px 30px; display: inline-block;">
                <span style="font-size: 11px; text-transform: uppercase; color: #A7A7AD; letter-spacing: 2px; display: block; margin-bottom: 8px; font-family: monospace;">YOUR 6-DIGIT OTP CODE</span>
                <span style="font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #B8A7FF; font-family: monospace; display: block;">${otpCode}</span>
              </div>
              <p style="color: #74747B; font-size: 11px; margin: 10px 0 0 0;">Valid for 15 minutes. Do not share this code.</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding: 10px 0;">
              <div style="height: 1px; background: rgba(255,255,255,0.1); width: 80%; margin: 0 auto;"></div>
              <span style="background: #0B0B0D; padding: 0 12px; color: #74747B; font-size: 11px; text-transform: uppercase; position: relative; top: -8px;">OR SIGN IN WITH 1-CLICK</span>
            </td>
          </tr>

          <!-- Option B: Direct 1-Click Login Link -->
          <tr>
            <td align="center" style="padding: 14px 0 24px 0;">
              <a href="${magicLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #B8A7FF, #9180FF); color: #050505; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 36px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 30px rgba(184, 167, 255, 0.3);">
                Sign In with 1-Click →
              </a>
              <p style="color: #74747B; font-size: 11px; margin: 14px 0 0 0; word-break: break-all;">
                Or copy and open this link: <br>
                <a href="${magicLink}" style="color: #B8A7FF; text-decoration: underline;">${magicLink}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
              <p style="color: #55555C; font-size: 11px; margin: 0;">
                If you did not request this login code, you can safely disregard this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_KEY.trim(),
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'Genesis AI Platform',
          email: 'genesis@ventureintelligence.ai'
        },
        to: [{ email: recipientEmail.trim(), name: recipientName }],
        subject: `Your Genesis Access Code: ${otpCode} & Instant Access Link`,
        htmlContent
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Brevo API dispatch failed:', response.status, errText);
      return { success: false, error: `Brevo error (${response.status}): ${errText}` };
    }

    const data = await response.json();
    return { success: true, messageId: data?.messageId };
  } catch (err: any) {
    console.error('Brevo network exception:', err);
    return { success: false, error: err?.message || 'Failed to dispatch email via Brevo' };
  }
}
