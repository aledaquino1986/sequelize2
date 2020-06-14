var express = require('express');
var router = express.Router();
var moviesControllers = require("../controllers/moviesControllers");
const { check, validationResult, body} = require("express-validator");



/* GET movies listing. */
router.get('/', moviesControllers.listMovies)
router.get('/genres/:id', moviesControllers.genreDetail);
router.get('/genres', moviesControllers.listGenres);

router.get('/create', moviesControllers.showCreatePage)

router.post('/create', [
    check("title").isLength({min:1}).withMessage("El campo 'Título' no puede estar vacío."),
    check("rating").isLength({min:1}).withMessage("El campo 'Rating' no puede estar vacío."),
    check("awards").isLength({min:1}).withMessage("El campo 'Premios' no puede estar vacío."),
    check("length").isLength({min:1}).withMessage("El campo 'Duración' no puede estar vacío."),
    /*check('date').custom(function(date){
        if (date == undefined) {
            return false
        }
    }).withMessage('La fecha debe ser válida')*/
], 
moviesControllers.create)


router.get('/detail/:id', moviesControllers.movieDetail);
router.post('/detail/delete/:id', moviesControllers.destroy);

router.get('/edit/:id', moviesControllers.showEditPage);


router.post('/edit/:id', [
    check("title").isLength({min:1}).withMessage("El campo 'Título' no puede estar vacío."),
    check("rating").isLength({min:1}).withMessage("El campo 'Rating' no puede estar vacío."),
    check("awards").isLength({min:1}).withMessage("El campo 'Premios' no puede estar vacío."),
    check("length").isLength({min:1}).withMessage("El campo 'Duración' no puede estar vacío."),
], moviesControllers.editMovie);



router.get('/actor/:id', moviesControllers.actorDetail);



module.exports = router;