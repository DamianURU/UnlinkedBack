const { Router } = require("express");
const routes = Router();
const Connects = require("../models/connects");
const { verifyToken } = require("../config/auth");

//AGREGAR CONNECT
routes.post("/api/connect/add", verifyToken, async (req, res) => {
  const idToken = req.token.data.id;
  const idConnect = req.body.idConnect;
  const connect = await Connects.addConnect(idToken, idConnect);
  if (connect === undefined) return res.sendStatus(500);
  res.sendStatus(200);
});

//ACEPTAR CONNECT
routes.post("/api/connect/accept", verifyToken, async (req, res) => {
  const idToken = req.token.data.id;
  const idConnect = req.body.idConnect;
  const connect = await Connects.acceptConnect(idToken, idConnect);
  if (connect === undefined) return res.sendStatus(500);
  res.sendStatus(200);
});

//BLOQUEAR CONNECT
routes.post("/api/connect/block", verifyToken, async (req, res) => {
  const idToken = req.token.data.id;
  const idConnect = req.body.idConnect;
  const connect = await Connects.blockConnect(idToken, idConnect);
  if (connect === undefined) return res.sendStatus(500);
  res.sendStatus(200);
});

//VER TODOS LOS CONNECTS
routes.post("/api/connect/", verifyToken, async (req, res) => {
  const idToken = req.token.data.id;
  const connects = await Connects.getAll(idToken);
  if (connects === undefined) return res.sendStatus(500);
  res.json({ connects: connects });
});

module.exports = routes;
