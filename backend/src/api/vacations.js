// POST /api/vacations endpoint
// TODO: Implement vacation spot creation endpoint

const { Router } = require('express');
const vacationsController = require('../controllers/vacationsController');
const vacationsRouter = Router();

vacationsRouter.get("/form", vacationsController.getVacationsForm);
vacationsRouter.get("/:id", vacationsController.getVacation);
vacationsRouter.get("/", vacationsController.getVacations);

vacationsRouter.post("/:id/image", vacationsController.postVacationImage);
vacationsRouter.post("/", vacationsController.postVacation);

module.exports = vacationsRouter;