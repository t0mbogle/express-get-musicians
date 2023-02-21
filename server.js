const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.get('/musicians', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians)
})

app.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findAll({ where: { id: req.params.id }})
    res.json(musician)
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})