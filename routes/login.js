const express = require("express");
const UsersModel = require("../models/UsersModel");
const login = express.Router();

const isPasswordValid = (userPassword, requestPassword) => {
  if (userPassword !== requestPassword) {
    return false;
  } else {
    return true;
  }
};

login.post("/login", async (req, res) => {
  try {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "No users found with the given email",
      });
    }

    const checkPassword = isPasswordValid(user.password, req.body.password);
    if (!checkPassword) {
      return res.status(403).send({
        statusCode: 403,
        message: "The password is not valid",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Login effettuato con successo",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Oops, something went wrong",
    });
  }
});

module.exports = login;
