// RatingService CRUD operations
// TODO: Implement rating CRUD logic
const pool = require('../db/pool');


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

async function fetchVacationRatings(vacation_id) {
    try{
        const { ratings } = await pool.query("SELECT * FROM ratings WHERE vacation_id = $1 ORDER BY date, id", [vacation_id]);
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

async function fetchRating(vacation_id, user_id) {
    try{
        const { ratings } = await pool.query("SELECT * FROM ratings WHERE vacation_id = $1 AND user_id = $2", [vacation_id, user_id]);
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

module.exports = {
    fetchRatings
};