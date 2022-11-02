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

    const [admin, user] = await User.create({
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin',
        avatarImage:'fixtures/bob.png'
    }, {
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName:'User',
        avatarImage: 'fixtures/patrick.png',
    });

    const [the_weeknd, imagine_dragons, savage] = await Artist.create({
        name: 'The Weeknd',
        image: 'fixtures/THE_WEEKND.png',
        info: 'Abel Makkonen Tesfaye ( AH-bell-tes-FAY; born February 16, 1990), known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences.He has received numerous accolades, including four Grammy Awards, 20 Billboard Music Awards, 17 Juno Awards, six American Music Awards, two MTV Video Music Awards, and nominations for an Academy Award, a Latin Grammy Award, and a Primetime Emmy Award.',
        published: true,
        user: admin._id
    }, {
        name: 'imagine Dragons',
        image: 'fixtures/IMAGINE_DRAGONS.png',
        info: 'Imagine Dragons is an American pop rock band from Las Vegas, Nevada, consisting of lead singer Dan Reynolds, guitarist Wayne Sermon, bassist Ben McKee and drummer Daniel Platzman.The band first gained exposure with the release of their single "It\'s Time", followed by their award-winning debut studio album Night Visions (2012), which resulted in the chart-topping singles "Radioactive" and "Demons". Rolling Stone named "Radioactive", which held the record for most weeks charted on the Billboard Hot 100, the "biggest rock hit of the year". MTV called them "the year\'s biggest breakout band", and Billboard named them their "Breakthrough Band of 2013" and "Biggest Band of 2017", and placed them at the top of their "Year in Rock" rankings for 2013, 2017, and 2018. Imagine Dragons topped the Billboard Year-End "Top Artists – Duo/Group" category in 2018.',
        published: true,
        user: admin._id
    }, {
        name: '21 Savage',
        image: 'fixtures/21_SAVAGE.jpg',
        info: 'Shéyaa Bin Abraham-Joseph (born October 22, 1992), known professionally as 21 Savage, is a rapper based in Atlanta, Georgia, United States. Born in London, he moved to Atlanta with his mother at age seven. He became known after releasing two mixtapes in 2015, before attaining international attention with the release of the collaborative EP Savage Mode (2016) with Metro Boomin; its singles "X" (featuring Future) and "No Heart" peaked within the top 40 on the Billboard Hot 100 and 21 Savage\'s profile also later increased with a guest feature on Drake\'s 2016 single "Sneakin\'". He then signed a recording contract with Epic Records in January 2017.',
        published: true,
        user: admin._id
    });

    const [Beauty_Behind_the_Madness, Night_Visions, Without_Warning, Savage_Mode] = await Album.create({
        name: 'Beauty Behind the Madness',
        artist: the_weeknd._id,
        releaseDate: 2015,
        image: 'fixtures/the_weeknd.jpeg',
        published: true,
        user: admin._id
    }, {
        name: 'Night Visions',
        artist: imagine_dragons._id,
        releaseDate: 2012,
        image: 'fixtures/imagine_dragons.jpeg',
        published: true,
        user: admin._id
    }, {
        name: 'Without Warning',
        artist: savage._id,
        releaseDate: 2017,
        image: 'fixtures/without-warning.jpeg',
        published: true,
        user: admin._id
    }, {
        name: 'Savage Mode',
        artist: savage._id,
        releaseDate: 2016,
        image: 'fixtures/savage_mode.jpeg',
        published: true,
        user: admin._id
    });

    await Track.create({
        name: 'Radioactive',
        album: Night_Visions._id,
        duration: '3:06',
        number: 1,
        published: true,
        user: admin._id
    }, {
        name: 'On Top of the World',
        album: Night_Visions._id,
        duration: '4:02',
        number: 2,
        published: true,
        user: admin._id
    }, {
        name: 'It\'s Time',
        album: Night_Visions._id,
        duration: '4:07',
        number: 3,
        published: true,
        user: admin._id
    }, {
        name: 'Demons',
        album: Night_Visions._id,
        duration: '2:56',
        number: 4,
        published: true,
        user: admin._id

    }, {
        name: 'Bleeding Out',
        album: Night_Visions._id,
        duration: '3:43',
        number: 5,
        published: true,
        user: admin._id

    }, {
        name: 'My Fault',
        album: Night_Visions._id,
        duration: '2:56',
        number: 6,
        published: true,
        user: admin._id

    }, {
        name: 'The Hills',
        album: Beauty_Behind_the_Madness._id,
        duration: '3:55',
        number: 1,
        published: true,
        user: admin._id

    }, {
        name: 'Shameless',
        album: Beauty_Behind_the_Madness._id,
        duration: '4:14',
        number: 2,
        published: true,
        user: admin._id

    }, {
        name: 'Earned it',
        album: Beauty_Behind_the_Madness._id,
        duration: '4:36',
        number: 3,
        published: true,
        user: admin._id

    }, {
        name: 'Can\'t Feel My Face',
        album: Beauty_Behind_the_Madness._id,
        duration: '3:15',
        number: 4,
        published: true,
        user: admin._id

    }, {
        name: 'Often',
        album: Beauty_Behind_the_Madness._id,
        duration: '3:15',
        number: 5,
        published: true,
        user: admin._id

    }, {
        name: 'Ghostface Killers',
        album: Without_Warning._id,
        duration: '4:29',
        number: 1,
        published: true,
        user: admin._id

    }, {
        name: 'My Choppa Hate N****s',
        album: Without_Warning._id,
        duration: '2:29',
        number: 2,
        published: true,
        user: admin._id

    }, {
        name: 'Disrespectful',
        album: Without_Warning._id,
        duration: '2:40',
        number: 3,
        published: true,
        user: admin._id

    }, {
        name: 'Rap Saved Me',
        album: Without_Warning._id,
        duration: '4:18',
        number: 4,
        published: true,
        user: admin._id

    }, {
        name: 'Nightmare',
        album: Without_Warning._id,
        duration: '4:18',
        number: 5,
        published: true,
        user: admin._id

    }, {
        name: 'Run Up The Racks',
        album: Without_Warning._id,
        duration: '3:10',
        number: 6,
        published: true,
        user: admin._id

    }, {
        name: 'Ric Flair Drip',
        album: Without_Warning._id,
        duration: '2:53',
        number: 7,
        published: true,
        user: admin._id

    }, {
        name: 'Mad Stalkers',
        album: Without_Warning._id,
        duration: '3:23',
        number: 8,
        published: true,
        user: admin._id

    }, {
        name: 'Still Serving',
        album: Without_Warning._id,
        duration: '3:52',
        number: 9,
        published: true,
        user: admin._id

    }, {
        name: 'Darth Vader',
        album: Without_Warning._id,
        duration: '3:49',
        number: 1,
        published: true,
        user: admin._id
    }, {
        name: 'No Advance',
        album: Savage_Mode._id,
        duration: '4:37',
        number: 1,
        published: true,
        user: admin._id

    }, {
        name: 'Savage Mode',
        album: Savage_Mode._id,
        duration: '4:10',
        number: 2,
        published: true,
        user: admin._id

    }, {
        name: 'Mad High',
        album: Savage_Mode._id,
        duration: '3:01',
        number: 3,
        published: true,
        user: admin._id

    }, {
        name: 'No Heart',
        album: Savage_Mode._id,
        duration: '3:55',
        number: 4,
        published: true,
        user: admin._id

    }, {
        name: 'Bad Guy',
        album: Savage_Mode._id,
        duration: '2:50',
        number: 5,
        published: true,
        user: admin._id

    }, {
        name: 'Feel It',
        album: Savage_Mode._id,
        duration: '2:44',
        number: 6,
        published: true,
        user: admin._id

    }, {
        name: 'X',
        album: Savage_Mode._id,
        duration: '4:19',
        number: 7,
        published: true,
        user: admin._id

    }, {
        name: 'Real Nigga',
        album: Savage_Mode._id,
        duration: '3:06',
        number: 8,
        published: true,
        user: admin._id

    }, {
        name: 'Ocean Drive',
        album: Savage_Mode._id,
        duration: '3:48',
        number: 9,
        published: true,
        user: admin._id

    });

    await mongoose.connection.close();
};

run().catch(console.error);