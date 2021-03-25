const jsonwebtoken = require("jsonwebtoken");
const pool = require("../database");
const { getById } = require("../models/users");
function verifyToken(req, res, next) {
  // const token = req.headers['Authorization'];
  var token = req.headers.authorization.split(" ")[1];
  if (!token) {
    console.log(token);
    return res.status(401).json({
      auth: false,
      message: "no token provided",
    });
  }
  console.log(token);
  const decode = jsonwebtoken.verify(token, "eltermo");
  console.log(decode.id);
  req.userid = decode.id;
  res.status(200).json("activo con el token");
  console.log(decode);
  next();
}

async function refreshToken(req, res) {
  var refreshTk = req.headers.authorization.split(" ")[1];
  if (!refreshTk)
    return res.status(402).json({
      refresh: false,
    });
  const usertk = req.userid;

  try {
    const verfi = jsonwebtoken.verify(refreshTk, "eltermo");
    const userRf = await getById(usertk);
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ refresh: null, messages: "que te puedo decir pana no funciona" });
  }
  const token = jsonwebtoken.sign({ id: userRf.usersid }, "eltermo", {
    expiresIn: 60 * 60,
  });
  res.json({ auth: true, token: token });
}

module.exports = { verifyToken, refreshToken };
