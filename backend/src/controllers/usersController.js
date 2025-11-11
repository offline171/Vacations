const pool = require('../services/db');
const passport = require('passport');

exports.getSignUp = (req, res) => {
    res.render("sign-up");
}

exports.postSignUp = async (req, res) => {
   try {
    const currentDate = new Date();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedEmail = await bcrypt.hash(req.body.email, 10);
    await pool.query(
        "INSERT INTO USERS (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [req.body.username, hashedEmail, hashedPassword, currentDate, currentDate]
    );
    res.redirect("/");
   } catch (error) {
    console.error("Error during user sign-up:", error);
    next(error);
   }
}

exports.getLogIn = (req, res) => {
    res.render("log-in");
}

exports.getLogOut = (req, res) => {
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