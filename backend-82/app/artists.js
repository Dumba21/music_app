const express = require('express');
const router = express.Router();
const Artists = require('../models/Artist');

const image = require('../middleware/image');
const User = require("../models/User");

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', async (req, res) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});

        if (user === null) {

            const artists = await Artists.find({published: true});
            return res.send(artists);
        }

        if (user.role === 'user') {
            const published = await Artists.find({published: true});
            const notPublished = await Artists
                .find({published: false})
                .find({user: user._id});

            return res.send({published, notPublished});
        }

        const artists = await Artists.find();
        return res.send(artists);

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


router.post('/', auth, image.single('image'), async (req, res) => {

    if (!req.body.name || !req.body.info) {
        return res.status(400).send('Data is not valid');
    }

    const artist = {
        name: req.body.name,
        image: null,
        info: req.body.info,
        user: req.user._id
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

router.delete('/:id', async (req, res) => {

    const {id} = req.params;
    const findOne = await Artists.findById(id);

    if (!findOne) {
        return res.status(401).send({message: 'Not found'})
    }

    await Artists.deleteOne(findOne);
    res.send({message: 'Success'})
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;
        const artist = await Artists.findById(id);

        if (!artist) {
            return res.status(401).send({message: 'Artist not found'})
        }

        artist.published = true;
        artist.save()
        res.send('success');
    } catch (e) {
        res.send(500);
    }
})

module.exports = router;
