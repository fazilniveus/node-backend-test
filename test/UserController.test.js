const chai = require('chai');
const chaiHttp = require('chai-http');

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

const server = require('../index');


describe('Sample testing code', () => {
  it('1.loginUser Success', (done) => {
    chai
      .request(server)
      .post('/admin/api/loginUser')
      .send({
        userId: 'actor1@gmail.com',
        password: 'Password@123',
        role: 'actor'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('role');
        res.should.have.status(200);
        done();
      });
  });


});
