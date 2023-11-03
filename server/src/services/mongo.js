const mongoose = require("mongoose")
const MONGO_URL = `mongodb+srv://nasa-api:9ndpTDqYdCgfPK98@cluster0.ifrlbgp.mongodb.net/?retryWrites=true&w=majority`
mongoose.connection.on('open',() => {
    console.log("mongoDb connection ready");
})
mongoose.connection.on('error',(error) => {
    console.error(error);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisConnect(params) {
    await mongoose.disconnect(MONGO_URL)
}

module.exports = {
    mongoConnect,
    mongoDisConnect
  }