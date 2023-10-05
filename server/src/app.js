const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require("cors")
const planetRouter = require("./routes/planets/planets.router")
const launchesRouter = require("./routes/launches/launches.router")
const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(express.static(path.join(__dirname, "..","public")));
app.use(morgan("combined"));
app.get("/*",(req,res) => {
  res.sendFile(path.join(__dirname,"..","public","index.html"))
});
app.use(planetRouter);
app.use(launchesRouter);

module.exports = app;