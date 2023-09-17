const { addBlog ,EditBlog,DeleteBlog} = require('../Api/BlogApi');
const xss = require('xss');
const DB = require('../Models/DataBase.json')
const {findBlog} = require('../helpers/findBlog');
exports.AddingBlog = (req, res) => {
    const { description,title } = req.body;
    const image = req.file?req.file.filename:'default1.png'; 
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
    // await axios.delete('http://localhost:3000/blogs/'+id)
    await DeleteBlog(id);
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
exports.EditingBlog = async (req, res) => {
    const id = req.params.id;
    const newBlog = req.body;
    const image = req.file;
    const blog = findBlog(id);
    const EditedBlog = {
        description:xss( newBlog.description),
        image: xss(image? image.filename:blog.image),
        title: xss(newBlog.title)
    }
    await EditBlog(id, EditedBlog);
    return res.redirect('../dashboard');
}