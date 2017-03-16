const express = require('express');
const morgan = require('morgan');
const { BlogPosts } = require('./models'); 
const { blogPostRouter, p1, p2 } = require('./blogPostRouter');

const app = express();

app.use(morgan('common'));
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, function () {
    console.log(`you're listening on ${process.env.PORT || 8080}`);
});


