// POST /api/bookmarks endpoint
// TODO: Implement bookmark creation endpoint

const { Router } = require('express');
const bookmarksController = require('../controllers/bookmarksController');
const bookmarksRouter = Router();


bookmarksRouter.get("/:id", bookmarksController.getBookmark);
bookmarksRouter.get("/", bookmarksController.getBookmarks);

bookmarksRouter.post("/:id", bookmarksController.postBookmark);

bookmarksRouter.delete("/:id", bookmarksController.deleteBookmark);

module.exports = bookmarksRouter;