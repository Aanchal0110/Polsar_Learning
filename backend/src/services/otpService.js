require("dotenv").config();
const otpStore = new Map();
const EXPIRY_MS = parseInt(process.env.OTP_EXPIRY_MINUTES || "5") * 60 * 1000;

function storeOTP(email, otp) {
  const expiresAt = Date.now() + EXPIRY_MS;
  otpStore.set(email, { otp, expiresAt });
  // console.log(otpStore);
  setTimeout(() => {
    otpStore.delete(email);
  }, EXPIRY_MS);

  return Promise.resolve();
}

function getStoredOTP(email) {
  const record = otpStore.get(email);
  if (!record || Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return null;
  }
  return record;
}

function deleteOTP(email) {
  otpStore.delete(email);
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

module.exports = { storeOTP, getStoredOTP, deleteOTP, generateOTP };