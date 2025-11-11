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
    res.redirect("/");
   } catch (error) {
    console.error("Error during rating creation:", error);
    next(error);
   }
}