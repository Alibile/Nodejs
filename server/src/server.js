const http = require("http")
const app = require("./app")
const PORT = process.env.PORT || 8000
const server = http.createServer(app)
const {mongoConnect} = require("./services/mongo")
const {loadlPanetsData} = require("./models/planets.model")
const {loadLaunchData} = require("./models/launches.model")

async function startServer() {
 await mongoConnect();
 await loadLaunchData();
 await loadlPanetsData()
 server.listen(PORT, ()=> {
  
    console.log(`Listening on port ${PORT}...`);
})
 }
startServer()

