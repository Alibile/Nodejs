const express = require('express');
const {httpGeAllPlanets} = require("../planets/planets.controller")
const planetRouter = express.Router();
planetRouter.get("/planets",httpGeAllPlanets);

module.exports = planetRouter