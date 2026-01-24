// POST /api/bookmarks endpoint
// TODO: Implement bookmark creation endpoint

const { Router } = require('express');
const bookmarksController = require('../controllers/bookmarksController');
const bookmarksRouter = Router();
const methodOverride = require('method-override');

bookmarksRouter.use(methodOverride('_method'));


bookmarksRouter.get("/:id", bookmarksController.getBookmark);
bookmarksRouter.get("/", bookmarksController.getBookmarks);

bookmarksRouter.post("/:id", bookmarksController.postBookmark);

bookmarksRouter.delete("/:id/delete", bookmarksController.deleteBookmark);

module.exports = bookmarksRouter;