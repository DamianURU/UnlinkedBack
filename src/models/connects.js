const pool = require("../database");

//todos los panas
const getPending = (user_one_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM contacts where state = 2 and user_one_id = $1",
      [user_one_id],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const getConnect = (user_one_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM contacts where state = 1 and user_one_id = $1",
      [user_one_id],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const getBlocked = (user_one_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM contacts where state = 3 and user_one_id = $1",
      [user_one_id],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const getAll = (user_one_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM contacts where user_one_id = $1",
      [user_one_id],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows.rows);
      }
    );
  });
};

//solicitar amigo amigo
const addConnect = (user_one_id, user_two_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO contacts (user_one_id, user_two_id, state, date) VALUES($1,$2,$3, CURRENT_DATE)",
      [user_one_id, user_two_id, 2],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

//bloquear a raul
const blockConnect = (user_one_id, user_two_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO contacts (user_one_id, user_two_id, state, date) VALUES($1,$2,$3, CURRENT_DATE)",
      [user_one_id, user_two_id, 3],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

//aceptar solicitud
const acceptConnect = (user_one_id, user_two_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE contacts SET state = 1 WHERE user_one_id = $1 and user_two_id = $2",
      [user_two_id, user_one_id],
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
  getPending,
  getConnect,
  getBlocked,
  getAll,
  addConnect,
  acceptConnect,
  blockConnect,
};
