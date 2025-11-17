// BookmarkService CRUD operations
// TODO: Implement bookmark CRUD logic
const pool = require('../db/pool');

async function fetchBookmarks(userId) {
    try{
        const { bookmarks } = await pool.query("SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY date, id", [userId]);
        if(bookmarks) {
            return bookmarks;
        } else {
            console.error("Something went wrong fetching bookmarks");
        }
    } catch (err) {
        console.error("Error fetching bookmarks:", err);
        throw err;
    }
}

async function isBookmarked(vacation_id, user_id) {
    try{
        const { bookmarks } = await pool.query("SELECT * FROM bookmarks WHERE vacation_id = $1 AND user_id = $2 ORDER BY date, id", [vacation_id, user_id]);
        if(bookmarks) {
            return true;
        } else { //no error since it's just a true or false function
            return false;
        }
    } catch (err) {
        console.error("Error fetching bookmarks:", err);
        throw err;
    }
}

module.exports = {
    fetchBookmarks
};