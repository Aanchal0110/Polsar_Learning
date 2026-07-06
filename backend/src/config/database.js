require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../services/logger'); // Assuming you have a logger setup

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: false 
  } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 60000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection not established
});

// Event listeners for connection pool
pool.on('connect', () => {
  logger.info('Database connection established');
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  // In production, you might want to implement reconnection logic here
  process.exit(-1);
});

pool.on('remove', () => {
  logger.info('Client removed from pool');
});

// Test the connection immediately
// (async () => {
//   try {
//     const client = await pool.connect();
//     const res = await client.query('SELECT NOW()');
//     logger.info('Database connection test successful:', res.rows[0]);
//     client.release();
//   } catch (err) {
//     logger.error('Database connection test failed:', err);
//     process.exit(1);
//   }
// })();

// Export methods
module.exports = {
  /**
   * Execute a query
   * @param {string} text - SQL query
   * @param {Array} params - Query parameters
   * @returns {Promise<QueryResult>}
   */
  query: (text, params) => {
    const start = Date.now();
    return pool.query(text, params)
      .then((result) => {
        const duration = Date.now() - start;
        logger.debug(`Executed query in ${duration}ms`, { text, duration });
        return result;
      })
      .catch((err) => {
        logger.error('Query execution error:', { text, params, error: err.message });
        throw err;
      });
  },
  
  /**
   * Get a client from the pool for transactions
   * @returns {Promise<PoolClient>}
   */
  getClient: async () => {
    const client = await pool.connect();
    
    // Set a timeout for this client
    const timeout = setTimeout(() => {
      logger.warn('Client has been checked out for more than 30 seconds!');
    }, 30000);
    
    // Monkey patch the release method to clear the timeout
    const originalRelease = client.release.bind(client);
    client.release = () => {
      clearTimeout(timeout);
      originalRelease();
    };
    
    return client;
  },
  
  /**
   * Execute a transaction
   * @param {Function} callback - Async function containing transaction logic
   * @returns {Promise<any>}
   */
  transaction: async (callback) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      logger.error('Transaction failed:', err);
      throw err;
    } finally {
      client.release();
    }
  },
  
  // For graceful shutdown
  close: async () => {
    await pool.end();
    logger.info('Database pool closed');
  }
};