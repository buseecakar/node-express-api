const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');


chai.use(chaiHttp);

describe('/POST data-filter-service test', () => {
    it('When date and count is sent to it, existing record is returned', (done) => {
        const reqBody = {
            startDate: '2016-01-26',
            endDate: '2016-01-30',
            minCount: 2700,
            maxCount: 3000
        };
        chai.request(server).post('/api/data-filter').send(reqBody).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('msg');
            res.body.should.have.property('records');
            done();
        });
    });
});