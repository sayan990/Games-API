const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Sequelize } = require('sequelize');
const { Videogame, Genre } = require("../db.js")

////RUTAS GET
router.get("/", async function (req, res) {
   const name = req.query.name
   const key = "38ee99b1f4f5485cb45f4d416f7bba84"
   if (name) {
    
   
    Promise.all([
      axios.get(`https://api.rawg.io/api/games?key=${key}&search=${name}`),
      axios.get(`https://api.rawg.io/api/games?key=${key}&page=2&search=${name}`),
      axios.get(`https://api.rawg.io/api/games?key=${key}&page=3&search=${name}`),
      axios.get(`https://api.rawg.io/api/games?key=${key}&page=4&search=${name}`),
      /* axios.get(`https://api.rawg.io/api/games?key=${key}&page=5&search=${name}`) , */
    ]).then((result) => {
       let response = [];
        for (let i = 0; i < result.length - 1; i++) {
        response = response.concat(result[i].data.results);
      }
    var GamesAPI = response.map((g) => {
      return {
        name: g.name,
        genres: g.genres,
        image: g.background_image,
        rating: g.rating,
        id: g.id,
      };
    });
    return GamesAPI.slice(0, 15);
  })
  .then(async function (response) {
    const DBGames = await Videogame.findAll({
      where: { name: {[Sequelize.Op.iLike]: name + "%"}},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return res.send([...DBGames, ...response]);
  }) 
   .catch(() => {
    return res.status(404).send("no encuentro el juego " + name);
  });
 }
      
  if (!name) {
    Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${key}`),
        axios.get(`https://api.rawg.io/api/games?key=${key}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${key}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${key}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${key}&page=5`),
      ])
        .then((result) => {
          let response = [];
          for (let i = 0; i < result.length; i++) {
            response = response.concat(result[i].data.results);
          }
          var APIGames = response.map((g) => {
            return {
              name: g.name,
              genres: g.genres,
              image: g.background_image,
              rating: g.rating,
              id: g.id,
            };
          });
          return APIGames;
        })
        .then(async function (response) {
          const DBGames = await Videogame.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          });
          return res.send([...DBGames, ...response]);
        })
        .catch((err) => {
          return res.send(err);
        });
      }
  });
  
  router.get("/:id", async (req, res, next) => {
  const key = "38ee99b1f4f5485cb45f4d416f7bba84"
  const id = req.params.id
  const DBGame = await Videogame.findByPk(id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  }).catch(() => console.log("La parte de la DB rompio"));
  if (DBGame) return res.send(DBGame);

  //Compara con la API
  axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
    .then((response) => {
      var g = response.data;
      if (g) {
        var GameDetail = {
          name: g.name,
          genres: g.genres,
          image: g.background_image,
          description: g.description_raw,
          released: g.released,
          rating: g.rating,
          platforms: g.platforms,
          id: g.id,
        };
        return res.send(GameDetail);
      }
    })
    .catch(() => res.send("No encontre el juego :("));

});
  
  module.exports = router;