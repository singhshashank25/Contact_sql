require("dotenv").config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 's07092001.',
    database: 'contact'
});

module.exports = db;    