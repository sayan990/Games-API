const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const home = require('./Videogames')
const genres = require('./Genres')
const videogame = require('./Videogame')
const genre = require('./Genre')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", home)
router.use("/genres", genres)
router.use("/genre", genre)
router.use("/videogame", videogame);

module.exports = router;
