const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Track = require('./models/Track');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, root] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
    }, {
        username: 'root',
        password: 'root',
        token: nanoid(),
    });

    const [the_weeknd, imagine_dragons] = await Artist.create({
        name: 'The Weeknd',
        image: 'fixtures/THE_WEEKND.png',
        info: 'Abel Makkonen Tesfaye ( AH-bell-tes-FAY; born February 16, 1990), known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences.He has received numerous accolades, including four Grammy Awards, 20 Billboard Music Awards, 17 Juno Awards, six American Music Awards, two MTV Video Music Awards, and nominations for an Academy Award, a Latin Grammy Award, and a Primetime Emmy Award.'
    }, {
        name: 'imagine Dragons',
        image: 'fixtures/IMAGINE_DRAGONS.png',
        info: 'Imagine Dragons is an American pop rock band from Las Vegas, Nevada, consisting of lead singer Dan Reynolds, guitarist Wayne Sermon, bassist Ben McKee and drummer Daniel Platzman.The band first gained exposure with the release of their single "It\'s Time", followed by their award-winning debut studio album Night Visions (2012), which resulted in the chart-topping singles "Radioactive" and "Demons". Rolling Stone named "Radioactive", which held the record for most weeks charted on the Billboard Hot 100, the "biggest rock hit of the year". MTV called them "the year\'s biggest breakout band", and Billboard named them their "Breakthrough Band of 2013" and "Biggest Band of 2017", and placed them at the top of their "Year in Rock" rankings for 2013, 2017, and 2018. Imagine Dragons topped the Billboard Year-End "Top Artists – Duo/Group" category in 2018.[10]'
    });

    const [Beauty_Behind_the_Madness, Night_Visions] = await Album.create({
        name: 'Beauty Behind the Madness',
        artist: the_weeknd._id,
        releaseDate: 2015,
        image: 'fixtures/the_weeknd.jpeg',
    }, {
        name: 'Night Visions',
        artist: imagine_dragons._id,
        releaseDate: 2012,
        image: 'fixtures/imagine_dragons.jpeg'
    });

    await Track.create({
        name: 'Radioactive',
        album: Night_Visions._id,
        duration: '3:06',
        number:1
    },{
        name: 'On Top of the World',
        album: Night_Visions._id,
        duration: '4:02',
        number:2
    },{
        name: 'It\'s Time',
        album: Night_Visions._id,
        duration: '4:07',
        number:3
    },{
        name: 'The Hills',
        album: Beauty_Behind_the_Madness._id,
        duration: '3:55',
        number:1
    },{
        name: 'Earned it',
        album: Beauty_Behind_the_Madness._id,
        duration: '4:36',
        number:2
    });

    await mongoose.connection.close();
};

run().catch(console.error);