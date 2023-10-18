const express = require('express');
const {httpGeAllPlanets} = require("../planets/planets.controller")
const planetRouter = express.Router();
planetRouter.get("/",httpGeAllPlanets);

module.exports = planetRouter