const pool = require("../database");

//todos los panas
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM profiles", (err, rows) => {
      console.log(rows);
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const searchUser = (search) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT profile_id, name FROM profiles WHERE name LIKE '%" +
        search +
        "%' OR name LIKE '" +
        search +
        "%'OR name LIKE '%" +
        search +
        "'",
      (err, rows) => {
        console.log(rows);
        if (err) reject(err);
        resolve(rows.rows);
      }
    );
  });
};

//todos los panas pero solo el id
const getAllId = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT profile_id FROM profiles", (err, rows) => {
      if (err) reject(err);
      console.log(rows);
      resolve(rows);
    });
  });
};

//registro de usuario
const insert = ({ name, email, password, phone }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO profiles (name,email,password,phone) VALUES($1,$2,$3,$4)",
      [name, email, password, phone],
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
    pool.query(
      "SELECT * FROM profiles WHERE email = $1",
      [email],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows.rows[0]);
      }
    );
  });
};

const getByPhone = (phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM profiles WHERE phone = $1",
      [phone],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows.rows[0]);
      }
    );
  });
};

const getById = (pId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM profiles WHERE profile_id =$1",
      [pId],
      (err, rows) => {
        if (err) reject(err);
        console.log(rows.rows[0]);
        resolve(rows.rows[0]);
      }
    );
  });
};

const update = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE profiles SET education = $1, skills = $2, name = $3, password = $4, country = $5, postal_code = $6, age = $7 WHERE profile_id = $8",
      [
        data.body.education,
        data.body.skills,
        data.body.name,
        data.body.pass,
        data.body.country,
        data.body.postal_code,
        data.body.age,
        data.id,
      ],
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

const deleteUser = ({ id, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO profiles (name,email,password,phone) VALUES($1,$2,$3,$4)",
      [name, email, password, phone],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getById,
  getAll,
  getAllId,
  insert,
  getByEmail,
  getByPhone,
  update,
  deleteUser,
  searchUser,
};
