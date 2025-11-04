const pool = require('../services/db');

exports.getRatings = (req, res) => {
    res.render("ratings");
}

async function fetchRatings(userId) {
    try{
        const { ratings } = await pool.query("SELECT * FROM ratings WHERE user_id = $1 ORDER BY date, id", [userId]);
        if(ratings) {
            return ratings;
        } else {
            console.error("Something went wrong fetching ratings");
        }
    } catch (err) {
        console.error("Error fetching ratings:", err);
        throw err;
    }
}