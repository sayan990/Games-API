const { Router } = require("express");
const axios = require("axios").default;
require("dotenv").config();
const { Genre } = require("../db.js")


const genres = Router();

genres.get("/", (req, res) => {
    const key = "38ee99b1f4f5485cb45f4d416f7bba84"
  axios
    .get(`https://api.rawg.io/api/genres?key=${key}`)
    .then((response) => {
      const genres = response.data.results.map((g) => (g = g.name));
      return Promise.all(
        genres.map((g) => Genre.findOrCreate({ where: { name: g } }))
      );
    })
    .then(() => {
      return Genre.findAll();
    })
    .then((response) => {
      res.send(
        response.map((g) => {
          return {
            name: g.name,
            id: g.id,
          };
        })
      );
    });
});

module.exports = genres;
