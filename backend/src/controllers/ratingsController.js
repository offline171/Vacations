const pool = require('../services/db');

exports.getRatings = (req, res) => {
    res.render("ratings");
}