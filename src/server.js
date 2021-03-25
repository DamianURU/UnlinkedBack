const express = require('express');
const path = require('path');
const morgan =require('morgan');
const multer = require('multer');
const session = require('express-session');
const ejs =require('ejs');
const {uuid }=require('uuidv4')
const cors = require('cors');





const rename = multer.diskStorage({
    destination:path.join(__dirname, 'public/upload'),
    filename:(req,file,cb)=>{
        cb(false, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

//incializacion 
const app =  express();

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname , 'views'));
app.set('view engine', 'ejs');

//midelwares 
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(multer({
    storage:rename,
    dest:path.join(__dirname, 'public/upload'),
    fileFilter:(req,file,cb)=>{
        const filetypes =/jpeg|jpg|png|gif/;
        const minetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if(minetype && extname){
            return cb(null,true);
        }
        cb("error el archivo debe ser una imagen que poses uno de los siguientes formatos:jpeg, jpg, png o gif")
    }
}).single('image'));
 
//rutas
app.use(require('./routes/image.routes'));
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'))

module.exports = app;