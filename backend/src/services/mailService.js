const nodemailer = require('nodemailer');
const logger = require("./logger.js")

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const emailService = {
  async sendVerificationEmail(email, token) {
    try {
      const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
      
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: email,
        subject: 'Verify Your Email',
        html: `
          <p>Please click the following link to verify your email:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        `
      });
      
      logger.info(`Verification email sent to ${email}`);
    } catch (err) {
      logger.error('Error sending verification email', err);
      throw err;
    }
  },
  
  async sendPasswordResetEmail(email, token) {
    try {
      const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
      
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to set a new password:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>This link will expire in 1 hour.</p>
        `
      });
      
      logger.info(`Password reset email sent to ${email}`);
    } catch (err) {
      logger.error('Error sending password reset email', err);
      throw err;
    }
  }
};

module.exports = emailService;