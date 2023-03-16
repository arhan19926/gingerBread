import { createTransport } from 'nodemailer';
export const sendEmail = async (
  to: string | string[],
  subject: string,
  message: string,
  html: string,
) => {
  try {
    const { EMAIL_PASSWORD } = process.env;
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: 'bread.ginger19926@gmail.com',
        pass: `${EMAIL_PASSWORD}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transport.sendMail({
      to,
      subject,
      text: message,
      html: html,
      from: 'bread.ginger19926@gmail.com',
    });
    return true;
  } catch (e) {
    throw e;
  }
};
