const { Router } = require("express");
const routes = Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { createToken, verifyToken } = require("../config/auth");
require("dotenv").config();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

//login
routes.post("/api/login", async (req, res) => {
  const user = await Users.getByEmail(req.body.email);
  if (user === undefined) return res.sendStatus(500);
  const equals = bcrypt.compareSync(req.body.password, user.password);
  if (!equals) return res.sendStatus(500);
  const data = {
    id: user.profile_id,
    username: user.name,
    email: user.email,
  };
  createToken(req, res, data);
});

//register
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

//verify step
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

//modify profile
routes.post("/api/modify", verifyToken, async (req, res) => {
  if (req.body.password.length < 8) {
    res.json({ error: "Password must be more than 8 characters long" });
  }
  if (req.body.name.length < 2) {
    res.json({ error: "Name must be more than 2 characters long" });
  }

  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const unfilledData = {
    body: req.body,
    id: req.token.data.id,
  };

  // const data = fillData(unfilledData);
  const result = await Users.update(unfilledData);
  if (result != null) {
    res.sendStatus(200);
  } else {
    res.sendStatus(405);
  }
});

routes.post("/api/delete", verifyToken, async (req, res) => {});

//main screen y verify
routes.post("/api", verifyToken, async (req, res) => {
  const token = req.token;
  console.log(token.data);
  res.json({ message: "hola" });
});

//obtener
routes.post("/api/get", verifyToken, async (req, res) => {
  const id = await Users.getAllId();
  res.json({ data: id.rows });
});

module.exports = routes;
