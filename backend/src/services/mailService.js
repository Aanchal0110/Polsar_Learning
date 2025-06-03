const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (email, otp) => {
  return await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>`,
  });
};
