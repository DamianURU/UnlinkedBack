const jwt = require("jsonwebtoken");
const { getById } = require("../models/users");
require("dotenv").config();

function createToken(req, res, data) {
  jwt.sign(
    { data },
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24,
    },
    (err, token) => {
      if (err) res.sendStatus(403).json(err);
      res.set("Authorization", "Bearer " + token).sendStatus(200);
    }
  );
}

async function verifyToken(req, res, next) {
  var headers = req.headers["authorization"];
  if (headers === undefined) return res.sendStatus(403);
  var data = headers.split(" ");
  jwt.verify(data[1], process.env.SECRET, (err, token) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.token = token;
      next();
    }
  });
}

// function refreshToken(req, res, next) {
//   var header = req.headers["authorization"];
//   if (typeof header !== "undefined") {
//     token = header.split(" ");
//     jwt.verify(token[1], process.env.SECRET, function (err, decoded) {
//       if (err) {
//         res.err()
//       }
//       else {
//     next();
//       }
//     });

//   } else {
//     return res.sendStatus(403);
//   }
// }

module.exports = { verifyToken, createToken };
