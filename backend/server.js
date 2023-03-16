const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PLANTS = require("./plants");
const plantController = require('./plant-controller');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/plants", plantController.getPlants);
app.get("/plants/:plantId", plantController.getPlantById);
app.delete("/plants/:plantId", plantController.deletePlantById);
app.put("/plants/:plantId", plantController.putPlantById);
app.patch("/plants/:plantId", plantController.patchPlantById);

app.listen(port, () => {
  console.log(`Plant backend listening on port ${port}`);
});

