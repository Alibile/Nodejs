const {getAllPlanets}  = require("../../models/planets.model")
console.log("test",getAllPlanets());
function httpGeAllPlanets(req,res) {
 return   res.status(200).json(getAllPlanets())
}

module.exports = {
    httpGeAllPlanets
}

