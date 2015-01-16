var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);