import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            username,
            password,
            likedSongs,
            customePlaylist
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password : passwordHash,
            likedSongs,
            customePlaylist
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// LOGIN USER
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) return res.status(400).json({ message: 'User does not exists' });        

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials'});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}