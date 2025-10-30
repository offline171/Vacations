// POST /api/ratings endpoint
// TODO: Implement rating creation endpoint

const { Router } = require('express');
const ratingsController = require('../controllers/ratingsController'); 
const ratingsRouter = Router();

ratingsRouter.get("/", ratingsController.getRatings);

module.exports = ratingsRouter;