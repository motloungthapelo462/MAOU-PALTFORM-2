import sendgrid from "@sendgrid/mail";
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  // Prefer SendGrid when API key is provided
  const sgKey = process.env.SENDGRID_API_KEY;
  if (sgKey) {
    try {
      sendgrid.setApiKey(sgKey);
      await sendgrid.send({
        to,
        from: process.env.SENDGRID_FROM || "no-reply@maou.app",
        subject,
        text,
        html,
      });
      return true;
    } catch (err) {
      console.error("SendGrid send error:", err);
      return false;
    }
  }

  // Fallback to SMTP if configured
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: port || 587,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@maou.app',
        to,
        subject,
        text,
        html,
      });
      return true;
    } catch (err) {
      console.error("SMTP send error:", err);
      return false;
    }
  }

  // No mailer configured — log and return false
  console.warn("No mailer configured (SENDGRID_API_KEY or SMTP_* env vars). OTP will not be emailed.");
  return false;
}

export default sendEmail;
