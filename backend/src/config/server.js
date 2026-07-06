require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    staticFiles: 'public',
    rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100
    }
}