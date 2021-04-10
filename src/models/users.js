const pool = require("../database");

//todos los panas
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

//registro de usuario
const insert = ({ email, password, name, phone }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (email,password,name,phone) VALUES($1,$2,$3,$4)",
      [email, password, name, phone],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

//obtener usuarios por su email

const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = $1", [email], (err, rows) => {
      if (err) reject(err);
      resolve(rows.rows[0]);
    });
  });
};

const getByPhone = (phone) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE phone = $1", [phone], (err, rows) => {
      if (err) reject(err);
      resolve(rows.rows[0]);
    });
  });
};

const getById = (pId) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WERHE id =$1", [pId], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const update = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET email = $1, password = $2, name = $3, WHERE usersid = $5",
      [data.email, data.password, data.name, data.id],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

module.exports = {
  getById,
  getAll,
  insert,
  getByEmail,
  getByPhone,
  update,
};
