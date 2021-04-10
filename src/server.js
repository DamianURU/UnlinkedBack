const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

//incializacion
const app = express();

//configuraciones
app.set("port", process.env.PORT);

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
//app.use(express.json());

app.get("/", async (req, res) => {
  res.sendStatus(200);
  console.log("log");
});

//rutas
app.use(require("./routes/users.routes"));

module.exports = app;
