const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 128,
    },
    body: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    published: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;