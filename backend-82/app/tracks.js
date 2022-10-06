const express = require('express');
const Tracks = require('../models/Track');
const User = require("../models/User");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});
        if (req.query.album) {
            if (user === null || user.role === 'user') {
                const track = await Tracks
                    .find({album: req.query.album})
                    .find({published: true})
                    .populate({
                        path: 'album',
                        populate: {
                            path: 'artist'
                        }
                    })
                    .sort({number: 1});

                return res.send(track);
            } else {
                const track = await Tracks
                    .find({album: req.query.album})
                    .populate({
                        path: 'album',
                        populate: {
                            path: 'artist'
                        }
                    })
                    .sort({number: 1});
                return res.send(track);
            }

        } else {
            if (user === null || user.role === 'user') {
                const track = await Tracks.find({published: true});
                return res.send(track);
            } else {
                const track = await Tracks.find();
                return res.send(track);
            }
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
        res.status(400).send({error: e.errors});
    }
});

router.delete('/:id', async (req, res) => {

    const {id} = req.params;
    const findOne = await Tracks.findById(id);

    if (!findOne) {
        return res.status(401).send({message:'Not found'})
    }

    await Tracks.deleteOne(findOne);
    res.send({message:'Success'})
});

module.exports = router;