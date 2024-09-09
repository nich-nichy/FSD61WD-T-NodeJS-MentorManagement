const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    students: [{
        type: Number,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('Mentor', mentorSchema);
