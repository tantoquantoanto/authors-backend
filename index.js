const express = require("express");
const mongoose = require("mongoose");
const PORT = 4042


require("dotenv").config();




const server = express()

server.use(express.json())

const authorsRoutes = require("./routes/authors")

server.use("/", authorsRoutes)


mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on("error", console.error.bind(console, "Db Connection error"))

db.once("open", () => {
    console.log("Db Connected successfully")
} )




server.listen(PORT, () => {console.log(`Server up and running on ${PORT}`)
})


