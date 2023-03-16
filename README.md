+ backend: comment out put/patch endpoints 
+ frontend: recreate Alvin's design for a plant card





// const array = ['a','b', 'c'];
// console.log(array);
// array.splice(0, 2);
// console.log(array);




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
    const { name, imgUrl } = req.body;
    const idx = req.params.plantId;

    if (PLANTS[idx]) {
        PLANTS[idx] = {name, imgUrl};
        setTimeout(() => {
            res.status(200).json(PLANTS[idx]);
        }, 2000);
    } else {
        res.status(404).json({ message: `Error, plant ${idx} doesn't exist`});
    }
});




/  PATCH /plants/:plantId
//        req body {name}

// app.patch("/plants/:plantId", (req, res) => {
//     const {name, imgUrl} = req.body;
//     const idx = req.params.plantId;
//     if (PLANTS[idx]) {
//         if (name !== undefined) {
//             PLANTS[idx].name = name;
//         }
//         if (imgUrl !== undefined) {
//             PLANTS[idx].imgUrl = imgUrl;
//         }
//         res.status(200).json(PLANTS[idx]);
//     } else {
//         res.status(404).json({message: `Error, plant ${idx} doesnt exist`});
//     }
// });


// HTTP verbs
//  GET
//  POST - create
//  DELETE - destroy
//  PUT/PATCH - update
