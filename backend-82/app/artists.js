const express = require('express');
const router = express.Router();
const Artists = require('../models/Artist');

const image = require('../middleware/image');


router.get('/', async (req, res) => {
    try {
        const artists = await Artists.find({published: true})
        res.send(artists);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleArtist = await Artists.findById(req.params.id);
        if (!singleArtist) {
            res.status(404).send({message: 'Artist not found'});
        } else {
            res.send(singleArtist);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/', image.single('image'), async (req, res) => {

    if (!req.body.name || !req.body.info) {
        return res.status(400).send('Data is not valid');
    }

    const artist = {
        name: req.body.name,
        image: null,
        info: req.body.info
    };

    if (req.file) {
        artist.image = 'uploads/' + req.file.filename;
    }

    try {
        const newArtist = new Artists(artist);
        await newArtist.save();
        res.send(newArtist);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
