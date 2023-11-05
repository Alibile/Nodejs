
const API_URL = "http://localhost:8000/v1"
// Load planets and return as JSON.
async function httpGetPlanets() {
const response = await fetch(`${API_URL}/planets`)
return await response.json();
}
async function httpGetLaunches() {
const response = await fetch(`${API_URL}/launches`)
const fetchedLaunches = await response.json()

return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber)
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try {
    return  await fetch(`${API_URL}/launches`,{
    method: "POST",
    headers: { "content-type":"application/json"},
    body: JSON.stringify(launch)
  })
  } catch (error) {
    return {ok: false}
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
     return await fetch(`${API_URL}/launches/${id}`,{
     method: "delete",
 })
  } catch (error) {
    console.error(error);
    return {ok: false}
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};