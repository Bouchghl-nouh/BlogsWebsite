const express = require('express')
const router = express.Router()
const upload = require('../Middlewares/multer')
const CheckedAuth = require('../Middlewares/CheckedAuth')
const requireAuth = require('../Middlewares/requireAuth')
const { body, validationResult } = require('express-validator');

let validationArray = [ body("username").notEmpty().trim().escape(),  body("email").notEmpty().trim().escape(),body("password").isLength({ min: 4 }), body("ConfirmPassword").isLength({min:4})]


const { userLogin, userRegister, userLogout, renderDash,RenderLogin,RenderRegister } = require('../Controllers/user');

router.get('/login', CheckedAuth, RenderLogin);
router.post('/login',validationArray[0] ,userLogin);
router.get('/register', CheckedAuth, RenderRegister)
router.post('/register', upload.single('image'),validationArray, userRegister)
router.get('/dashboard',requireAuth,renderDash)
router.get('/logout',userLogout )





module.exports= router