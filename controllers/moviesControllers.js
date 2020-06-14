let db = require("../database/models");
const sequelize = db.sequelize;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { check, validationResult, body} = require("express-validator");

let moviesControllers = {
    listMovies: function(req, res) {
      

        db.Movie.findAll({
            include: [{association: "Genre"}, {association:"actors"}]
        }).then(function (movies) {
            res.render("movieList", {
                movies:movies,
            
                
            });
           
        })
    },

    movieDetail: function(req, res) {
        db.Movie.findByPk(req.params.id, {include: [{association: "Genre"}, {association:"actors"}]}).then(function(movies){
            res.render("movieDetail", {
                movies:movies
            })
        })
    },

    showCreatePage: function(req, res) {
        db.Genre.findAll().then(function (genre){
            
            res.render("createMovie", {
                genre:genre
            });
        })
        
    },

    create: function(req, res) {
        let errors = validationResult(req);

        db.Genre.findAll().then(function (genre){
              let genero = req.body.genre
              switch (genero) {
                case 'Comedia':
                    genero = 1
                  break;
                case 'Terror':
                    genero = 2
                  break;
                case 'Darama':
                    genero = 3
                  break;
                case 'Accion':
                    genero = 4
                  break;
                case 'Ciencia Ficcion':
                    genero = 5
                  break;
                  case 'Suspenso':
                    genero = 6
                  break;
                  case 'Animacion':
                    genero = 7
                  break;
                  case 'Aventuras':
                    genero = 8
                  break;
                  case 'Documental':
                    genero = 9
                    break;
                  case 'Infantiles':
                    genero = 10
                  break;
                  case 'Fantasia':
                    genero = 11
                  break;
                  case 'Musical':
                    genero = 12
                  break;
              }
            if (errors.isEmpty()) {
                //hacer algo. Toda la lògica de la pagina va acá.
                db.Movie.create({
                    title: req.body.title,
                    length: req.body.length,
                    rating: req.body.rating,
                    release_date: req.body.release_date,
                    awards: req.body.awards,
                    genre_id: genero
                })
        
                res.redirect("/movies")
                } else {
                 res.render("createMovie", {errors:errors.errors, genre:genre}) //rendereo la vista y comparto los errores con esa pàgina
                }
            
        
        })

        

        

        
    },

    showEditPage: (req, res) => {
        db.Movie.findByPk(req.params.id).then(function(movies){
            res.render("editMovie", {
                movies:movies
            })
        })
    },

    editMovie: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            //hacer algo. Toda la lògica de la pagina va acá.
            db.Movie.update({
                title: req.body.title,
                length: req.body.length,
                rating: req.body.rating,
                release_date: req.body.release_date,
                awards: req.body.awards
            },
    
            {
    
            where: {
                id: req.params.id,
            },
    
            
        });
        res.redirect("/movies");
            } else {
                db.Movie.findByPk(req.params.id).then(function(movies){
                    res.render("editMovie", {
                        movies:movies,
                        errors:errors.errors
                    })
                })
            }

        
        
    },

    destroy: (req, res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.redirect("/movies")
    },

    genreDetail: function(req, res) {
        db.Genre.findByPk(req.params.id, {include: [{association: "movies"}]}).then(function(genres){
             genres.movies.forEach(element => {
                 console.log(element.title)
             });
            res.render("genreDetail", {
                genres:genres
            })
        })
    },

    listGenres: function(req, res) {
        db.Genre.findAll().then(function(genres) {
            res.render("genreList", {genres: genres})
        }).catch(function(err){
            console.log(err)
        })
    },

    actorDetail: function(req, res) {
        db.Actor.findByPk(req.params.id, {include: [{association: "movies"}]}).then(function(actors){
        
             
        res.render("actorDetails", {
            actors:actors
        })
    })
},

}


module.exports = moviesControllers;