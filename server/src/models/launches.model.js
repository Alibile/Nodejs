const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();
const axios = require("axios");
const DEFUALT_FLIGHTNUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v5/launches/query";

async function populateLaunches(launch) {
  console.log("Downloading launch data");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

   if (response.status !== 200) {
    console.log("Problem downloading lauch data");
    throw new Error("Launch data download failed")
   }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunch(launch)
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch Data already loaded");
  } else {
    await populateLaunches();
  }
}
async function findLaunch(filter) {
  return await launchesDataBase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return findLaunch({
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
async function getAllLaunches(skip,limit) {
  console.log(`${skip},${limit}`);
  return await launchesDataBase.find({}, { _id: 0, __v: 0 }).sort({flightNumber:1}).skip(skip).limit(limit);
}

async function saveLaunch(launch) {


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
      const planet = await planets.findOne({
      keplerName: launch.target,
    });
     if (!planet) {
        throw new Error("no matching planet found");
      }
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
  loadLaunchData,
  existsLaunchWithId,
  launches,
  getAllLaunches,
  abortLaunchById,
  scheduleNewLaunch,
};
