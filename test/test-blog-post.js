const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Post', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should list posts on GET', function() {
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.be.at.least(1);
      const expectedKeys = ['id', 'content', 'title', 'author'];
      res.body.forEach(function(item) {
        expect(item).to.be.a('object');
        expect(item).to.include.keys(expectedKeys);
      });
    });
  });

  it('should add a post on POST', function() {
    const newItem= {
      title: 'puppies',
      content: 'i like puppies',
      author: 'Joe Smith'
    };
    return chai.request(app)
    .post('/blog-posts')
    .send(newItem)
    .then(function(res) {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('id', 'title', 'content', 'author');
      expect(res.body.id).to.not.equal(null);
    });
  });

  it('should update a post on PUT', function() {
    const updateData= {
      title: 'dog',
      content: 'nevermind',
      author: 'blanca'
    };
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      updateData.id = res.body[0].id;
      return chai.request(app)
      .put(`/blog-posts/${updateData.id}`)
      .send(updateData);
    })
    .then(function(res) {
      expect(res).to.have.status(204);
    })
  });

  it('should delete the post on DELETE', function() {
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      return chai.request(app)
      .delete(`/blog-posts/${res.body[0].id}`)
    })
    .then(function(res) {
      expect(res).to.have.status(204);
    });
  });
});