const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const server = require('../../server/server');

// example functional tests of routes
describe('GET /', () => {
    it('responds with homepage', () => {
        return request(server)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200)
            .then(response => {
                expect(response.text).to.include(
                    // 'You are running a Node.js microservice built for the IBM Cloud.',
                    'You need to enable JavaScript to run this app.',
                );
            });
    });
});

describe('GET /health', () => {
    it('responds with json', () => {
        return request(server)
            .get('/health/')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {
                status: 'UP',
                dbConectionStatus: 'OFF',
            });
    });
});

describe('GET /swagger/api-docs', () => {
    it('responds with swagger', () => {
        return request(server)
            .get('/swagger/api-docs/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then(response => {
                expect(response.text).to.include('Swagger');
            });
    });
});

describe('/POST /user/login', () => {
    it('it should not login WITHOUT token or password field', () => {
        let user = { "usern": "OtoelAlex" };
        request(server)
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                expect(res.body).to.be('string')
                expect(res.body).to.include('Incorrect email/usern or password')
                done();
            });
    });
});



//---------------

describe('/POST /user/login', () => {
    it('it should login either with username (usern) ', () => {
        let user1 = {
            "usern": "OtoelAlex",
            "pwd": "fastpassword"
        };
        request(server)
            .post('/user/login')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('usern');
                expect(res.body.usern).to.include('OtoelAlex');
                res.body.should.property('email');
                expect(res.body.email).to.include('otoelalex@gmail.com');
                res.body.should.have.property('token').eql('required');
                done();

            });
    });
});

describe('/POST /user/login', () => {
    it('or email ', () => {
        let user1 = {
            "email": "otoelalex@gmail.com",
            "pwd": "fastpassword"
        };
        request(server)
            .post('/user/login')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('usern');
                expect(res.body.usern).to.include('OtoelAlex');
                res.body.should.property('email');
                expect(res.body.email).to.include('otoelalex@gmail.com');
                res.body.should.have.property('token').eql('required');
                done();
            });
    });
});

describe('/POST /user/register', () => {
    it('user without username ', () => {
        let user1 = {
            "email": "otoelalex@gmail.com",
            "pwd": "fastpassword"
        };
        request(server)
            .post('/user/register')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(401);
                expect(res.body).to.be('string')
                expect(res.body).to.include('Error: User invalid information')
                done();
            });
    });
});

describe('/POST /user/login', () => {
    it('or email ', () => {
        let user1 = {
            "email": "otoelalex@gmail.com",
            "pwd": "fastpassword"
        };
        request(server)
            .post('/user/login')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('usern');
                expect(res.body.usern).to.include('OtoelAlex');
                res.body.should.property('email');
                expect(res.body.email).to.include('otoelalex@gmail.com');
                res.body.should.have.property('token').eql('required');
                done();
            });
    });
});