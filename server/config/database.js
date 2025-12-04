const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'explore_holidays',
  connectionLimit: 10,
  acquireTimeout: 30000,
  connectTimeout: 30000
});

// Test connection
async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('✅ MariaDB Connected Successfully');
    return true;
  } catch (err) {
    console.error('❌ MariaDB Connection Failed:', err.message);
    return false;
  } finally {
    if (conn) conn.release();
  }
}

// Initialize database tables
async function initializeDatabase() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // Packages table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS packages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255),
        description TEXT,
        description_bn TEXT,
        destination VARCHAR(255),
        price DECIMAL(10, 2),
        currency VARCHAR(10) DEFAULT 'BDT',
        duration VARCHAR(50),
        image_url VARCHAR(500),
        category ENUM('holiday', 'land', 'group_tour', 'honeymoon') DEFAULT 'holiday',
        is_popular BOOLEAN DEFAULT FALSE,
        is_featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Services table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255),
        description TEXT,
        description_bn TEXT,
        icon VARCHAR(100),
        image_url VARCHAR(500),
        is_latest BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Flights table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS flights (
        id INT PRIMARY KEY AUTO_INCREMENT,
        origin VARCHAR(100) NOT NULL,
        destination VARCHAR(100) NOT NULL,
        airline VARCHAR(100),
        price DECIMAL(10, 2),
        currency VARCHAR(10) DEFAULT 'BDT',
        departure_time DATETIME,
        arrival_time DATETIME,
        flight_class ENUM('economy', 'business', 'first') DEFAULT 'economy',
        available_seats INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Visas table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS visas (
        id INT PRIMARY KEY AUTO_INCREMENT,
        country VARCHAR(100) NOT NULL,
        visa_type VARCHAR(100),
        processing_time VARCHAR(50),
        price DECIMAL(10, 2),
        currency VARCHAR(10) DEFAULT 'BDT',
        requirements TEXT,
        requirements_bn TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Content pages table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        slug VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255),
        content TEXT,
        content_bn TEXT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Partners table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        logo_url VARCHAR(500),
        website_url VARCHAR(500),
        partner_type ENUM('bank', 'airline', 'hotel', 'other') DEFAULT 'other',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables initialized');
    return true;
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    return false;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};
