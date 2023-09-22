const express = require('express');
const {geAllPlanets} = require("../planets.controller")
const planetRouter = express.Router();
planetRouter.get("/planets",geAllPlanets);

module.exports = planetRouter