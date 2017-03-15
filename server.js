const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const router = express.Router();
const {BlogPosts} = require('./models'); // {BlogPosts: Object}
// const BlogPosts = myObj.BlogPosts;

const jsonParser = bodyParser.json(); 
const app = express();

app.use(jsonParser);

BlogPosts.create('how i made 150k with this easy trick', 'college graduates hate him!', 'william');
BlogPosts.create('ten things to do on Sunday', 'things i like to do on Sunday', 'peter');

app.get('/blog-posts/', function (req, res){
  res.json(BlogPosts.get());
});

app.get('/blog-posts/:id', function (req, res){
  console.log(req.params.id);
  res.json(BlogPosts.get(req.params.id));
});


// It should support the four CRUD operations for a blog posts resource.
// GET and POST requests should go to /blog-posts.
// DELETE and PUT requests should go to /blog-posts/:id.
// Use Express router and modularize routes to /blog-posts.
// Add a couple of blog posts on server load so you'll automatically have some data to look at when the server starts.

app.listen(process.env.PORT || 8080, function () {
    console.log(`you're listening on ${process.env.PORT || 8080}`);
});


