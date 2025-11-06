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

module.exports = {
    fetchBookmarks
};