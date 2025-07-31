import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { env } from '@/env';

let transporter: nodemailer.Transporter | null = null;

function isEmailServiceConfigured() {
  return (
    env.EMAIL_FROM_ADDRESS && env.EMAIL_FROM_PASSWORD && env.EMAIL_REPLY_TO
  );
}

async function getEmailTransporter() {
  if (transporter) return transporter;

  const newTransporter = nodemailer.createTransport({
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
    await newTransporter.verify();
    transporter = newTransporter;
    return transporter;
  } catch (verifyError) {
    console.error('Email transport verification failed:', verifyError);
    return null;
  }
}

async function sendEmail<T extends Record<string, unknown>>(
  EmailComponent: React.ComponentType<T>,
  props: T,
  subject: string,
  recipientEmailAddress: string,
) {
  if (!isEmailServiceConfigured()) {
    return console.log(
      `Email with subject ${subject} to ${recipientEmailAddress} will not be sent since the email service is not configured.`,
    );
  }

  const emailTransporter = await getEmailTransporter();
  if (!emailTransporter) {
    return console.log('Email transporter is not available.');
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

  return await emailTransporter.sendMail(options);
}

export { sendEmail };
