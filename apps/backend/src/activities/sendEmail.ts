// Main Send MAil Activity
import nodemailer, { SentMessageInfo } from 'nodemailer';

const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<SentMessageInfo> => {
    const mailService = process.env.MAIL_SERVICE || '';
    const mailUser = process.env.MAIL_USER || '';
    const mailPass = process.env.MAIL_PASS || '';

    if (!mailService || !mailUser || !mailPass) {
      return {error: 'Missing mail credentials'};
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: mailService,
      auth: { user: mailUser, pass: mailPass },
    });

    const mailOptions = {
      from: mailUser,
      to,
      subject,
      html,
    };

    return await transporter.sendMail(mailOptions);
};

export default sendEmail;
