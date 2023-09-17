const axios = require('axios');
const api = axios.create({
    baseURL: '  http://localhost:3000/blogs',
    Headers: {
        'Content-Type': 'application/json'
    }
});
 function addBlog(blog) {
   return api.post('/', blog);
}
function EditBlog(id,blog) {
    return api.patch('/'+id,blog)
}
function DeleteBlog(id) {
    return api.delete('/' + id);
}

module.exports = {addBlog,EditBlog,DeleteBlog};