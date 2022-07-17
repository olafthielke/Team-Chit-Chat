const  mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   
    },
    avatar: {
        type: String
    },
    createdBy: {
        type: String
    },
    whenCreated: {
        type: Date,
        default: Date.now
    },
    whenUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);