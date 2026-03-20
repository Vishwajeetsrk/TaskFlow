const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // FIX: Ensure bio field exists in database
    bio: { type: String, default: '' }, 
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);