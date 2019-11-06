//import testing dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Configure chai
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe("Basic pages", () => {
  describe("GET /", () => {
    //test to get the home page 
    it("Should get a single page", (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          expect(err).to.be.null;
          done();
        });
    });
  });
});

describe("API calls", () =>{
  describe("POST valid /product/create request", () => {
    //test
    it("Should get a 200 res", (done) => {
      chai.request(server)
        .post('/product/create')
        .set('Content-type', 'application/json')
        .send({'name': 'farine', 'quantity': 2})
        .end(function (err, res) {
          expect(err).to.be.null;
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("POST not valid /product/create request", () => {
    //test
    it("Should get a 500 res", (done) => {
      chai.request(server)
        .post('/product/create')
        .set('Content-type', 'application/json')
        .send({'name': 'farine', 'quantity': 'lo'})
        .end(function (err, res) {
          console.log("chai " + res);
          res.should.have.status(500);
          done();
        });
    });
  });
});