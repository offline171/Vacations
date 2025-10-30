// POST /api/vacations endpoint
// TODO: Implement vacation spot creation endpoint

const { Router } = require('express');
const vacationsController = require('../controllers/vacationsController');
const vacationsRouter = Router();

vacationsRouter.get("/", vacationsController.getVacations);

async function fetchVacationSpots() {
    try{
        const { vacations } = await pool.query("SELECT * FROM vacation_spots");
        return vacations;
    } catch (err) {
        console.error("Error fetching vacation spots:", err);
        throw err;
    }
}

module.exports = vacationsRouter;