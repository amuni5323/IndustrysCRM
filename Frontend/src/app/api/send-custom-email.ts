// src/pages/api/send-custom-email.ts

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendCustomEmail = async (customerEmail: string, companySlug: string, message: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: customerEmail, // Send email to the customer
    subject: `Message from ${companySlug}`,
    text: `Hello,

    ${message}

    Regards,
    ${companySlug} Team`,
  };

  return transporter.sendMail(mailOptions);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { customerEmail, companySlug, message } = JSON.parse(req.body);

    try {
      await sendCustomEmail(customerEmail, companySlug, message);
      res.status(200).json({ message: 'Custom email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
