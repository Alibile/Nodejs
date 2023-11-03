const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();
const DEFUALT_FLIGHTNUMBER = 100;
/* let latesFlightNumber = 100; */
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2026"),
  target: "Kepler-442b",
  customers: ["Ali", "NASA"],
  upcoming: true,
  success: true,
};

/* launches.set(launch.flightNumber,launch); */
saveLaunch(launch);
async function existsLaunchWithId(launchId) {
  return launchesDataBase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFightNumber() {
  const latestLaunch = await launchesDataBase.findOne({}).sort("-flightNumber");
  if (!latestLaunch) {
    return DEFUALT_FLIGHTNUMBER;
  }
  return latestLaunch.flightNumber;
}
async function getAllLaunches() {
  return await launchesDataBase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {

    const planet = await planets.findOne({
      keplerName: launch.target,
    });
   /*  if (!planet) {
      throw new Error("no matching planet found");
    } */
 

  await launchesDataBase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Ali", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDataBase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  launches,
  getAllLaunches,
  abortLaunchById,
  scheduleNewLaunch,
};
