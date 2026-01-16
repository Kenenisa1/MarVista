import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const SendEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kenenisamiesob@gmail.com',
      replyTo: email,
      subject: subject || `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from Market Preview Contact Form</em></p>
      `,
      text: `
        New Contact Form Submission
        Name: ${name}
        Email: ${email}
        Subject: ${subject || 'Not specified'}
        Message: ${message}
        
        Sent from Market Preview Contact Form
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
}