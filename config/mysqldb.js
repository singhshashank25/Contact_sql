require("dotenv").config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port:process.env.port
});

module.exports = db;    