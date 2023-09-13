const { addBlog } = require('../Api/BlogApi');
const secretKey = 'secretKey';
const jwt = require('jsonwebtoken');
const xss = require('xss');
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
    console.log(newBlog);
    addBlog(newBlog);
    return res.redirect('dashboard');
}