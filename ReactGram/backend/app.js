require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const conn = require("./config/db");

const port = process.env.PORT;

const app = express();

//Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Config CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB connection
require("./config/db");

//Routes
const router = require("./routes/router");
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
