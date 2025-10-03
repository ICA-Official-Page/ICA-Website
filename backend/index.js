import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path';

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://ica-website-w4rr.onrender.com",
  credentials: true
},

)); // add the frontend URI 

app.use(express.json());

app.post('/send-mail', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    // console.log('come ')
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    // Construct HTML content for the email using contact form data
    const htmlContentofMail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h2 {
            color: #1e40af;
            text-align: center;
          }
          p {
            color: #333333;
            line-height: 1.6;
          }
          .info-box {
            background-color: #e0e7ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin-top: 20px;
            font-family: monospace;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #888888;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div class="info-box">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>This message was sent from the ICA Website Contact Form.</p>
          <div class="footer">© ${new Date().getFullYear()} ICA. All rights reserved.</div>
        </div>
      </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // 465 ke saath true hota hai, 587 ke saath false
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS, // yahan app password use karo
      },
    });


    const mailOptions = {
      from: `"ICA Website Contact" <${process.env.USER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL || process.env.USER_EMAIL, // aapka contact form mail receive karne wala email
      subject: `Contact Form: ${subject}`,
      html: htmlContentofMail,
      replyTo: email,
    };

    let info = await transporter.sendMail(mailOptions);

    // Success response
    res.json({ message: "Email sent successfully", info });

  } catch (error) {
    console.error('Error while sending mail:', error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('/*allroutes', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () => console.log(`Server successfully runs on port ${process.env.PORT}`))
