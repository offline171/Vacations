// VacationService CRUD operations
// TODO: Implement vacation spot CRUD logic
const pool = require('../db/pool');


async function fetchVacations() {
    try{
        const { vacations } = await pool.query("SELECT * FROM vacations");
        return vacations;
    } catch (err) {
        console.error("Error fetching vacations:", err);
        throw err;
    }
}

async function fetchVacation(vacation_id) {
    try{
        const { vacations } = await pool.query("SELECT * FROM vacations WHERE id = $1", [vacation_id]);
        return vacations[0];
    } catch (err) {
        console.error("Error fetching vacations:", err);
        throw err;
    }
}

module.exports = {
    fetchVacations
};