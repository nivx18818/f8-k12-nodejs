// import mysql from "mysql2/promise";
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "17832056",
  database: "re_discord_db",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = db;
