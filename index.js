const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

// article model
const Article = require('./article-model');
// mongodb connect
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

// middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// CRUD: create, read, update, delete
// Method: post, get, put or patch, delete


app.post('/create', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    const article = new Article({
        title,
        body,
    });

    article.save()
        .then(data => {
            res.status(201).json({
                message: 'Created!',
                data,
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            });
        });
});

app.get('/', (req, res) => {
    Article.find()
        .then(data => {
            res.status(200).json({
                data,
            });
        })
        .catch(error => {
            res.status(404).json({
                message: error.messagae,
            });
        });
});

app.put('/update/:articleId', (req, res) => {
    const id = req.params.articleId;
    const article = Article.findById(id);

    const title = req.body.title;
    const body = req.body.body;

    article.update({
        title,
        body,
    })
        .then(data => {
            res.status(200).json({
                message: 'Article updated!',
                data,
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            });
        });
});

app.delete('/delete/:articleId', (req, res) => {
    const id = req.params.articleId;

    // id
    // id: id
    // _id: id
    Article.findOneAndDelete({_id: id})
        .then(data => {
            res.status(200).json({
                message: 'Deleted!',
                data,
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            });
        });
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`);
});