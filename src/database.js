require("dotenv").config();
const postgres = require("pg");

const pool = new postgres.Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  password: process.env.DBPASS,
  database: process.env.DB,
  port: process.env.DBPORT,
  ssl: { rejectUnauthorized: false },
});

// const pool =new postgres.Pool({

//     user: 'postgres',
//     host: 'localhost',
//     password: 'princho4',
//     database: 'notesapp',
//     port: '5432'
// });

module.exports = pool;
