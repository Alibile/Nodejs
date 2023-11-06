const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
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