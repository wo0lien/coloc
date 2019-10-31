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

describe("API call", () =>{
  describe("POST /db", () => {
    //test
    it("Should get a json response with 2 ingredients", (done) => {
      chai.request(server)
        .post('/db')
        .set('Content-type', 'application/json')
        .send({'ingredients': ['farine', 'oeufs'], 'quantite': [2, 3]})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res.body.ingredients).to.be.an('array').that.include('farine', 'oeufs');
          expect(res.body.ingredients).to.have.lengthOf(2);
          done();
        });
    });
  });
});