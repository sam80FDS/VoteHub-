const sql = require('mssql');

// Configure the database connection
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server', // e.g., localhost or your server address
    database: 'your_database_name',
    options: {
        encrypt: true, // For Azure SQL Database
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

// Create a connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Function to execute a query
const executeQuery = async (query) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error('SQL error:', err);
    }
};

// Exporting functions
module.exports = {
    executeQuery
};
