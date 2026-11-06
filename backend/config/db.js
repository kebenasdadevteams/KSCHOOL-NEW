const mysql2 = require('mysql2/promise');

let pool;

if (process.env.MYSQL_URL) {
  pool = mysql2.createPool(process.env.MYSQL_URL);
} else {
  pool = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kschool_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    connectTimeout: 60000,
  });
}

async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    console.log(`📊 Database: ${process.env.DB_NAME || 'kschool_db'}`);
    console.log(`👤 User: ${process.env.DB_USER || 'root'}`);
    connection.release();
    return true;
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    console.error('💡 Please check your database credentials in .env file');
    console.error(`   DB_HOST: ${process.env.DB_HOST || '(not configured)'}`);
    console.error(`   DB_USER: ${process.env.DB_USER || 'root'}`);
    console.error(`   DB_NAME: ${process.env.DB_NAME || 'kschool_db'}`);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };