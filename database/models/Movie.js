module.exports = function(sequelize, dataTypes) {
     
    let alias = "Movie";

     let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: dataTypes.STRING
        },

        rating: {
            type: dataTypes.DOUBLE
        },

        awards: {
            type: dataTypes.INTEGER
        },

        release_date: {
            type: dataTypes.DATE
        },

        length: {
            type:dataTypes.INTEGER
        },

        genre_id:  {
            type: dataTypes.INTEGER
        }
     }

    let config = {
        tableName: "movies",
        timestamps: false
    }

    
    
    
    let Pelicula = sequelize.define(alias, cols, config);
    
    Pelicula.associate = function(models) {
        Pelicula.belongsTo(models.Genre, {
            as: "Genre",
            foreignKey: "genre_id"
        })

    Pelicula.belongsToMany(models.Actor, {
        as: "actors",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false

    });
    }





    return Pelicula;
}



