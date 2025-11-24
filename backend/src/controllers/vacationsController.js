const pool = require('../services/db');


exports.getVacations = (req, res) => {
    res.render("vacations");
}

exports.getVacation = async (req, res, next) => {
    try{
        const {vacations} = await pool.query("SELECT * FROM vacation_spots WHERE id = $1", [req.params.id]);
        res.render("vacation", {vacation: vacations[0], id: req.params.id});
    } catch (error) {
        console.error("Error fetching vacation:", error);
        next(error);
    }
    
}

exports.getVacationsForm = (req, res) => {
    res.render("vacations-form");
}

exports.postVacation = async (req, res, next) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO vacation_spots (name, location, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [req.body.name, req.body.location, req.body.description, currentDate, currentDate]
    );
    res.redirect("/");
   } catch (error) {
    console.error("Error during vacation creation:", error);
    next(error);
   }
}

exports.postVacationImage = async (req, res, next) => {
    try {
        const imageUrl = req.body.imageUrl;
        const currentDate = new Date();
        await pool.query("INSERT INTO images (vacation_id, url) VALUES ($1, $2, $3, $4)", 
            [req.params.id, imageUrl, currentDate, currentDate]
        );
        res.redurect("/:id");
    } catch (error) {
        console.error("Error uploading vacation image:", error);
        next(error);
    }
}