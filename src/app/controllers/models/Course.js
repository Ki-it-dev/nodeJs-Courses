const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    slug: { type: String },
    videoID: { type: String },
});

module.exports = mongoose.model('Course', Course)
