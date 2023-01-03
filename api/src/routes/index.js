const express = require("express")
const { Router } = require('express');
const {videogamesRouter} = require("./videogamesRouter");
const genresRouter = require("./genresRouter");
const platformsRouter = require("./platformsRouter");
// const {favoritesRouter} = require("./favoritesRouter")

const router = Router();
router.use(express.json())
router.use("/videogames" , videogamesRouter);
router.use("/genres" , genresRouter);
router.use("/platforms",platformsRouter);
// router.use("/favorites",favoritesRouter);



module.exports = router;
