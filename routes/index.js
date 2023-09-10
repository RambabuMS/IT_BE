const express = require('express');
const app = express();
const bike = require("./bikes")
const user = require("./users")
const production = require("./productionRecord")

app.use("/",bike,user,production);

module.exports = app;

