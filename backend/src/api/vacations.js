// POST /api/vacations endpoint
// TODO: Implement vacation spot creation endpoint

const { Router } = require('express');
const vacationsRouter = Router();

vacationsRouter.get("/", (req, res) => {
    res.render("vacations");
});

module.exports = vacationsRouter;