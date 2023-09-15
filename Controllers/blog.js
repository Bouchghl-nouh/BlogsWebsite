const { addBlog ,EditBlog} = require('../Api/BlogApi');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const axios = require('axios');
const DB = require('../Models/DataBase.json')
const {findBlog} = require('../helpers/findBlog');
exports.AddingBlog = (req, res) => {
    const { description,title } = req.body;
    const image = req.file.filename; 
    const user = req.decoded;
    const newBlog = {
        description: xss(description),
        image: xss(image),
        title: xss(title),
        author:xss(user.username)
    }
    addBlog(newBlog);
    return res.redirect('dashboard');
}
exports.getBlog = (req, res)=> {
    const id = req.params.id;
    const blog = findBlog(id);
    if (!blog) {
        return res.send("this blog doesn't exist")
    }
    return res.render('Blog',{blog});
}
exports.getBlogs = (req, res) => {
    const blogs = DB.blogs;
    return res.render('Blogs', { blogs });
}
exports.deleteBlog = async(req, res) => {
    const id = req.params.id;
    await axios.delete('http://localhost:3000/blogs/'+id)
    res.redirect('dashboard');
}
exports.getEditBlog = (req, res)=> {
    const id = req.params.id;
    const blog = findBlog(id);
    if (!blog) {
        return res.send("this blog doesn't exist")
    }
    return res.render('Blog-Edit',{blog});
}
exports.EditingBlog = async(req, res) => {
    const id = req.params.id;
    const newBlog = req.body;
    const image = req.file;
    const blog = findBlog(id);
    const EditedBlog = {
        description: newBlog.description,
        image: image.filename,
        title: newBlog.title
    }
    await axios.patch('http://localhost:3000/blogs/'+id,EditedBlog);

    return res.redirect('../dashboard');
}