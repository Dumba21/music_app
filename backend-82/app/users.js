const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const {username, password} = req.body;

        if (!username || !password) {
            res.status(400).send({error: 'Data not valid'});
        }

        const userData = {username, password};
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).send({error: 'Credentials are wrong!'});
        } else {
            const isMatch = await user.checkPassword(req.body.password);
            if (!isMatch) {
                res.status(401).send({error: 'Credentials are wrong!'});
            }
            user.generateToken();
            const token = user.token
            await user.save({validateBeforeSave: false});
            res.send({username: user.username, token,role:user.role});
        }
    } catch (e) {
        res.status(500);
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});


module.exports = router;