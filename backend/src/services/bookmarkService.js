// BookmarkService CRUD operations
// TODO: Implement bookmark CRUD logic
const pool = require('./db');

async function fetchBookmarks(userId) {
    try{
        const { bookmarks } = await pool.query("SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY id", [userId]);
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

async function bookmarkIDs(listOfBookmarks) {
    try{
        const ids = new Set(listOfBookmarks.map(bookmark => bookmark.vacation_id));
        return ids;
    } catch (err) {
        console.error("Error fetching bookmark IDs:", err);
        throw err;
    }
}

async function isBookmarked(vacation_id, user_id) {
    try{
        console.log("Checking if vacation", vacation_id, "is bookmarked by user", user_id);
        console.log("SELECT * FROM bookmarks WHERE vacation_id = $1 AND user_id = $2", [vacation_id, user_id]);
        const { rows } = await pool.query("SELECT * FROM bookmarks WHERE vacation_id = $1 AND user_id = $2", [vacation_id, user_id]);
        if(rows) {
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
    fetchBookmarks,
    bookmarkIDs,
    isBookmarked
};