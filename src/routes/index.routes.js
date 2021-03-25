const {Router} = require('express');
const router = Router();
const{renderIndex}= require('../controllers/index.controller');
const { route } = require('./notes.routes');
const {uploadImg,img} =require('../controllers/image.contoller')


router.get('/',renderIndex,img)




router.post('/',uploadImg);

module.exports = router;