import nodemailer from 'nodemailer';

export async function sendPurchaseRequestEmail(to: string, data: { name: string, email: string, phone: string, message: string }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'New Purchase Request',
    text: `
A new purchase request has been submitted.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Email error:', err);
    return false;
  }
}
