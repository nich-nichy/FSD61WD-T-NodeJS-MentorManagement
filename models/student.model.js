const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mentor: {
        type: Number,
        ref: 'Mentor',
        default: null
    },
    previousMentor: {
        type: Number,
        ref: 'Mentor',
        default: null
    }
});

module.exports = mongoose.model('Student', studentSchema);
