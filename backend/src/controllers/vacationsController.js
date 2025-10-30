const db = require('../services/db');

exports.getVacations = (req, res) => {
    res.render("vacations");
}

async function fetchVacationSpots() {
    try{
        const { vacations } = await pool.query("SELECT * FROM vacation_spots");
        return vacations;
    } catch (err) {
        console.error("Error fetching vacation spots:", err);
        throw err;
    }
}