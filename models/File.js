var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var fileSchema = mongoose.Schema({
    master: { type: ObjectId, ref: 'File', required: true },
    uploader: { type: ObjectId, ref: 'User', required: true },
    uploaded: { type: Date, default: Date.now() },
    approvals: [{ type: ObjectId, ref: 'User' }],
    rejections: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('File', fileSchema);