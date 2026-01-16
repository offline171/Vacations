// VacationService CRUD operations
// TODO: Implement vacation spot CRUD logic
const pool = require('./db');


// get items for id
async function fetchVacationImages(vacation_id){
  try{
    const { rows } = await pool.query("SELECT * FROM images WHERE vacation_id = $1 ORDER BY priority, created_at DESC NULLS LAST", [vacation_id]);
    const items = rows;
    if(items) {
      console.log('Fetched images successfully');
      return items;
    } else {
      console.log('Images not found');
    }
  } catch(error) {
    console.error('Error, cannot find images.');
  }
}

module.exports = {
    fetchVacationImages
};