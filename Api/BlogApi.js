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
function EditBlog(blog) {
    return api.post('/',blog)
}

module.exports = {addBlog,EditBlog};