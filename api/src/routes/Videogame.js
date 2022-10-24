const { Router } = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { Videogame, Genre } = require("../db.js")

const videogame = Router();

videogame.post("/", async function PostVideogame(req, res) {
  const { name, description, released, rating, platforms, genres, image } =
    req.body;
  const post = await Videogame.create({
    name,
    description,
    released: released || "0000-00-00",
    rating: rating || 0,
    platforms,
    image,
    genres,
    id: uuidv4(),
  });
  let theGenres;
  if (Array.isArray(genres)) {
    theGenres = await Promise.all(genres.map((g) => Genre.findByPk(g)));
  } else {
    theGenres = await Genre.findByPk(genres);
  }
  await post.setGenre(theGenres);
  return res.json(post.id);
});

module.exports = videogame;
