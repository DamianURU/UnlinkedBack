const pool = require("../database");

//todos los posts
const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM posts", (err, rows) => {
      if (err) reject(err);
      resolve(rows.rows);
    });
  });
};

//todos los posts pero solo el id
const getAllPostsId = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT posts_id FROM posts", (err, rows) => {
      if (err) reject(err);
      resolve(rows.rows);
    });
  });
};

//todos los posts del usuario
const getAllUserPosts = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT posts_id FROM posts WHERE profile_id = $1",
      [id],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows.rows);
      }
    );
  });
};

//todos los posts de connects
const getAllConnectPosts = (data) => {
  let SQL = " profile_id = " + data[0].user_two_id;

  for (let i = 0; i < data.length; i++) {
    SQL += " OR profile_id = " + data[i].user_two_id;
  }
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM posts WHERE" + SQL, (err, rows) => {
      if (err) reject(err);
      resolve(rows.rows);
    });
  });
};

//crear post
const createPosts = (id, content, image) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO posts (profile_id,content,post_date) VALUES($1,$2,CURRENT_DATE)",
      [id, content],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

const updatePosts = (id, content, image) => {
  if (image == undefined) {
    const SQL = "UPDATE posts SET content = $1 WHERE posts_id = $3";
  } else {
    const SQL = "UPDATE posts SET content = $1, image = $2 WHERE posts_id = $3";
  }
  return new Promise((resolve, reject) => {
    pool.query(SQL, [content, image, id], (err, result) => {
      if (err) reject(err);
      if (result) {
        resolve(result);
      }
    });
  });
};

const deletePosts = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE from posts WHERE posts_id = $1", [id], (err, result) => {
      if (err) reject(err);
      if (result) {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllPosts,
  getAllPostsId,
  getAllUserPosts,
  getAllConnectPosts,
  createPosts,
  updatePosts,
  deletePosts,
};
