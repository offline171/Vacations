// POST /api/ratings endpoint
// TODO: Implement rating creation endpoint

const { Router } = require('express');
const ratingsController = require('../controllers/ratingsController'); 
const ratingsRouter = Router();

ratingsRouter.get("/", ratingsController.getRatings);
ratingsRouter.post("/:id", ratingsController.ratingEnter);
ratingsRouter.put("/:id", ratingsController.putRating);
ratingsRouter.delete("/:id", ratingsController.deleteRating);

module.exports = ratingsRouter;