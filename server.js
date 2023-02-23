const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;
app.use(express.json()); // parsing middleware

//TODO
// reading
app.get('/musicians', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians)
})

app.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findAll({ where: { id: req.params.id }})
    res.json(musician)
})

// creating
app.post('/musicians', async (req, res) => {
    const newMusician = await Musician.create({
        name: req.body.name,
        instrument: req.body.instrument
    });
    res.status(201).send({ msg: "Successfully added musician", newMusician });
})


// updating
app.put('/musicians/:id', async (req, res) => {
    try {
        const updateMusician = await Musician.update({
            name: req.body.name,
            instrument: req.body.instrument
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({ msg: "Musician successfully updated", updateMusician: updateMusician })
    } catch (error) {
        res.sendStatus(400)
    }
})


// deleting
app.delete('/musicians/:id', async (req, res) => {
    const deletedMusician = await Musician.destroy({ where: { id: req.params.id } })

    res.status(200).send({ 
        msg: `Successfully deleted musician with id of ${req.params.id}`, 
        deletedMusician 
    })
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})