const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/multer');
const requireAuth = require('../Middlewares/requireAuth');
const {AddingBlog} = require("../Controllers/blog");
router.post('/dashboard',upload.single('image'),requireAuth, AddingBlog);







module.exports = router;