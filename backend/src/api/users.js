// POST /api/users endpoint
// TODO: Implement user creation endpoint

const { Router } = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport');
const usersRouter = Router();

usersRouter.get("/sign-up", usersController.getSignUp);
usersRouter.get("/log-in", usersController.getLogIn);
usersRouter.get("/log-out", usersController.getLogOut);
usersRouter.get("/:id", usersController.getUser);
usersRouter.get("/", usersController.getUsers);

usersRouter.post("/sign-up", usersController.postSignUp);
usersRouter.post("/log-in", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/log-in",
}));

module.exports = usersRouter;