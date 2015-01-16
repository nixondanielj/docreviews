var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    displayName: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);