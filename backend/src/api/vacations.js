// POST /api/vacations endpoint
// TODO: Implement vacation spot creation endpoint

const { Router } = require('express');
const vacationsController = require('../controllers/vacationsController');
const vacationsRouter = Router();

vacationsRouter.get("/form", vacationsController.getVacationsForm);
vacationsRouter.post("/", vacationsController.postVacation);
vacationsRouter.get("/:id", vacationsController.getVacation);
vacationsRouter.get("/", vacationsController.getVacations);

module.exports = vacationsRouter;