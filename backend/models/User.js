const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skinProfile: {
        skinType: { type: String, enum: ['Oily', 'Dry', 'Sensitive', 'Normal'], default: 'Normal' },
        concerns: [String],
        lastAnalysis: {
            score: Number,
            detectedIssues: [String],
            date: Date
        }
    },
    streak: { type: Number, default: 0 },
    lastRoutineDate: Date
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
