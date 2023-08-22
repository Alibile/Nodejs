const planets  = require("../models/planets.model")
function geAllPlanets(req,res) {
 return   res.status(200).json(planets)
}

module.exports = {
    geAllPlanets
}