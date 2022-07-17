import { Schema as _Schema, Types, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
    _id: Types.ObjectId,
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

export default model('User', userSchema);