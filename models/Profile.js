const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// I dont know what profile should have
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: Number,
        required: true
    },
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);

