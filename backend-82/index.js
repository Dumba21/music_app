require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = 8000;


const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistory = require('./app/track_history');


app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.use('/artists', artists);
app.use('/albums', albums);
app.use('/tracks', tracks);
app.use('/users', users);
app.use('/track_history', trackHistory);

const run = async () => {
    await mongoose.connect(config.mongo.db);
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};
run().catch(e => console.error(e));
