// POST /api/ratings endpoint
// TODO: Implement rating creation endpoint

const { Router } = require('express');
const ratingsRouter = Router();

ratingsRouter.get("/", (req, res) => {
    res.render("ratings");
});

module.exports = ratingsRouter;