var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var commentSchema = mongoose.commentSchema({
    user: { type: ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    edited: Date
});

module.exports = mongoose.model('Comment', commentSchema)