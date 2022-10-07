const express = require('express');
const Tracks = require('../models/Track');
const User = require("../models/User");
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', async (req, res) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});
        if (req.query.album) {

            if (user === null) {
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
            }

            if (user.role === 'user') {
                const published = await Tracks
                    .find({album: req.query.album})
                    .find({published: true})
                    .populate({
                        path: 'album',
                        populate: {
                            path: 'artist'
                        }
                    })
                    .sort({number: 1});
                const notPublished = await Tracks
                    .find({album: req.query.album})
                    .find({published: false})
                    .find({user: user._id})
                    .populate({
                        path: 'album',
                        populate: {
                            path: 'artist'
                        }
                    })
                    .sort({number: 1});

                return res.send({published, notPublished});
            }

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

        } else {

            if (user === null) {
                const track = await Tracks.find({published: true});
                return res.send(track);
            }

            if (user.role === 'user') {
                const published = await Tracks.find({published: true});
                const notPublished = await Tracks
                    .find({published: false})
                    .find({user: user._id});
                return res.send({published, notPublished});
            }

            const track = await Tracks.find();
            return res.send(track);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;
        const track = await Tracks.findById(id);

        if (!track) {
            return res.status(401).send({message: 'Track not found'})
        }

        track.published = true;
        track.save({validateBeforeSave: false})
        res.send('success');
    } catch (e) {
        res.send(500);
    }
})

router.post('/', auth, async (req, res) => {
    if (!req.body.name || !req.body.album || !req.body.duration || !req.body.number) {
        return res.status(400).send('Data is not valid');
    }
    try {
        const Track = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            number: req.body.number,
            user: req.user._id,
        };

        const newTrack = new Tracks(Track);
        await newTrack.save();
        res.send(newTrack);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});


router.delete('/:id', auth, permit('admin'), async (req, res) => {

    const {id} = req.params;
    const findOne = await Tracks.findById(id);

    if (!findOne) {
        return res.status(401).send({message: 'Not found'})
    }

    await Tracks.deleteOne(findOne);
    res.send({message: 'Success'})
});

module.exports = router;