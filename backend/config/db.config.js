// Import the mysql2 module Promise Wrapper
const mysql = require("mysql2/promise");
// Prepare connection parameters we use to connect to the database
const dbConfig = {
  // port: 8889,
  connectionLimit: 10,
  // socketPath: process.env.DB_SOCKET_PATH,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  namedPlaceholders: true,
};
// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Prepare a function that will execute the SQL queries asynchronously

async function withTransaction(callback) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    await callback(connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}
// Export the query function for use in the application
module.exports = { query, withTransaction };
