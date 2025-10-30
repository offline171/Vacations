const db = require('../services/db');

exports.getUsers = (req, res) => {
    res.render("users");
}