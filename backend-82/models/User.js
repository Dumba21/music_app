const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const SALT_WORK_FACTOR = 10;


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: async value => {
                const user = await User.findOne({email: value})
                if(user) return false;
            },
            message: 'This user is already registered',
        }
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    displayName:{
        type:String,
        required:true,
    },
    facebookId:String,
    avatarImage:{
        type:String,
    }
});

UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {

    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;