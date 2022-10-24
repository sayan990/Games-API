const { Router } = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { Genre } = require("../db.js")

const genre = Router();

genre.post("/", async function PostGenre(req, res) {
  const { name } =
    req.body;
    console.log(name)
  const post = await Genre.create({
    name,
    id: uuidv4(),
  });
  
  return res.json(post.id);
});

module.exports = genre;
