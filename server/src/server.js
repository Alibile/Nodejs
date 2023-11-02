const http = require("http")
const app = require("./app")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8000
const server = http.createServer(app)

mongoose.connection.on('open',() => {
    console.log("mongoDb connection ready");
})
mongoose.connection.on('error',(error) => {
    console.error(error);
})

const {loadlPanetsData} = require("./models/planets.model")
const MONGO_URL = `mongodb+srv://nasa-api:9ndpTDqYdCgfPK98@cluster0.ifrlbgp.mongodb.net/?retryWrites=true&w=majority`
async function startServer() {
    await mongoose.connect(MONGO_URL)
 await loadlPanetsData()
 server.listen(PORT, ()=> {
  
    console.log(`Listening on port ${PORT}...`);
})
 }
startServer()

