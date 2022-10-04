const express = require('express');
const Tracks = require('../models/Track');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const track = await Tracks.find({album: req.query.album})
                .populate({
                    path: 'album',
                    populate: {
                        path: 'artist'
                    }
                })
                .sort({number: 1});
            res.send(track);
        } else {
            const track = await Tracks.find();
            res.send(track);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.album || !req.body.duration || !req.body.number) {
        return res.status(400).send('Data is not valid');
    }
    try {
        const Track = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            number: req.body.number,
        };
        const newTrack = new Tracks(Track);
        await newTrack.save();
        res.send(newTrack);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;