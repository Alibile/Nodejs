const express = require("express")
const {httpGetAllLaunches,httpAddNewLaunch} = require("../../routes/launches/launches.controller")
const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpGetAllLaunches)

module.exports = launchesRouter;