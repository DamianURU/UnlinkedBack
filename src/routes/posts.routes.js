const { Router } = require("express");
const routes = Router();
const Posts = require("../models/posts");
const Connects = require("../models/connects");
const { verifyToken } = require("../config/auth");

//obtener posts de amigos
routes.post("/api/posts", verifyToken, async (req, res) => {
  const connects = await Connects.getConnect(req.token.data.id);
  const data = connects.rows;
  const posts = await Posts.getAllConnectPosts(data);
  res.json({ posts: posts });
});

//obtener tus posts
routes.post("/api/posts/mine", verifyToken, async (req, res) => {
  const posts = await Posts.getAllUserPosts(req.token.data.id);
  if ((posts = null)) res.sendStatus(405);
  res.sendStatus(200);
});

//crear posts
routes.post("/api/posts/create", verifyToken, async (req, res) => {
  const posts = await Posts.createPosts(
    req.token.data.id,
    req.body.postText,
    req.body.image
  );
  if (posts == null) res.sendStatus(405);
  res.sendStatus(200);
});

//borrar posts
routes.post("/api/posts/delete", verifyToken, async (req, res) => {
  const posts = await Posts.deletePosts(req.body.id);
  if ((posts = null)) res.sendStatus(405);
  res.sendStatus(200);
});

module.exports = routes;
