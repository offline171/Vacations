// POST /api/users endpoint
// TODO: Implement user creation endpoint

const { Router } = require('express');
const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.render("users");
});

module.exports = usersRouter;