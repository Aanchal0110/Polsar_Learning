const otpGenerator = require("otp-generator");

// In-memory OTP store (Use a DB like Redis in production)
const otpStore = {};

/**
 * Generate OTP and store it temporarily
 * @param {string} email - The user's email
 * @returns {string} The generated OTP
 */
const generateOTP = (email) => {
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 minutes
  return otp;
};

/**
 * Verify OTP
 * @param {string} email - The user's email
 * @param {string} otp - The OTP entered by the user
 * @returns {boolean} True if OTP is valid, else false
 */
const verifyOTP = (email, otp) => {
  if (!otpStore[email]) return false;
  const { otp: storedOtp, expiresAt } = otpStore[email];

  if (Date.now() > expiresAt) {
    delete otpStore[email]; // OTP expired
    return false;
  }

  if (storedOtp === otp) {
    delete otpStore[email]; // OTP used successfully
    return true;
  }

  return false;
};

module.exports = { generateOTP, verifyOTP };
