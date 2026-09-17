const { query } = require("../config/database");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { generateOTP, getStoredOTP, deleteOTP, storeOTP } = require("../services/otpService");
const { sendEmail } = require("../services/mailService");
require("dotenv").config();

const SALT_ROUNDS = Number(process.env.SALT_ROUND);

const UserModel = {
  init() {
    const sql = fs.readFileSync(path.join(__dirname, "../models/user_schema.sql"), 'utf8');
    return query(sql);
  },

  async insert({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const sql = `INSERT INTO "User" (UserName, Email, Password) VALUES ($1, $2, $3) RETURNING Uid, UserName, Email`;
    const result = await query(sql, [username, email, hashedPassword]);
    return result.rows[0];
  },

  async delete_data(email) {
    const sql = `DELETE FROM "User" WHERE Email = $1 RETURNING Uid, UserName, Email`;
    const result = await query(sql, [email]);
    return result.rows[0];
  },

  async update_data({ email, username, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const sql = `
      UPDATE "User"
      SET UserName = $1, Password = $2
      WHERE Email = $3
      RETURNING Uid, UserName, Email`;
    const result = await query(sql, [username, hashedPassword, email]);
    return result.rows[0];
  },

  async find_by_email(email) {
    const sql = `SELECT * FROM "User" WHERE Email = $1`;
    const result = await query(sql, [email]);
    return result.rows[0]; // returns password too, handle carefully in controller
  }
};

const UserController = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const user = await UserModel.insert({ username, email, password });
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password required" });
      }

      const user = await UserModel.find_by_email(email);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { uid: user.uid, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || "1h" }
      );

      res.json({ success: true, token }); // You can also return safe user info
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Example of a protected route
  async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await UserModel.find_by_email(email);
      if (user) {
        const { password, ...safeUser } = user;
        res.json({ success: true, data: safeUser });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async sendOtp(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
  
    const otp = generateOTP();
    await storeOTP(email, otp);
  
    try {
      await sendEmail(email, otp);
      res.json({ message: 'OTP sent successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  },
  verifyOtp(req, res){
    // console.error(req.body);
    const { email, otp } = req.body;
    const stored = getStoredOTP(email);
    // console.log(stored);
  
    if (!stored) return res.status(400).json({ error: 'OTP not found or expired' });
    if (stored.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
  
    deleteOTP(email);
    res.json({ message: 'Email verified successfully!' });
  },
  async contactMessage(req, res) {
    try {
      const { name, email, subject, message } = req.body || {};
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      // Try email via Resend
      try {
        await sendEmail(process.env.CONTACT_TO_EMAIL || 'scientific@inficorridor.in', `${subject} — from ${name} <${email}>\n\n${message}`);
      } catch (e) {
        // swallow to avoid hard failure
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = {
  UserModel,
  UserController
}
