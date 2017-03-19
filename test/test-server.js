const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('blog-api-tests', function () {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });
  it ('should return posts on GET', function () {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        res.should.has.status(200);
        res.should.be.json;
        res.body.length.should.be.at.least(1);
        res.body.forEach((item) => {
          item.should.include.keys(["id", "content", "title", "author", "publishDate"]);
        });
      })
  });
  it ('should create posts on POST', function () {
    const testPost = {'title': 'thinkful', 'content': 'thinkfully', 'author': 'anonymous'}
    return chai.request(app)
      .post('/blog-posts')
      .send(testPost)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.include.keys(["id", "content", "title", "author", "publishDate"]);
      })
  })
  it ('should update the first post on PUT', function () {
    const putPost = {'title': 'thinkful', 'content': 'thinkfully', 'author': 'anonymous'}
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        const firstResultId = res.body[0].id;
        putPost.id = firstResultId;
        putPost.publishDate = res.body[0].publishDate;
        return chai.request(app)
          .put(`/blog-posts/${firstResultId}`)
          .send(putPost)})
      .then (function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.include.keys(["id", "content", "title", "author", "publishDate"]);
        res.body.should.deep.equal(putPost);
      });
  });
  it ('should delete the first item on DELETE', function () {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(200);
      })
  });
});
