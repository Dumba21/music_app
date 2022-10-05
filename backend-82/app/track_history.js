const express = require('express');
const Track = require('../models/Track');
const TrackHistory = require('../models/TrackHistory');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {

        const tracks = await TrackHistory
            .find({user: req.user._id})
            .populate('user track')
            .sort({datetime: -1});


        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', auth, async (req, res) => {
    try {

        if (!req.body.track) {
            return res.status(404).send({error: 'Not found'});
        }

        const track = await Track.findById(req.body.track);

        if (!track) {
            return res.status(404).send({error: 'Not found'});
        }

        const trackData = {
            user: req.user._id, track: track._id, datetime: new Date().toISOString()
        };

        const trackHistory = new TrackHistory(trackData);
        await trackHistory.save();

        res.send({trackHistory});

    } catch (e) {
        res.status(500).send({error: 'Oops'})
    }
});


module.exports = router;