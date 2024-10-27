const express = require("express");
const DestinationModel = require("../models/DestinationModel");
const destinations = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const internalStorage = require("../middlewares/multer/internalStorage");

const upload = multer({
  storage: internalStorage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/webp"];
    console.log(file.mimetype);
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("This type of file is not allowed"), false);
    }
  },
});

destinations.post(
  "/destinations/upload",
  upload.single("img"),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get("host")}`;
    try {
      const imgUrl = req.file.filename;

      res.status(200).json({
        img: `${url}/uploads/${imgUrl}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);






destinations.get("/destinations", async (req, res, next) => {
    const { page = 1, pageSize = 6 } = req.query;
  
    try {
      const totalDestinations = await DestinationModel.countDocuments();
      const totalPages = Math.ceil(totalDestinations / pageSize);
      const destinations = await DestinationModel.find()
        .limit(pageSize)  
        .skip((page - 1) * pageSize); 
  
      if (destinations.length === 0) {
        return res
          .status(404)
          .send({ statusCode: 404, message: "No destinations found" });
      }
  
      res.status(200).send({
        statusCode: 200,
        message: `${destinations.length} destinations found successfully`,
        totalDestinations: totalDestinations,
        totalPages: totalPages,
        destinations,
      });
    } catch (error) {
      next(error);
    }
  });
  

destinations.get("/destinations/:destinationId", async (req, res, next) => {
  const { destinationId } = req.params;
  try {
    const destination = await DestinationModel.findById(destinationId);
    if (!destination) {
      res.status(404).send({
        statusCode: 404,
        message: "No destination found with the given id",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Destination found successfully",
      destination,
    });
  } catch (error) {
    next(error);
  }
});

destinations.get("/destinations/category/:category", async (req, res, next) => {
  const { category } = req.params;
  try {
    const destinations = await DestinationModel.find({
        category: { $regex: new RegExp(category, "i") } // Case insensitive
      });
    if (destinations.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No destinations found for the given category",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Destinations found successfully",
      destinations,
    });
  } catch (error) {
    next(error);
  }
});

destinations.get(
    "/destinations/name/:name",
    async (req, res, next) => {
      const { name } = req.params;
      try {
        const destinations = await DestinationModel.find({
            name: { $regex: new RegExp(name, "i") } // Case insensitive
          });
        if (destinations.length === 0) {
          return res
            .status(404)
            .send({
              statusCode: 404,
              message: "No destinations found with the given name",
            });
        }
        res
          .status(200)
          .send({
            statusCode: 200,
            message: "Destinations found successfully",
            destinations,
          });
      } catch (error) {
        next(error);
      }
    }
  );
  

destinations.post("/destinations/create", async (req, res, next) => {
  try {
    const { name, description, location, category, img } = req.body;
    const newDestination = new DestinationModel({
      name: name,
      description: description,
      location: location,
      category: category, // Dovrebbe essere l'ObjectId della categoria
      img: img,
    });

    const savedDestination = await newDestination.save();

    res.status(201).send(savedDestination);
  } catch (error) {
    next(error);
  }
});

destinations.patch(
    "/destinations/update/:destinationId",
    async (req, res, next) => {
      const { destinationId } = req.params;
      try {
        const updatedData = req.body;
        const options = { new: true };
  
        const result = await DestinationModel.findByIdAndUpdate(
          destinationId,
          updatedData,
          options
        );
  
        if (!result) {
          return res.status(404).send({ statusCode: 404, message: "Destination not found" });
        }
  
        res.status(200).send({
          statusCode: 200,
          message: "Destination updated successfully",
          destination: result, // Includi il risultato aggiornato nella risposta
        });
      } catch (error) {
        next(error);
      }
    }
  );
  

destinations.delete(
  "/destinations/delete/:destinationId",
  async (req, res, next) => {
    const { destinationId } = req.params;

    try {
      const deletedDestination = await DestinationModel.findByIdAndDelete(
        destinationId
      );
      if (!deletedDestination) {
        return res
          .status(404)
          .send({ statusCode: 404, message: "Destination not found" });
      }
      res.status(200).send({
        statusCode: 200,
        message: "Destination deleted successfully",
        destinationId,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = destinations;
