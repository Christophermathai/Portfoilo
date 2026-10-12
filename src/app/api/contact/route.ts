import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please enter a message.' },
        { status: 400 }
      );
    }

    let apiKey = process.env.RESEND_API_KEY;
    let recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'christophermathai123@gmail.com';
    const timestamp = new Date().toISOString();

    // Fallback: If dev server was started before .env was written, read directly from .env
    if (!apiKey) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envPath = path.join(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, 'utf8');
          const keyMatch = content.match(/RESEND_API_KEY=([^\r\n]+)/);
          if (keyMatch) apiKey = keyMatch[1].trim();
          const emailMatch = content.match(/CONTACT_NOTIFICATION_EMAIL=([^\r\n]+)/);
          if (emailMatch) recipientEmail = emailMatch[1].trim();
        }
      } catch (err) {
        console.warn('Could not read .env file directly:', err);
      }
    }

    // 1. Server terminal / cloud execution log
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📨 [DIRECT TRANSMISSION RECEIVED]');
    console.log(`⏰ Time:    ${timestamp}`);
    console.log(`👤 From:    ${name.trim()} <${email.trim()}>`);
    console.log(`💬 Message: ${message.trim()}`);
    console.log(`🔑 Resend:  ${apiKey ? 'Configured (' + apiKey.slice(0, 7) + '...)' : 'Not configured'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    let emailDispatched = false;
    let emailError: unknown = null;

    // 2. Dispatch via Resend (https://resend.com) if API key configured
    if (apiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: email.trim(),
            subject: `🚀 Portfolio Message from ${name.trim()}`,
            text: `You received a new message from your portfolio direct transmission form:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nTime: ${timestamp}\n\nMessage:\n${message.trim()}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0c0c0d; color: #f0f0f2; border: 1px solid #27272a; border-radius: 8px;">
                <div style="font-size: 11px; font-family: monospace; color: #ff3d00; letter-spacing: 0.1em; margin-bottom: 8px;">// DIRECT TRANSMISSION</div>
                <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #ffffff;">New Portfolio Message</h2>
                <div style="background: #18181b; padding: 16px; border-radius: 6px; border: 1px solid #27272a; margin-bottom: 20px;">
                  <p style="margin: 0 0 8px; font-size: 14px;"><strong style="color: #a1a1aa;">Sender:</strong> ${name.trim()}</p>
                  <p style="margin: 0 0 8px; font-size: 14px;"><strong style="color: #a1a1aa;">Email:</strong> <a href="mailto:${email.trim()}" style="color: #ff3d00;">${email.trim()}</a></p>
                  <p style="margin: 0; font-size: 12px; color: #71717a;"><strong>Dispatched:</strong> ${timestamp}</p>
                </div>
                <div style="background: #141416; padding: 18px; border-radius: 6px; border-left: 3px solid #ff3d00;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #e4e4e7;">${message.trim()}</p>
                </div>
              </div>
            `,
          }),
        });

        const resendData = await resendResponse.json();
        if (!resendResponse.ok) {
          console.warn('[RESEND DISPATCH NOTICE]:', resendData);
          emailError = resendData;
        } else {
          console.log(`✅ [EMAIL DISPATCHED TO]: ${recipientEmail}`, resendData);
          emailDispatched = true;
        }
      } catch (emailErr) {
        console.error('[EMAIL DISPATCH ERROR]:', emailErr);
        emailError = emailErr instanceof Error ? emailErr.message : String(emailErr);
      }
    }

    // 3. Dispatch via Discord / Webhook if webhook URL is configured
    if (process.env.CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 **New Portfolio Transmission**\n**From:** ${name.trim()} (${email.trim()})\n**Message:**\n${message.trim()}`,
          }),
        });
      } catch (hookErr) {
        console.error('[WEBHOOK DISPATCH ERROR]:', hookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message dispatched successfully. Christopher will get back to you shortly.',
        emailDispatched,
        ...(emailError ? { emailNotice: emailError } : {}),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message transmission.' },
      { status: 500 }
    );
  }
}
