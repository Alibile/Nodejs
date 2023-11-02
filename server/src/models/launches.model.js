/* const launches = require('./launches.mongo') */
const launches = new Map();

let latesFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 30, 2026"),
    target: "Kepler-442b",
    customers: ["Ali", "NASA"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber,launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}
function getAllLaunches() {
    console.log(launches.values());
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latesFlightNumber++
    launches.set(latesFlightNumber,Object.assign(launch,{
        success: true,
        upcoming: true,
        customer: ["Ali", "NASA"],
        flightNumber: latesFlightNumber
    }));
    
}

function abortLaunchById(launchId){
   const aborted =  launches.get(launchId)
   aborted.upcoming = false;
   aborted.success = false;
   return aborted

}

module.exports = {
    existsLaunchWithId,
    launches,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}