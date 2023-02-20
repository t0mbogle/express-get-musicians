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
app.get('/musician1', async (req, res) => {
    const musician1 = await Musician.findAll({ where: { id: 1} });
    res.json(musician1)
})
app.get('/musician2', async (req, res) => {
    const musician2 = await Musician.findAll({ where: { id: 2} });
    res.json(musician2)
})
app.get('/musician3', async (req, res) => {
    const musician3 = await Musician.findAll({ where: { id: 3} });
    res.json(musician3)
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})