const { check, validationResult } = require('express-validator')
const express = require('express');
const musicianRouter = express.Router();
const {Musician} = require("../Musician");

// reading
musicianRouter.get('/musicians', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians)
})

musicianRouter.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findAll({ where: { id: req.params.id }})
    res.json(musician)
})


// creating
musicianRouter.post('/musicians', [
    check("name").not().isEmpty().trim(), 
    check("instrument").not().isEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.array() })
    } else {
        const newMusician = await Musician.create({
            name: req.body.name,
            instrument: req.body.instrument
        });
        res.status(201).send({ msg: "Successfully added musician", newMusician });
    }
})


// updating
musicianRouter.put('/musicians/:id', async (req, res) => {
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
musicianRouter.delete('/musicians/:id', async (req, res) => {
    const deletedMusician = await Musician.destroy({ where: { id: req.params.id } })

    res.status(200).send({ 
        msg: `Successfully deleted musician with id of ${req.params.id}`, 
        deletedMusician 
    })
})

module.exports = musicianRouter;