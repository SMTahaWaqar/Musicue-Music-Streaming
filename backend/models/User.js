import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
        },
        username: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        likedSongs: {
            type: Array,
            default: []
        },
        customPlaylist: {
            type: Array,
            default: []
        }
    }, {timestamps: true}
);

const User = mongoose.model('User', UserSchema);
export default User;