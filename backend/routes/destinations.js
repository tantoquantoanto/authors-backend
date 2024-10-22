const express = require("express");
const DestinationModel = require("../Schemas/DestinationModel")
const destinations = express.Router();



destinations.get("./destinations", async (req, res, next) => {
    const {page, pageSize = 4} = req.query;
     

    try {

        const totalDestinations = await DestinationModel.countDocuments();
        const totalPages = Math.ceil(totalDestinations/ pageSize)
        const destinations = await DestinationModel.find().limit(pageSize).skip((page - 1) * pageSize)
        if(destinations.length === 0) {
            res.status(404).send({statusCode: 404, message: "No destinations found"})
        }

        res.status(200).send({statusCode: 200, message: `You found ${destinations.length} destinations`,
            totalDestinations: totalDestinations,
            totalPages: totalPages,
            destinations});




        
    } catch (error) {
       next(error)
    }


})


destinations.get("./destinations/byid/:destinationId", async (req,res, next) => {
  const {destinationId} = req.params;
  try {


    const destination = await DestinationModel.findById(destinationId)
    if(!destination) {
        res.status(404).send({statusCode: 404, message: "No destination found with the given id"})
    }
    res.status(200).send({statusCode: 200, message:"Destination found successfully", destination})


  } catch (error) {
    next(error)
  }

})


destinations.post("/destinations/create", async (req, res, next) => {
    try {
        const { name, description, location, category, images } = req.body;
        const newDestination = new DestinationModel({
            name: name,
            description: description,
            location: location,
            category: category, // Dovrebbe essere l'ObjectId della categoria
            images: images 
        });

        const savedDestination = await newDestination.save();

 
        res.status(201).send(savedDestination);

    } catch (error) {
        
      next(error)
    }
});


destinations.patch("./destinations/update/:destinationId", async (req,res, next) => {
    const {destinationId} = req.params;
    try {

        const updatedData = req.body;
        const options = {new: true};

        const result = await DestinationModel.findByIdAndUpdate(
            destinationId, 
            updatedData, 
            options

        )

        res.status(200).send({statusCode: 200, message: "Destination updated successfully"}, result)


        
    } catch (error) {
        next(error)
        
    }
})


destinations.delete(":/destinations/delete/:destinationId", async (req,res, next) => {
    const {destinationId} = req.params;

    try {
       await DestinationModel.findByIdAndDelete(destinationId);
       res.status(200).send({statusCode: 200, message: "Destination deleted successfully"}, destinationId)



    } catch (error) {
       next(error)
        
    }
})


module.exports = destinations;