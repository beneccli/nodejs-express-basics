process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../src/app');
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiQmVub8OudCBFLiIsInBpY3R1cmUiOm51bGwsImFkbWluIjpmYWxzZSwiaWF0IjoxNTc5NDI4NTYyfQ.DVc8-jcWympY__2e3Gq17NzeLKyGJKUb70nefkCSMJw';

chai.use(chaiHttp);

describe('routes : index', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  // describe('GET /', () => {
  //   it('should render the index', (done) => {
  //     chai.request(server)
  //     .get('/')
  //     .end((err, res) => {
  //       res.redirects.length.should.equal(0);
  //       res.status.should.equal(200);
  //       res.type.should.equal('application/json');
  //       res.body.page.should.equal('home');
  //       done();
  //     });
  //   });
  // });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
      .get('/404')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(404);
        // res.type.should.equal('application/json');
        // res.body.message.should.eql('Not Found');
        done();
      });
    });
  });

  describe('GET /jwt', () => {
    it('should return 200', (done) => {
      chai.request(server)
      .get('/jwt')
      .set('Authorization', `Bearer ${jwt}`)
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe('GET /jwt', () => {
    it('should return 401', (done) => {
      chai.request(server)
      .get('/jwt')
      .set('Authorization', `Bearer iamnotavaliduser`)
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(401);
        done();
      });
    });
  });

});
