const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String, require:true,},
    description: { type: String },
    image: { type: String, default:'https://cdn.fullstack.edu.vn/f8-learning/courses/6.png' },
    slug: { type: String, slug: 'name', unique:true,},
    videoID: { type: String, require:true,},
    level: { type: String},
},{
    timestamps: true,
});

module.exports = mongoose.model('Course', Course)
