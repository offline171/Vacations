// VacationService CRUD operations
// TODO: Implement vacation spot CRUD logic
const pool = require('../services/db');


// get items for id
async function fetchVacations(){
  try{
    const { rows } = await pool.query("SELECT * FROM vacation_spots");
    const items = rows;
    if(items) {
      console.log('Fetched vacations successfully');
      return items;
    } else {
      console.log('Vacations not found');
    }
  } catch(error) {
    console.error('Error, cannot find vacations.');
  }
}

// get items for id
async function fetchVacation(vacation_id){
  try{
    const { rows } = await pool.query("SELECT * FROM vacation_spots WHERE id = $1", [vacation_id]);
    const item = rows[0];
    if(item) {
      console.log('Fetched vacation successfully');
      return item;
    } else {
      console.log('Vacation not found');
    }
  } catch(error) {
    console.error('Error, cannot find vacation.');
  }
}

module.exports = {
    fetchVacations,
    fetchVacation
};