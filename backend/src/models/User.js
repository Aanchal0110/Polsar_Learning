const { query } = require("../config/database");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const logger = require("../services/logger");
require("dotenv").config();

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

const User = {
    async initTable() {
        
    }
}