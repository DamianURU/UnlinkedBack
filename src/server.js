const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

//incializacion
const app = express();

//configuraciones
app.set("port", process.env.PORT || 6969);

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
//app.use(express.json());

//rutas
app.use(require("./routes/users.routes"));

module.exports = app;
