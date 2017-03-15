const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const router = express.Router();
const { BlogPosts } = require('./models'); 

const jsonParser = bodyParser.json(); 

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.json(BlogPosts.get(req.params.id));
});

router.post('/', jsonParser, (req, res) => {
  const fields = ["title", "content", "author"];
  fields.forEach(function(item) {
    if(!req.body.hasOwnProperty(item)) {
      let message = `Missing ${item}`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).end();
});

router.delete('/:id', (req, res) => {
  let message = `Post ID ${req.params.id} does not exist`;
  BlogPosts.posts.forEach(function(object, i) {
    if (req.params.id === object.id) {
      let message = `Post ID ${req.params.id} has been deleted`;
      BlogPosts.posts.splice(i, 1);
      return res.status(200).send(message);
    }
  });
  res.status(400).send(message);
});

router.put('/:id', (req, res) => {
  let message = `Post ID ${req.params.id} does not exist`;
});

module.exports = { 
	blogPostRouter: router, 
	p1: BlogPosts.create('how i made 150k with this easy trick', 'college graduates hate him!', 'william'), 
  p2: BlogPosts.create('ten things to do on Sunday', 'things i like to do on Sunday', 'peter') 
};