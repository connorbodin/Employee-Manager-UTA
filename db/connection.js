// Import and require mysql2
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'cbodin325711!!@@##',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;