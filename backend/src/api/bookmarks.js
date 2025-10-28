// POST /api/bookmarks endpoint
// TODO: Implement bookmark creation endpoint

const { Router } = require('express');
const bookmarksRouter = Router();

bookmarksRouter.get("/", (req, res) => {
    res.render("bookmarks");
});

module.exports = bookmarksRouter;