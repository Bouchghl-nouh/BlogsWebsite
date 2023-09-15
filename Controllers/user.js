const jwt = require('jsonwebtoken')
const xss = require('xss');
const bcrypt = require('bcrypt');
const secretKey = "secretKey";
const DB = require('../Models/DataBase.json');
const blogs = DB.blogs;
const { body, validationResult } = require('express-validator');
const path = require('path')
const {addUser} = require('../Api/userApi');
const {findUser} = require('../helpers/findUser');
exports.userLogin = (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("your are not registered .please register ");
    }
    const sanitizedData = {
      username: xss(username),
      password: xss(password),
    };
    let user = findUser(sanitizedData);
    if (!user) {
        return res.send("you are not registered");
    }
    bcrypt.compare(sanitizedData.password, user.password).then((valid) => {
      if (!valid) {
        return res.send("password incorrect");
      }
    })
      const token = jwt.sign(
        { username: user.username, image: user.image },
        secretKey
      );
      res.cookie("token", token);
      return res.redirect("dashboard");

}

exports.renderDash = (req, res) => {
  const user = req.decoded;
  const myblogs = blogs.filter((blog) => blog.author === user.username)
    return res.render('dashboard', {user,myblogs });
}

exports.userLogout = (req, res) => {
    res.clearCookie("token");
    return res.redirect('login')
}

exports.userRegister = async(req, res) => {
    const { username, password, ConfirmPassword, email } = req.body;
    if (password != ConfirmPassword) {
        return res.send("Your password and Confirm Password are not the same");
    }
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send("the informations you provided us are wrong");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const secureData = {
        username: xss(username),
        password: xss(hashPassword),
        email: xss(email),
        image: xss(req.file.filename)
  }
  let user = findUser(secureData);
  if (user) {
      return res.status(400).send("change the name please");
  }
    addUser(secureData);
    return res.redirect('login');
}
exports.RenderLogin = (req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/Html/login.html'));
}
exports.RenderRegister = (req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/Html/register.html'));
    
}