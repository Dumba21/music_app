const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    album:{
        type:Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
        validate: {
            validator: async value => {
                const track = await Track.findOne({number: value});

                if (track) return false;
            },
            message: 'Number of the track should be unique',
        }
    },
    published:{
        type:Boolean,
        required:true,
        default: false,
    }
});


const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;