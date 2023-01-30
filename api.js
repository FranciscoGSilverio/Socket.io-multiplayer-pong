const express = require("express");
const { join } = require("path");

const api = express();

api.use(express.static(join(__dirname, "public")));

api.use("/", express.static("index.html"));

module.exports = api;
