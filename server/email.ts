import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

function isEmailConfigured() {
  return !!(SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_EMAIL);
}

export async function sendContactNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}) {
  if (!isEmailConfigured()) {
    console.log("[email] SMTP not configured — skipping notification email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"ICONIC Distributions" <${SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Contact Message from ${data.firstName} ${data.lastName}`,
    text: [
      `You have a new contact message. Log in to the admin console to view the full details.`,
      ``,
      `From: ${data.firstName} ${data.lastName} <${data.email}>`,
      ``,
      `Log in at: https://iconic-distributions.replit.app/admin`,
    ].join("\n"),
  });
}
