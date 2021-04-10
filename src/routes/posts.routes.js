const { Router } = require("express");
const routes = Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { createToken, verifyToken } = require("../config/auth");
require("dotenv").config();

//create post
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
//read post
routes.post("/api/create", async (req, res) => {
  const verificationEmail = await Users.getByEmail(req.body.email);
  const verificationPhone = await Users.getByPhone(req.body.phone);
  if (req.body.password.length < 8)
    return res.json({ error: "Password must be more than 8 characters long" });
  if (verificationEmail !== undefined)
    return res.status(500).send({ error: "Email already in use" });
  if (verificationPhone !== undefined)
    return res.status(500).send({ error: "Phone Number already in use" });
  client.verify
    .services(process.env.SERVICE_SID)
    .verifications.create({
      to: `+${req.body.phone}`,
      channel: "sms",
    })
    .then((data, err) => {
      if (err) res.sendStatus(500).statusMessage(err);
      else res.sendStatus(200).statusMessage(data);
    });
  res.sendStatus(200);
});
//update post
routes.post("/api/verify", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  await client.verify
    .services(process.env.SERVICE_SID)
    .verificationChecks.create({
      to: `+${req.body.phone}`,
      code: req.body.code,
    })
    .then((data) => {
      if (data.status == "approved") {
        const result = Users.insert(req.body);
        if (result != null) return res.sendStatus(200);
      }
      res.sendStatus(500);
    });
});
//delete post
routes.post("/api/modify", verifyToken, async (req, res) => {
  if (req.body.password.length < 8) {
    res.json({ error: "Password must be more than 8 characters long" });
  }
  if (req.body.username.length < 2) {
    res.json({ error: "Username must be more than 2 characters long" });
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const data = {
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

routes.post("/api/delete", verifyToken, async (req, res) => {});

//get all posts
routes.get("/api/posts", verifyToken, async (req, res) => {
  console.log(req.token.data.id);
  console.log("paso el usuario");
  res.json({ message: "estas en la api" });
});

module.exports = routes;
