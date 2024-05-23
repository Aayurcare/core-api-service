const express = require("express");
var bodyParser = require("body-parser");

const app = express();

const PORT = 3001;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

require("./src/config/dbConfig").connect();
require("./src/routes").registerRoutes(app);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
