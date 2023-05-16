const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRoute = require("./videoGamesRoutes.js")
const genresRoute = require("./genresRoutes.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use( "/", videoGamesRoute );
router.use( "/", genresRoute );

module.exports = router;
