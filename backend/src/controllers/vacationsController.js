const pool = require('../services/db');

exports.getVacations = (req, res) => {
    res.render("vacations");
}

async function fetchVacations() {
    try{
        const { vacations } = await pool.query("SELECT * FROM vacations");
        return vacations;
    } catch (err) {
        console.error("Error fetching vacations:", err);
        throw err;
    }
}