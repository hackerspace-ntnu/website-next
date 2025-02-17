import { env } from '@/env';
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

function isEmailServiceConfigured() {
  return (
    env.EMAIL_FROM_ADDRESS && env.EMAIL_FROM_PASSWORD && env.EMAIL_REPLY_TO
  );
}

async function sendEmail(
  Email: React.ReactElement,
  subject: string,
  recipientEmailAddress: string,
) {
  if (!isEmailServiceConfigured()) {
    console.log(
      `Email with subject ${subject} to ${recipientEmailAddress} will not be sent since the email service is not configured.`,
    );
    return;
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

  await transporter.verify();

  const emailHtml = await render(Email);

  const emailPlainText = await render(Email, {
    plainText: true,
  });

  const options = {
    from: env.EMAIL_FROM_ADDRESS,
    to: recipientEmailAddress,
    replyTo: env.EMAIL_REPLY_TO,
    subject,
    html: emailHtml,
    text: emailPlainText,
  };

  return await transporter.sendMail(options);
}

export { sendEmail };
