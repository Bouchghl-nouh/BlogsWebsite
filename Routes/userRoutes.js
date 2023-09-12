const express = require('express')
const router = express.Router()
const path= require('path')
const upload = require('../Middlewares/multer')
const CheckedAuth = require('../Middlewares/CheckedAuth')
const requireAuth = require('../Middlewares/requireAuth')
const { body, validationResult } = require('express-validator');

let validationArray = [ body("username").notEmpty().trim().escape(),  body("email").notEmpty().trim().escape(),body("password").isLength({ min: 4 }), body("ConfirmPassword").isLength({min:4})]


const {userLogin,userRegister,userLogout,renderDash} = require('../Controllers/user')


router.get('/login', CheckedAuth,(req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/Html/login.html'));
})
router.post('/login',validationArray[0] ,userLogin);



router.get('/register', CheckedAuth, (req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/Html/register.html'));
    
})

router.post('/register', upload.single('image'),validationArray, userRegister)

router.get('/dashboard',requireAuth,renderDash)

router.get('/logout',userLogout )





module.exports= router