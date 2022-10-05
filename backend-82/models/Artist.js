const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:String,
    },
    info:{
        type:String,
        required: true
    },
    published:{
        type:Boolean,
        required:true,
        default: false,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;

