const db = require('../services/db');
const passport = require('passport');

exports.signUpForm = (req, res) => {
    res.render("sign-up");
}

exports.signUpEnter = (req, res) => {
   redirect("/");
}

exports.logOut = (req, res) => {
    if(req.session){
        req.session = null;
        res.redirect("/");
    } else{
        return next(error);
    }
}

exports.getUsers = (req, res) => {
    res.render("users");
}
