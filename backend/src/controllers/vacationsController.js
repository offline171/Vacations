const pool = require('../services/db');
//get services from vacationService
const vacationService = require('../services/vacationService');
const bookmarkService = require('../services/bookmarkService');
const ratingService = require('../services/ratingService');
const imageService = require('../services/imageService');

exports.getVacations = async (req, res, next) => {
    let vacations = (await vacationService.fetchVacations());
    let bookmarks = null;
    if(req.user){
        bookmarks = await bookmarkService.fetchBookmarks(req.user.id);
    } 
    let bookmarkIDs = null;
    if(bookmarks){
        bookmarkIDs = await bookmarkService.bookmarkIDs(bookmarks);
    }
    let images = await imageService.fetchImages();
    res.render("index", { vacations: vacations, bookmarks: bookmarks, bookmarkIDs: bookmarkIDs, 
        images: images, imageService: imageService });
}

exports.getVacation = async (req, res, next) => {
    let vacation = null;
    vacation = (await vacationService.fetchVacation(req.params.id)); 
    let bookmarked = false;
    if(req.user){
        bookmarked = (await bookmarkService.isBookmarked(req.params.id, req.user.id));
    }
    let ratings = (await ratingService.fetchVacationRatings(req.params.id));
    let images = (await imageService.fetchVacationImages(req.params.id));
    res.render("vacation", { vacation: vacation, bookmarked: bookmarked, ratings: ratings, images: images, id: req.params.id });
}

exports.getVacationsForm = (req, res) => {
    res.render("vacations-form");
}

exports.getVacationsImagesForm = (req, res) => {
    res.render("vacations-images-form");
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
        const imageFile = req.file.buffer;
        const imageFileName = req.file.originalname;
        const currentDate = new Date();
        await pool.query("INSERT INTO images (vacation_id, name, file, created_at, updated_at) VALUES ($1, $2, $3, $4)",
            [req.params.id, imageFileName, imageFile, currentDate, currentDate]
        );
        res.redirect("/:id");
    } catch (error) {
        console.error("Error uploading vacation image:", error);
        next(error);
    }
}

exports.putVacation = async (req, res, next) => {
    try {
        const currentDate = new Date();
        await pool.query(
            "UPDATE vacation_spots SET name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5",
            [req.body.name, req.body.location, req.body.description, currentDate, req.params.id]
        );
        res.redirect("/:id");
    } catch (error) {
        console.error("Error updating vacation:", error);
        next(error);
    }
}

exports.deleteVacation = async (req, res, next) => {
    try {
        await pool.query("DELETE FROM vacation_spots WHERE id = $1", [req.params.id]);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting vacation:", error);
        next(error);
    }
}