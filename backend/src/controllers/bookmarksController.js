const pool = require('../services/db');


exports.getBookmarksForm = (req, res) => {
    res.render("bookmarks-form");
}

exports.getBookmark = async (req, res, next) => {
    try{
        const {rows} = await pool.query("SELECT * FROM bookmarks WHERE id = $1", [req.params.id]);
        res.render("bookmark", {bookmark: rows[0]});
    } catch (error) {
        console.error("Error fetching bookmark:", error);
        next(error);
    }
}

exports.postBookmark = async (req, res) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO bookmarks (user_id, vacation_id, created_at, updated_at) VALUES ($1, $2, $3, $4)",
        [req.user.id, req.params.id, currentDate, currentDate]
    );
    res.redirect('/' + req.params.id);
   } catch (error) {
    console.error("Error during bookmark creation:", error);
    next(error);
   }
}

exports.getBookmarks = (req, res) => {
    res.render("bookmarks", { stylesheet: "/css/bookmarks.css" });
}

exports.deleteBookmark = async (req, res, next) => {
    try {
        console.log("Deleting bookmark with vacation_id:", req.params.id);
        await pool.query("DELETE FROM bookmarks WHERE vacation_id = $1 AND user_id = $2", [req.params.id, req.user.id]);
        res.redirect('/' + req.params.id);
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        next(error);
    }
}

// note to self, look into shell stuff like google gemini 
// cli part is something I need to learn more about