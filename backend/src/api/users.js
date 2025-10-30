// POST /api/users endpoint
// TODO: Implement user creation endpoint

const { Router } = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport');
const usersRouter = Router();

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
}));
usersRouter.get("/logout", usersController.logOut);

module.exports = usersRouter;