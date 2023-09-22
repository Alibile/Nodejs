const http = require("http")
const app = require("./app")
const PORT = process.env.PORT || 8000
const server = http.createServer(app)
const {loadlPanetsData} = require("./models/planets.model")

async function startServer() {
 await loadlPanetsData()
server.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}...`);
})
 }
startServer()

