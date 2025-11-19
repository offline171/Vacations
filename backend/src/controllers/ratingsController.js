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

exports.getRatings = (req, res) => {
    res.render("ratings");
}

exports.postRating = async (req, res) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO ratings (user_id, vacation_id, review, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [user_id, vacation_id, req.body.review, currentDate, currentDate]
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
            "UPDATE ratings SET review = $1, updated_at = $2 WHERE id = $3 AND user_id = $4",
            [req.body.review, currentDate, req.params.id, req.user.id]
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