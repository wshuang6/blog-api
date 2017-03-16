const express = require('express');
const bodyParser = require('body-parser');

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
  for (let i=0; i<fields.length; i++) {
    if(!req.body.hasOwnProperty(fields[i])) {
      let message = `Missing ${fields[i]}`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  let newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(newPost);
});

router.delete('/:id', (req, res) => {
  for (let i=0; i<BlogPosts.posts.length; i++) {
    let post = BlogPosts.posts[i]; 
    if (req.params.id === post.id) {
      let message = `Post ID ${req.params.id} has been deleted`;
      BlogPosts.posts.splice(i, 1);
      return res.status(200).send(message);
    }
  }
  let message = `Post ID ${req.params.id} does not exist`;
  res.status(400).send(message);
});

router.put('/:id', jsonParser, (req, res) => {
  for (let i=0; i<BlogPosts.posts.length; i++) {
    let post = BlogPosts.posts[i];
    if (req.params.id === post.id) {
      post.title = req.body.title;
      post.author = req.body.author;
      post.content = req.body.content;
      let message = `blog item ${post.title} updated`;
      return res.status(200).json(post);
    }
  }
  let message = `Put ID ${req.params.id} does not exist`;
  console.error(message);
  return res.status(400).send(message);
 }); 

  // Old put follows --> not sure why but the forEach method is screwing up and running 
  // both return statements 
  // BlogPosts.posts.forEach(function(item, index){
  //   if (req.body.id === item.id) {
  //     item.title = req.body.title;
  //     item.author = req.body.author;
  //     item.content = req.body.content;
  //     let message = `blog item ${item.title} updated`;
  //     return res.status(200).json(item);
  //   }
  // });
  // let message = `Post ID ${req.params.id} does not exist`;
  // console.error(message);
  // return res.status(400).send(message);

  // Old post used forEach and the return statement/ res.send() in the forEach block failed to 
  // End the .post function !
  // fields.forEach(function(item) {
  //   if(!req.body.hasOwnProperty(item)) {
  //     let message = `Missing ${item}`;
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // });

module.exports = { 
	blogPostRouter: router, 
	p1: BlogPosts.create('how i made 150k with this easy trick', 'college graduates hate him!', 'william'), 
  p2: BlogPosts.create('ten things to do on Sunday', 'things i like to do on Sunday', 'peter') 
};