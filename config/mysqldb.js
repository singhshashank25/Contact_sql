// import mysql from 'mysql2/promise';
require("dotenv").config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.password,
    database: process.env.database
});

module.exports = db;    