const pool = require('../services/db');

exports.getVacations = (req, res) => {
    res.render("vacations");
}

exports.vacationsEnter = async (req, res) => {
   try {
    const currentDate = new Date();
    await pool.query(
        "INSERT INTO VACATIONS (name, location, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
        [req.body.name, req.body.location, req.body.description, currentDate, currentDate]
    );
    res.redirect("/");
   } catch (error) {
    console.error("Error during vacation creation:", error);
    next(error);
   }
}