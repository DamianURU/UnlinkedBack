const { Router } = require("express");
const routes = Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { createToken, verifyToken } = require("../config/auth");
const { verify } = require("jsonwebtoken");
require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

routes.post("/api/login", async (req, res) => {
  const user = await Users.getByEmail(req.body.email);
  if (user === undefined) return res.sendStatus(500);
  const equals = bcrypt.compareSync(req.body.password, user.password);
  if (!equals) return res.sendStatus(500);
  const data = {
    id: user.usersid,
    username: user.username,
    email: user.email,
  };
  createToken(req, res, data);
});

routes.post("/api/create", async (req, res) => {
  const verificationEmail = await Users.getByEmail(req.body.email);
  if (req.body.password.length < 8)
    return res.json({ error: "Password must be more than 8 characters long" });
  if (req.body.username.length < 2)
    return res.json({ error: "Username must be more than 2 characters long" });
  if (verificationEmail !== undefined)
    return res.status(500).send({ error: "Email already in use" });
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  client.verify
    .services(process.env.SERVICE_SID)
    .verifications.create({
      to: `+${req.body.phone}`,
      channel: "sms",
    })
    .then((data) => {
      res.sendStatus(200).send(data);
    });
  if (await verify(req, res)) const result = await Users.insert(req.body);
  if (result != null) return res.sendStatus(200);
  res.sendStatus(500);
});

async function verify(req, res) {
  client.verify
    .services(process.env.SERVICE_SID)
    .verificationChecks.create({
      to: `+${req.body.phone}`,
      code: req.body.code,
    })
    .then((data) => {
      res.status(200).send(data);
    });
}

routes.post("/api", verifyToken, async (req, res) => {
  console.log(req.token.data.id);
  console.log("paso el usuario");
  res.json({ message: "estas en la api" });
});

routes.post("/api/modify", verifyToken, async (req, res) => {
  console.log(req.token.data.id);
  // const data = {
  //   id: user.id,
  //   username: user.username,
  //   email: user.email,
  // };

  if (req.body.password.length < 8) {
    res.json({ error: "Password must be more than 8 characters long" });
  }
  if (req.body.username.length < 2) {
    res.json({ error: "Username must be more than 2 characters long" });
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const data = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    username: req.body.username,
    id: req.token.data.id,
  };
  console.log(data);
  const result = await Users.update(data);
  if (result != null) {
    res.sendStatus(200);
  } else {
    res.sendStatus(405);
  }
});

routes.post("/api/delete");

routes.get("/api/logout", verifyToken, async (req, res) => {});

routes.get("/api/test", async (req, res) => {
  res.sendStatus(200);
});

module.exports = routes;
