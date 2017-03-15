const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const { BlogPosts } = require('./models'); 

const { blogPostRouter, p1, p2 } = require('./blogPostRouter');

const jsonParser = bodyParser.json(); 

const app = express();

app.use('/blog-posts', blogPostRouter);

// It should support the four CRUD operations for a blog posts resource.
// GET and POST requests should go to /blog-posts.
// DELETE and PUT requests should go to /blog-posts/:id.
// Use Express router and modularize routes to /blog-posts.
// Add a couple of blog posts on server load so you'll automatically have some data to look at when the server starts.

app.listen(process.env.PORT || 8080, function () {
    console.log(`you're listening on ${process.env.PORT || 8080}`);
});


