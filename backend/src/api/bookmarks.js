// POST /api/bookmarks endpoint
// TODO: Implement bookmark creation endpoint

const { Router } = require('express');
const bookmarksController = require('../controllers/bookmarksController');
const bookmarksRouter = Router();

bookmarksRouter.get("/", bookmarksController.getBookmarks);
module.exports = bookmarksRouter;