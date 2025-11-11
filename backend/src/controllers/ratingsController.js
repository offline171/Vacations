const pool = require('../services/db');

exports.getRatings = (req, res) => {
    res.render("ratings");
}

exports.ratingEnter = async (req, res) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO RATINGS (user_id, vacation_id, review, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [user_id, vacation_id, req.body.review, currentDate, currentDate]
    );
    res.redirect("/vacations");
   } catch (error) {
    console.error("Error during rating creation:", error);
    next(error);
   }
}

exports.putRating = async (req, res) => {
    try {
        const currentDate = new Date();
        await pool.query(
            "UPDATE RATINGS SET review = $1, updated_at = $2 WHERE id = $3",
            [req.body.review, currentDate, req.params.id]
        );
        res.redirect("/vacations");
    } catch (error) {
        console.error("Error during rating update:", error);
        next(error);
    }
}

exports.deleteRating = async (req, res) => {
    try {
        await pool.query(
            "DELETE FROM RATINGS WHERE id = $1 AND user_id = $2",
            [req.params.id, req.user.id]
        );
        res.redirect("/vacations");
    } catch (error) {
        console.error("Error during rating deletion:", error);
        next(error);
    }
}