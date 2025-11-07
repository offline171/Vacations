const pool = require('../services/db');
const passport = require('passport');

exports.signUpForm = (req, res) => {
    res.render("sign-up");
}

exports.signUpEnter = async (req, res) => {
   try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedEmail = await bcrypt.hash(req.body.email, 10);
    await pool.query(
        "INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3)",
        [req.body.username, hashedEmail, hashedPassword]
    );
    res.redirect("/");
   } catch (error) {
    console.error("Error during user sign-up:", error);
    next(error);
   }
}

exports.logInForm = (req, res) => {
    res.render("log-in");
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
    res.render("users", {user: req.user});
}