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
            "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
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
    if (req.session) {
        req.session = null;
        res.redirect("/");
    } else {
        return next(error);
    }
}

exports.getForgotPassword = (req, res) => {
    res.render("forgot-password");
}

exports.getUser = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        const user = rows[0];
        res.render("users", { user: req.user, viewedUser: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        next(error);
    }
}

exports.getUsers = (req, res) => {
    res.render("users", { user: req.user });
}

exports.postForgotPassword = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
        const user = rows[0];
        //placeholder for email sending
        res.render("users", { user: req.user, viewedUser: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        next(error);
    }
}

exports.putPassword = async (req, res, next) => {
    try {
        const currentDate = new Date();
        await pool.query(
            "UPDATE users SET password = $1, updated_at = $2 WHERE id = $3",
            [req.body.password, currentDate, req.params.id]
        );
        res.redirect("/");
    } catch (error) {
        console.error("Error updating password:", error);
        next(error);
    }
}

exports.putEmail = async (req, res, next) => {
    try {
        const currentDate = new Date();
        await pool.query(
            "UPDATE users SET email = $1, updated_at = $2 WHERE id = $3",
            [req.body.email, currentDate, req.params.id]
        );
        res.redirect("/");
    } catch (error) {
        console.error("Error updating email:", error);
        next(error);
    }
}