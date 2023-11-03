const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');
const planets = require('./planets.mongo')
/* const habitablePlanets = []; */
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadlPanetsData() {

 return new Promise((resolve,reject) => {
  fs.createReadStream(path.join(__dirname, '..','..','data','kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      columns: true,
    }))
    .on('data', async (data) => {
      if (isHabitablePlanet(data)) {
        //TODO: Replace below create with insert + update = upsert
        savePlanets(data)
       /*  habitablePlanets.push(data);  */
      }
    })
    .on('error', (err) => {
      console.log(err);
      reject(err)
    })
    .on('end', async () => {
      const conuntPlanetsFound =(await getAllPlanets()).length
      console.log(`${conuntPlanetsFound} habitable planets found!`);
      resolve();
    });
 })
  
}

 function getAllPlanets() {
  return planets.find({})
}

async function savePlanets(planet) {
  console.log(planet);
  try {
      await  planets.updateOne({
    keplerName: planet.keplerName,
   }/* ,{
    keplerName: planet.keplerName,
   } */,{upsert: true})
  } catch (error) {
    console.error(`Could not save ${error}`);
  }

}
  module.exports = {
    loadlPanetsData,
    getAllPlanets
  }