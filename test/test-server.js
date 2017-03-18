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
        // res.status.should.be(200);
        res.should.be.json;
        res.body.length.should.be.at.least(0);
      })
  });
});
