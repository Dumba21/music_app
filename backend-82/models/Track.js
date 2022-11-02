const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'true',
    }
});


TrackSchema.plugin(AutoIncrement, {id: 'inhabitant_seq',inc_field: 'number', reference_fields: 'album'})
const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;