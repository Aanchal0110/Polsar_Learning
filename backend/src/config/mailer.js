const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aumteli2002@gmail.com",
    pass: "eild ibjv ouhl cszr",
  },
});

/**
 * Send an email with OTP
 * @param {string} to - Recipient email
 * @param {string} otp - OTP Code
 */
const sendOTPEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: "aumteli2002@gmail.com",
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <b>${otp}</b></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

module.exports = sendOTPEmail;
