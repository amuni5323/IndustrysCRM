// Import required modules
require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

// Create the express app
const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Match your frontend URL
}));
app.use(bodyParser.json());

// API Route for sending registration email
app.post("/api/send-registration", async (req, res) => {
  const {
    email,
    company_name,
    logo_url,
    description,
    about_us,
    contact_info,
    footer_links,
    footer_icons,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `📩 New Company Registration: ${company_name}`,
    html: `
      <h2>New Company Registration</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company Name:</strong> ${company_name}</p>
      ${logo_url ? `<p><img src="${logo_url}" alt="Logo" height="80" /></p>` : ''}
      <p><strong>Description:</strong><br>${description}</p>
      <p><strong>About Us:</strong><br>${about_us}</p>
      <p><strong>Contact Info:</strong><br>${contact_info}</p>
      <p><strong>Footer Links:</strong></p>
      <ul>
        ${footer_links?.map((link) => `<li>${link.name}: <a href="${link.url}">${link.url}</a></li>`).join('') || ''}
      </ul>
      <p><strong>Footer Icons:</strong> ${footer_icons?.join(', ')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Optional: Serve frontend files (for SPA deployment)
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
