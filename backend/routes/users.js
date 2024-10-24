const express = require("express");
const UsersModel = require("../models/UsersModel"); 
const users = express.Router();

// GET all users
users.get("/users", async (req, res, next) => {
    try {
        const {page, pageSize} = req.query;
        const users = await UsersModel.find().limit(pageSize).skip((page -1) * pageSize);
        const totalDocuments = await UsersModel.countDocuments();
        const totalPages = Math.ceil(totalDocuments / pageSize);
        if (users.length === 0) {
            return res.status(404).send({ statusCode: 404, message: "No users found" });
        }

        res.status(200).send({ statusCode: 200, message: `${users.length} users found successfully`,
          totalDocuments: totalDocuments,
          totalPages: totalPages,
          users });
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
            return res.status(404).send({ statusCode: 404, message: "No user found with the given id" });
        }

        res.status(200).send({ statusCode: 200, message: "User found successfully", user });
    } catch (error) {
        next(error);
    }
});

// POST create new user
users.post("/users/create", async (req, res, next) => {
    try {
        const { name, surname, username, email, password, isActive, role } = req.body;

        const newUser = new UsersModel({
            name,
            surname,
            username,
            email,
            password,
            isActive,
            role
        });

        const savedUser = await newUser.save();
        res.status(201).send({ statusCode: 201, message: "User created successfully", savedUser });
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

        const updatedUser = await UsersModel.findByIdAndUpdate(userId, updatedData, options);
        if (!updatedUser) {
            return res.status(404).send({ statusCode: 404, message: "User not found" });
        }

        res.status(200).send({ statusCode: 200, message: "User updated successfully", updatedUser });
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
            return res.status(404).send({ statusCode: 404, message: "User not found" });
        }

        res.status(200).send({ statusCode: 200, message: "User deleted successfully", userId });
    } catch (error) {
        next(error);
    }
});

module.exports = users;
