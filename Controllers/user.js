const jwt = require('jsonwebtoken')
const axios = require('axios');
const xss = require('xss');
const bcrypt = require('bcrypt');
const secretKey = "secretKey"
const { body, validationResult } = require('express-validator');
const DB = require('../Models/DataBase.json');



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
    let user = DB.users.find(user => user.username === sanitizedData.username);
    if (!user) {
        return res.send("you are not registered");
    }
    //console.log(user);
    bcrypt.compare(sanitizedData.password, user.password).then((valid) => {
      if (!valid) {
        return res.send("password incorrect");
      }
    })
      const token = jwt.sign(
        { username: user.username, image: user.image },
        'secretKey'
      );
      res.cookie("token", token);
      return res.redirect("dashboard");

}

exports.renderDash = (req, res) => {
    const user = req.decoded;
    console.log(user.image);
    return res.render('dashboard', { user });
}

exports.userLogout = (req, res) => {
    const token = req.cookies.token;
    res.clearCookie("token");
    console.log(token);
    return res.redirect('login')
}

exports.userRegister = async(req, res) => {
    const { username, password, ConfirmPassword, email } = req.body;
    //console.log(req.body);
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
    axios.post('http://localhost:3000/users', secureData);
    return res.redirect('login');
}