// POST /api/users endpoint
// TODO: Implement user creation endpoint

const { Router } = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport');
const usersRouter = Router();

usersRouter.get("/sign-up", usersController.signUpForm)
usersRouter.post("/log-in", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/log-in",
}));
usersRouter.get("/log-out", usersController.logOut);
usersRouter.get("/", usersController.getUsers);

module.exports = usersRouter;