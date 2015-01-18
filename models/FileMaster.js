var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var fileSchema = mongoose.Schema({
    displayName: { type: String, required: true },
    description: String,
    owner: { type: ObjectId, ref: 'User', required: true },
    collaborators: [{ type: ObjectId, ref: 'User' }],
    opened: { type: Date, default: Date.now() },
    open: { type: Boolean, default: true }
});

module.exports = mongoose.model('FileMaster', fileSchema);