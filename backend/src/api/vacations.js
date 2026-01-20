// POST /api/vacations endpoint
// TODO: Implement vacation spot creation endpoint

const { Router } = require('express');
const vacationsController = require('../controllers/vacationsController');
const vacationsRouter = Router();

vacationsRouter.get("/:id/image-form", vacationsController.getVacationsImagesForm);
vacationsRouter.get("/form", vacationsController.getVacationsForm);
vacationsRouter.get("/:id", vacationsController.getVacation);
vacationsRouter.get("/", vacationsController.getVacations);

vacationsRouter.post("/:id/image-form", vacationsController.postVacationImage);
vacationsRouter.post("/", vacationsController.postVacation);

vacationsRouter.put("/:id", vacationsController.putVacation);

vacationsRouter.delete("/:id", vacationsController.deleteVacation);

module.exports = vacationsRouter;