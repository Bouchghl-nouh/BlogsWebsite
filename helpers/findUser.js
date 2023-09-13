const DB = require('../Models/DataBase.json');
exports.findUser = (UserData) => {
    let user = DB.users.find(user => user.username === UserData.username);
    return user;
}