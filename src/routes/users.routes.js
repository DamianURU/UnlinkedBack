const { Router } = require("express");
const routes = Router();
const Users = require("../models/users");
const bycrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { verifyToken, refreshToken } = require("../config/auth");

// const getIdByemail =(idByEmail)=>{
//     return new Promise((resolve,reject) =>{
//         pool.query('SELECT * FROM users WERHE email =$1',[idByEmail], (err,rows)=>{
//             if(err)reject(err)
//             resolve(rows)
//         });
//     });
// }

routes.post("/register", async (req, res) => {
  let termo = [];
  const verificationEmail = await Users.getByEmail(req.body.email);
  const pass = req.body.password;
  console.log(req.body);
  if (pass.length < 4) {
    res.json({ error: "ERROr, la contrasena debe tenr mas de 4 caracteres" });
  }
  if (termo.length < 0) {
    res.json({ error: "muchos erroeres" });
  }
  if (verificationEmail === undefined) {
    console.log(verificationEmail);
    req.body.password = bycrypt.hashSync(req.body.password, 10);
    const result = await Users.insert(req.body);
    console.log("si va para el baile");
    res.status(200).send({ message: "usuario creado " });
  } else {
    console.log("hola");
    res.status(500).send({ error: "ERROR, este correo ya esta registrado" });
  }
});

routes.post("/login", async (req, res) => {
  const user = await Users.getByEmail(req.body.email);

  if (user === undefined) {
    res.status(500).json({
      error: "ERROR, email or password not found",
    });
  } else {
    console.log(user);
    const equals = bycrypt.compareSync(req.body.password, user.password);
    if (!equals) {
      res.status(500).json({
        error: "ERROR, email or password not found  2",
      });
    } else {
      const token = jsonwebtoken.sign({ id: user.usersid }, "eltermo", {
        expiresIn: 60 * 600,
      });

      res.status(200).json({ auth: true, token: token });
    }
  }
});
routes.get("/me", verifyToken, (req, res, next) => {
  console.log("paso el usuario");
});

// const createToken = (user) =>{
//     console.log('hola')
//     let payload ={
//         userId: user.id,
//         createdAT:moment().unix(),
//         expiresAt:moment().add(1,'day').unix()

//     }
//     console.log(jwt.encode(payload,'Token-Auth'))
//     return jwt.encode(payload,'Token-Auth')
// }

routes.post("/login", async (req, res) => {
  const user = await Users.getByEmail(req.body.email);

  if (user === undefined) {
    res.json({
      error: "ERROR, email or password not found",
    });
  } else {
    const equals = bycrypt.compareSync(req.body.password, user.password);
    if (!equals) {
      res.json({
        error: "ERROR, email or password not found  2",
      });
    } else {
      const token = jwt.sign({ user: userid }, "eltermo", {
        expiresIn: 60 * 60,
      });

      res.json({ auth: true, token: token });
    }
  }
});

// router.use(configjwt.checkToken);

// router.get('/mainUser',(req,res)=>{
//     Users.getById(req.userId)
//     .then(rows=>{
//         res.json(rows);
//     })
//     .catch(err=>console.log(err));
// })
// router.post('/token',checkToken)

module.exports = routes;
