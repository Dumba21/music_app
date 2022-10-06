const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

const image = require('../middleware/image');
const User = require("../models/User");


router.get('/', async (req, res) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});
        if (req.query.artist) {
            if (user === null || user.role === 'user') {

                const albums = await Album.find({artist: req.query.artist})
                    .find({published: true})
                    .populate('artist', 'name info')
                    .sort({releaseDate: 1});
                return res.send(albums);
            } else {
                const albums = await Album.find({artist: req.query.artist})
                    .populate('artist', 'name info')
                    .sort({releaseDate: 1});
                return res.send(albums);
            }

        } else {
            if (user === null || user.role === 'user') {
                const albums = await Album.find({published: true});
                return res.send(albums);
            } else {
                const albums = await Album.find();
                return res.send(albums);
            }
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const albums = await Album.findById(req.params.id)
            .populate('artist', 'name info');
        if (!albums) {
            res.status(404).send({message: 'Album not found'});
        }

        res.send(albums);

    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/', image.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.artist || !req.body.releaseDate) {
        return res.status(400).send('Data is not valid');
    }
    const album = {
        name: req.body.name,
        artist: req.body.artist,
        releaseDate: req.body.releaseDate,
        image: null,
    };

    if (req.filename) {
        album.image = 'uploads/' + req.file.filename;
    }

    try {
        const newAlbum = new Album(album);
        await newAlbum.save();
        res.send(newAlbum);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {

    const {id} = req.params;
    const findOne = await Album.findById(id);

    if (!findOne) {
        return res.status(401).send({message:'Not found'})
    }

    await Album.deleteOne(findOne);
    res.send({message:'Success'})
});


module.exports = router;
