const express = require("express");
const UsersModel = require("../models/UsersModel");
const users = express.Router();

users.get("/users", async (req, res) => {
  try {
    const users = await UsersModel.find();
    if (users.length === 0) {
      return res.status(404).send({
        statusCode: 404, 
        message: "No users found"
        });
    }
    res.status(200).send({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

users.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UsersModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `No users found with the given id: ${userId}`,
      });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

users.post("/users/create", async (req, res) => {
  const newUser = new UsersModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    dob: req.body.dob,
   gender: req.body.gender,
   password: req.body.password

  });

  try {
    const savedUser = await newUser.save();
    res.status(201).send({
      statusCode: 201,
      message: "User saved successfully",
      savedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

users.patch("/users/update/:userId", async (req, res) => {
  const { userId } = req.params;
  

  try {
    const updatedUserData = req.body;
    const options = { new: true };

    const result = await UsersModel.findByIdAndUpdate(
      userId,
      updatedUserData,
      options
    );

    res
    .status(201)
    .send({
      statusCode: 201,
      message: "User updated with success",
      result})
  } catch (error) {
    res
    .status(500)
    .send({
        statusCode: 400,
        message: error.message
    })

  }
});


users.delete("/users/delete/:userId", async (req, res) => {
const {userId} = req.params


try{
    const userToDelete = await UsersModel.findByIdAndDelete(userId)

    res
    .status(200)
    .send({
        statusCode: 200,
        message:"User deleted with success" 
    })


}
catch(error) {
    res 
    .status(500)
    .send({
        statusCode: 500,
        message: error.message
    })

}

})

module.exports = users;
