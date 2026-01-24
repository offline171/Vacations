// POST /api/ratings endpoint
// TODO: Implement rating creation endpoint

const { Router } = require('express');
const ratingsController = require('../controllers/ratingsController'); 
const ratingsRouter = Router();
const methodOverride = require('method-override');

ratingsRouter.use(methodOverride('_method'));

ratingsRouter.get("/form", ratingsController.getRatingsForm);
ratingsRouter.get("/:id", ratingsController.getRating);
ratingsRouter.get("/", ratingsController.getRatings);

ratingsRouter.post("/:id", ratingsController.postRating);

ratingsRouter.put("/:id", ratingsController.putRating);

ratingsRouter.delete("/:id", ratingsController.deleteRating);

module.exports = ratingsRouter;