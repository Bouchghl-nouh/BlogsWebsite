const DB = require('../Models/DataBase.json');
exports.findBlog = (id)=>{
    let blog = DB.blogs.find(blog => blog.id === +id);
    
    return blog;
}