// POST /api/users endpoint
// TODO: Implement user creation endpoint

const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get("/", usersController.getUsers);

module.exports = usersRouter;