// POST /api/users endpoint
// TODO: Implement user creation endpoint

const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require("passport");
console.log(passport);

usersRouter.get("/sign-up", usersController.getSignUp);
usersRouter.get("/log-in", usersController.getLogIn);
usersRouter.get("/log-out", usersController.getLogOut);
usersRouter.get("/forgot-password", usersController.getForgotPassword);
usersRouter.get("/:id", usersController.getUser);
usersRouter.get("/", usersController.getUsers);

usersRouter.post("/sign-up", usersController.postSignUp);
usersRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
  })
);
usersRouter.post("/forgot-password", usersController.postForgotPassword);

usersRouter.put("/:id/password", usersController.putPassword);
usersRouter.put("/:id/email", usersController.putEmail);

module.exports = usersRouter;