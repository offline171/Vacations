const pool = require('../services/db');

exports.getRatingsForm = (req, res) => {
    res.render("ratings-form");
}

exports.getRating = async (req, res, next) => {
    try{
        const {rows} = await pool.query("SELECT * FROM ratings WHERE id = $1", [req.params.id]);
        res.render("rating", {rating: rows[0]});
    } catch (error) {
        console.error("Error fetching rating:", error);
        next(error);
    }  
}

exports.getRatings = async (req, res) => {
    try{
        const {rows} = await pool.query("SELECT * FROM ratings WHERE user_id = $1", [req.user.id]);
        res.render("ratings", {ratings: rows, viewedUserId: req.params.userId});
    } catch (error) {
        console.error("Error fetching ratings:", error);
        next(error);
    }
}

exports.postRating = async (req, res) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO ratings (user_id, vacation_id, review, comment, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
        [user_id, vacation_id, req.body.review, req.body.comment, currentDate, currentDate]
    );
    res.redirect("/");
   } catch (error) {
    console.error("Error during rating creation:", error);
    next(error);
   }
}

exports.putRating = async (req, res) => {
    try {
        const currentDate = new Date();
        await pool.query(
            "UPDATE ratings SET review = $1, comment = $2, updated_at = $3 WHERE id = $4 AND user_id = $5",
            [req.body.review, req.body.comment, currentDate, req.params.id, req.user.id]
        );
        res.redirect("/");
    } catch (error) {
        console.error("Error during rating update:", error);
        next(error);
    }
}

exports.deleteRating = async (req, res) => {
    try {
        await pool.query(
            //Prevent users from deleting ratings they do not own
            "DELETE FROM ratings WHERE id = $1 AND user_id = $2",
            [req.params.id, req.user.id]
        );
        res.redirect("/");
    } catch (error) {
        console.error("Error during rating deletion:", error);
        next(error);
    }
}