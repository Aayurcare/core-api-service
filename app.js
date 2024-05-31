const path = require("path");

console.log("Current directory:", __dirname);
console.log(
  "Resolved dbConfig path:",
  path.resolve(__dirname, "./src/config/dbConfig")
);

const express = require("express");
var bodyParser = require("body-parser");

const app = express();

const PORT = 3001;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    AccessControlAllowOrigin: "*",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

// require("./src/config/dbConfig").connect();
// require("./src/routes").registerRoutes(app);

app.listen(8080, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
