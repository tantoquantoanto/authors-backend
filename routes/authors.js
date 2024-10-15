const express = require("express");
const AuthorsModel = require("./models/AuthorsModels");
const authors = express.Router();

authors.get("/authors", async (req, res) => {
  try {
    const authors = await AuthorsModel.find();
    if (authors.length === 0) {
      return res.status(404).send("No authors found");
    }
    res.status(200).send({
      statusCode: 200,
      authors,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

authors.get("/authors/:authorId", async (req, res) => {
  const { authorId } = req.params;
  try {
    const author = await AuthorsModel.findById(authorId);
    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: `No authors found with the given id: ${authorId}`,
      });
    }
    res.status(200).send(author);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

authors.post("/authors/create", async (req, res) => {
  const newAuthor = new AuthorsModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    birth: req.body.birth,
    avatar: req.body.avatar,
  });

  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).send({
      statusCode: 201,
      message: "Author saved successfully",
      savedAuthor,
    });
  } catch (error) {
    res
    .status(500)
    .send({
        message: error.message
    })
  }
});


module.exports = authors