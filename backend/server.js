// https://github.com/alvin-the-programmer/express-boilerplate/blob/main/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// const array = ['a','b', 'c'];
// console.log(array);
// array.splice(0, 2);
// console.log(array);

const PLANTS = [
  {name: 'Bird of Paradise', imgUrl: "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/bird%20of%20paradise.jpeg?itok=rk9GVicl"},
  {name: 'Fiddle Fig Tree', imgUrl: "https://d3gkbidvk2xej.cloudfront.net/images/products/v2/b3b6de3b-6fad-45da-8471-f65e8271d0d4/s/fiddle-leaf-fig-tree-white-mid-century-ceramic-light-wood-stand.jpeg?version=1608581569.22390019800"},
  {name: 'Palm Tree', imgUrl: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/3/24/1/shutterstock_palm-full-coconuts-on-maldivian-beach575497081.jpg.rend.hgtvcom.966.644.suffix/1648128375983.jpeg"},
  
];

// GET /plants
//    -> 200 all plants
app.get("/plants", (req, res) => {
  res.status(200).json(PLANTS);
});

// GET /plants/:plantId
//    -> 200 the plant at the given index
//    req.params
//
//    -> 404 if the plant index does not exist, {message: 'plant not found'}
app.get("/plants/:plantId", (req, res) => {
    const idx = req.params.plantId;
    if (PLANTS[idx]) {
        res.status(200).json(PLANTS[req.params.plantId]);
    } else {
        res.status(404).json({message: "plant not found"});
    }
});

// DELETE /plants/:plantId
//    -> 200 delete the plant at the given index , { message: 'plant :plantId deleted successfully'}
//    -> 404 if the plant doesn't exist, { message: 'Error, plant :plantId doesn't exist}

app.delete("/plants/:plantId", (req, res) => {
    const idx = req.params.plantId;
    
    if (PLANTS[idx]) {
       PLANTS.splice(idx, 1);
       res.status(200).json({ message: `plant ${idx} deleted successfully`}) 
    } else {
        res.status(404).json({ message: `Error, plant ${idx} doesn't exist`})
    }
});


// PATCH/PUT
//      patch - only specify the fields to change     { imgUrl: 'newurl' }
//      put   - specify all fields and replace the entire thing     { name: 'oldname', imgUrl: 'newurl'  }
//
//  PUT /plants/:plantId
//        req body {name, imgUrl}
//        -> status 200, respond with the updated plant
//        -> status 404, if plant doesnt exist {message: 'Error, plant ${idx} doesnt exist'}

app.put("/plants/:plantId", (req, res) => {
    const {name, imgUrl} = req.body;
    const idx = req.params.plantId;
    if (PLANTS[idx]) {
        PLANTS[idx] = {name, imgUrl};
        res.status(200).json(PLANTS[idx]);  
    } else {
        res.status(404).json({message: `Error, plant ${idx} doesnt exist`});
    }
});

//  PATCH /plants/:plantId
//        req body {name}

app.patch("/plants/:plantId", (req, res) => {
    const {name, imgUrl} = req.body;
    const idx = req.params.plantId;
    if (PLANTS[idx]) {
        if (name !== undefined) {
            PLANTS[idx].name = name;
        }
        if (imgUrl !== undefined) {
            PLANTS[idx].imgUrl = imgUrl;
        }
        res.status(200).json(PLANTS[idx]);
    } else {
        res.status(404).json({message: `Error, plant ${idx} doesnt exist`});
    }
});


// HTTP verbs
//  GET
//  POST - create
//  DELETE - destroy
//  PUT/PATCH - update


app.listen(port, () => {
  console.log(`Plant backend listening on port ${port}`);
});

// rm -rf .git
