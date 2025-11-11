const pool = require('../services/db');

exports.getBookmarks = (req, res) => {
    res.render("bookmarks");
}

exports.bookmarkEnter = async (req, res) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO BOOKMARKS (user_id, vacation_id, review, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [req.user.id, req.params.id, req.body.review, currentDate, currentDate]
    );
    res.redirect("/");
   } catch (error) {
    console.error("Error during bookmark creation:", error);
    next(error);
   }
}