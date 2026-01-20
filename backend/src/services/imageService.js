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

async function fetchImages(){
  try{
    const { rows } = await pool.query("SELECT * FROM images ORDER BY priority, created_at DESC NULLS LAST");
    const items = rows;
    if(items) {
      console.log('Fetched images successfully');
      return items;
    } else {
      console.log('Images not found');
      return [];
    }
  } catch(error) {
    console.error('Error, cannot find images.');
  }
}

function findImage(vacationId, images) {
    if(!images || images.length === 0) {
        return "https://www.w3schools.com/images/w3schools_green.jpg"; //default image
    }
    let start = 0;
    let end = images.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (images[mid].vacation_id === vacationId) {
            if(images[mid].priority === 1) {
                return images[mid].url;
            } else {
                index = mid;
                while(index >= 0 && images[index].vacation_id === vacationId) {
                    if(images[index].priority === 1) {
                        return checkJPG(images[index].url);
                    }
                    index--;
                }
                return checkJPG(images[mid].url);
            }
        } else if (images[mid].vacation_id < vacationId) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return "https://www.w3schools.com/images/w3schools_green.jpg";
};

function checkJPG(imageName) {
  const index = imageName.lastIndexOf('.');
  if(imageName.slice(index + 1).toLowerCase() === 'jpg') {
    return imageName;
  } else {
    return imageName.slice(0, index) + '.jpg';
  }
}

module.exports = {
    fetchVacationImages,
    fetchImages,
    findImage
};