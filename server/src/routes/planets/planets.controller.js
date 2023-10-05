const {geAllPlanets}  = require("../../models/planets.model")
function httpGeAllPlanets(req,res) {
 return   res.status(200).json(geAllPlanets())
}

module.exports = {
    httpGeAllPlanets
}

