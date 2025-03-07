import { env } from '@/env';
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

function isEmailServiceConfigured() {
  return (
    env.EMAIL_FROM_ADDRESS && env.EMAIL_FROM_PASSWORD && env.EMAIL_REPLY_TO
  );
}

async function sendEmail<T extends Record<string, unknown>>(
  EmailComponent: React.ComponentType<T>,
  props: T,
  subject: string,
  recipientEmailAddress: string,
) {
  try {
    if (!isEmailServiceConfigured()) {
      console.log(
        `Email with subject ${subject} to ${recipientEmailAddress} will not be sent since the email service is not configured.`,
      );
      return { success: false, reason: 'not_configured' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_FROM_ADDRESS,
        pass: env.EMAIL_FROM_PASSWORD,
      },
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email transport verification failed:', verifyError);
      return {
        success: false,
        reason: 'transport_verification_failed',
        error: verifyError,
      };
    }

    const Email = <EmailComponent {...props} />;

    const emailHtml = await render(Email);
    const emailPlainText = await render(Email, { plainText: true });

    const options = {
      from: env.EMAIL_FROM_ADDRESS,
      to: recipientEmailAddress,
      replyTo: env.EMAIL_REPLY_TO,
      subject,
      html: emailHtml,
      text: emailPlainText,
    };

    const result = await transporter.sendMail(options);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error(`Failed to send email to ${recipientEmailAddress}:`, error);
    return {
      success: false,
      reason: 'send_failure',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export { sendEmail };
