const { Pool } = require("pg");
const { checkToken } = require("../config/configjwt");
const pool = require("../database");
const jwt_decode = require("jwt-decode");

const getAllNOtes = (req, res) => {
  var decoded = jwt_decode(req.headers.authorization);
  var id = JSON.stringify(decoded.id);
  const promise = new Promise(async (resolve, reject) => {
    await pool.query(
      "SELECT * FROM textnotes WHERE usersid=$1 ",
      [id],
      (err, rows) => {
        if (err) {
          console.log(rows);
          reject(err);
        } else {
          console.log(rows);
          res.status(200).json(rows.rows);
        }
      }
    );
  });

  promise.then((values) => {
    console.log("PROMISE" + res.json(values));
  });
};

// {
//   notetitle,
//   notetext,
//   notecheck,
//   notepriority,
//   notedate,
//   notetimeleft,
// }

//creacion de notas

const createNotes = (req, res) => {
  var decoded = jwt_decode(req.headers.authorization);
  var id = JSON.stringify(decoded.id);
  var users_id = id;
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO textnotes(notetitle,notetext,notecheck,notepriority,notedate,notetimeleft,usersid) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [
        req.body.notetitle,
        req.body.notetext,
        req.body.notecheck,
        req.body.notepriority,
        req.body.notedate,
        req.body.notetimeleft,
        users_id,
      ],
      (err, result) => {
        if (err) {
          res.status(505);
          reject(err);
        }
        if (result) {
          console.log("result");
          resolve(result);
        }
      }
    );
  });
};

const deleteNotesbyID = ({
  notetitel,
  notetext,
  notecheck,
  notepriority,
  notedate,
  notetimeleft,
  emailuser,
}) => {
  const id = req.usersid;
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM textnotes WHERE usersid = $1",
      [textnotesid],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

const updateNoteById = ({
  id,
  notetitel,
  notetext,
  notecheck,
  notepriority,
  notedate,
  notetimeleft,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      " UPDATE  textnotes SET notetitel = $2, notetext =$3,notecheck=$4,notepriority=$5,notedate=$6,notetimeleft=$7, WHERE textnoteid = $1",
      [
        id,
        notetitel,
        notetext,
        notecheck,
        notepriority,
        notedate,
        notetimeleft,
        emailuser,
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

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

module.exports = { createNotes, updateNoteById, deleteNotesbyID, getAllNOtes };
