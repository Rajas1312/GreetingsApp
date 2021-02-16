const mongoose = require('mongoose');

const GreetingsSchema = mongoose.Schema({
    name: String,
    greeting: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Greetings', GreetingsSchema);