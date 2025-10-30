const db = require('../services/db');

exports.getVacations = (req, res) => {
    res.render("vacations");
}