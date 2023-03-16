const PLANTS = require("./plants");

const getPlants = (req, res) => {
  res.status(200).json(PLANTS);
};

const getPlantById = (req, res) => {
  const idx = req.params.plantId;
  if (PLANTS[idx]) {
    res.status(200).json(PLANTS[req.params.plantId]);
  } else {
    res.status(404).json({ message: "plant not found" });
  }
};

const deletePlantById = (req, res) => {
  const idx = req.params.plantId;

  if (PLANTS[idx]) {
    PLANTS.splice(idx, 1);
    res.status(200).json({ message: `plant ${idx} deleted successfully` });
  } else {
    res.status(404).json({ message: `Error, plant ${idx} doesn't exist` });
  }
};

const putPlantById = (req, res) => {
  const { name, imgUrl } = req.body;
  const idx = req.params.plantId;

  if (PLANTS[idx]) {
    PLANTS[idx] = { name, imgUrl };
    setTimeout(() => {
      res.status(200).json(PLANTS[idx]);
    }, 2000);
  } else {
    res.status(404).json({ message: `Error, plant ${idx} doesn't exist` });
  }
};

const patchPlantById = (req, res) => {
  const { name, imgUrl } = req.body;
  const idx = req.body.params.plantId;
  if (PLANTS[idx]) {
    if (name !== undefined) {
      PLANTS[idx].name = name;
    }
    if (imgUrl !== undefined) {
      PLANTS[idx].imgUrl = imgUrl;
    }
    res.status(200).json(PLANTS[idx]);
  } else {
    res.status(404).json({ message: `Error, plant ${idx} doesnt exist` });
  }
};

module.exports = {
  getPlants,
  getPlantById,
  deletePlantById,
  putPlantById,
  patchPlantById,
};
