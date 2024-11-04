const express = require("express");
const users = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const internalStorage = require("../middlewares/multer/internalStorage")
const DestinationModel = require("../models/DestinationModel");
const UsersModel = require("../models/UsersModel");


const upload = multer({storage: internalStorage, 
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ["image/png", "image/jpeg"]
        console.log(file.mimetype)
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('This type of file is not allowed'), false); 
        }
    }
})



users.post("/users/upload", upload.single("img"), async (req,res,next) => {
    const url = `${req.protocol}://${req.get("host")}`
    try {
        const imgUrl = req.file.filename;
        res
        .status(201)
        .json({
            img: `${url}/uploads/${imgUrl}`
        })
        
    } catch (error) {
        next(error)
        
    }
})


// GET all users
users.get("/users", async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const users = await UsersModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    const totalDocuments = await UsersModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);
    if (users.length === 0) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "No users found" });
    }

    res
      .status(200)
      .send({
        statusCode: 200,
        message: `${users.length} users found successfully`,
        totalDocuments: totalDocuments,
        totalPages: totalPages,
        users,
      });
  } catch (error) {
    next(error);
  }
});

// GET user by ID
users.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UsersModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "No user found with the given id" });
    }

    res
      .status(200)
      .send({ statusCode: 200, message: "User found successfully", user });
  } catch (error) {
    next(error);
  }
});

// POST create new user
users.post("/users/create", async (req, res, next) => {
  try {
    const { name, surname, username, email, password, isActive, role, img } =
      req.body;

    const newUser = new UsersModel({
      name,
      surname,
      username,
      email,
      password,
      isActive,
      role,
      img,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .send({
        statusCode: 201,
        message: "User created successfully",
        savedUser,
      });
  } catch (error) {
    next(error);
  }
});

// PATCH update user by ID
users.patch("/users/update/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const updatedData = req.body;
    const options = { new: true };

    const updatedUser = await UsersModel.findByIdAndUpdate(
      userId,
      updatedData,
      options
    );
    if (!updatedUser) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "User not found" });
    }

    res
      .status(200)
      .send({
        statusCode: 200,
        message: "User updated successfully",
        updatedUser,
      });
  } catch (error) {
    next(error);
  }
});

// DELETE user by ID
users.delete("/users/delete/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deletedUser = await UsersModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "User not found" });
    }

    res
      .status(200)
      .send({ statusCode: 200, message: "User deleted successfully", userId });
  } catch (error) {
    next(error);
  }
});

module.exports = users;
