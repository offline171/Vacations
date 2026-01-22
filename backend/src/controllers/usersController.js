const pool = require('../services/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.getSignUp = (req, res) => {
    res.render("sign-up");
}

exports.postLogIn = (req, res) => {
    console.log(passport);
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    });
}

exports.postSignUp = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query(
            "INSERT INTO users (username, password, created_at, updated_at) VALUES ($1, $2, $3, $4)",
            [req.body.username, hashedPassword, currentDate, currentDate]
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

exports.getLogOut = (req, res, next) => {
    if (req.session) {
        req.session = null;
        res.redirect("/");
    } else {
        return next(error);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        const user = rows[0];
        res.render("user", { user: req.user, viewedUser: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        next(error);
    }
}

exports.getUsers = (req, res) => {
    res.render("users", { user: req.user });
}