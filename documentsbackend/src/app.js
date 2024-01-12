const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
require('dotenv').config()

app = express();

app.set("PORT", process.env.PORT || 4000);
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/user"));
app.use("/api/file", require("./routes/file"));

module.exports = app;