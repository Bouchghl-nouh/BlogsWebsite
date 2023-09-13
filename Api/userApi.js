const axios = require('axios');
const api = axios.create({
    baseURL: '  http://localhost:3000/users',
    Headers: {
        'Content-Type': 'application/json'
    }
});
 function addUser(user) {
   return api.post('/', user);
}
module.exports = { addUser};
