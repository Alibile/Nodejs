
const launches = new Map();

let latesFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 30, 2026"),
    destination: "Kepler-442b",
    customer: ["Ali", "NASA"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber,launch);

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
module.exports = {
    launches,
    getAllLaunches,
    addNewLaunch
}