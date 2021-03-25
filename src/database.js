const postgres = require("pg");

const pool = new postgres.Pool({
  user: "hkfowkwzkihypf",
  host: "ec2-3-91-127-228.compute-1.amazonaws.com",
  password: "188f040179ddee41f1e3f47bab1339b5fef35a6133291e40b3325057d0593ee4",
  database: "dbqpsm39s05pes",
  port: "5432",
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
