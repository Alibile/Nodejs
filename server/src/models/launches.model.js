
const launches = new Map();

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
    return Array.from(launches.values())
}

module.exports = {
    launches,
    getAllLaunches
}