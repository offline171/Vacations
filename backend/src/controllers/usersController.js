const db = require('../services/db');
const passport = require('passport');

exports.getUsers = (req, res) => {
    res.render("users");
}

exports.logOut = (req, res) => {
    if(req.session){
        req.session = null;
        res.redirect("/");
    } else{
        return next(error);
    }
}