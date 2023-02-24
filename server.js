const express = require("express");
const app = express();
const {sequelize} = require("./db");
const musicianRouter = require("./routes/musicianRouter");

const port = 3000;
app.use(express.json()); // parsing middleware

app.use("/", musicianRouter)    // get all, post
app.use("/:id", musicianRouter) // get specific, put, delete


app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})