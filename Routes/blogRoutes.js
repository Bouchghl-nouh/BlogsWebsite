const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/multer');
const requireAuth = require('../Middlewares/requireAuth');
const { AddingBlog, getBlog, getBlogs, deleteBlog, getEditBlog, EditingBlog } = require("../Controllers/blog");

router.post('/dashboard',upload.single('image'),requireAuth, AddingBlog);

router.get('/blog/:id', getBlog);

router.get('/blogs', getBlogs);

router.post('/blog/delete/:id', deleteBlog);

router.get('/blog-edit/:id', getEditBlog);

router.post('/blog-edit/:id',upload.single('image'), EditingBlog);

module.exports = router;