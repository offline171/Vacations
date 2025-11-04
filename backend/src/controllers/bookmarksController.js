const pool = require('../services/db');

exports.getBookmarks = (req, res) => {
    res.render("bookmarks");
}