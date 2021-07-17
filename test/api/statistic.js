const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {saveItemStatistic} = require('../../services/StatisticService');

const server = require('../../app.js');

var { Statistics } = require('../../models/statistics.model');
var User = require('../../models/user.model');

chai.use(chaiHttp);

const raw_data = {
    "continent": "Centro America",
    "country": "Nicaragua",
    "population": 288272,
    "cases": {
        "new": null,
        "active": 71,
        "critical": null,
        "recovered": 58,
        "1M_pop": "447",
        "total": 129
    },
    "deaths": {
        "new": null,
        "1M_pop": null,
        "total": null
    },
    "tests": {
        "1M_pop": "120386",
        "total": 34704
    },
    "day": "2021-07-15",
    "time": "2021-07-15T15:30:08+00:00"
} 

describe('Statistic API', () => {

    before(async () => {

        await User.deleteMany();
        await Statistics.deleteMany();

        raw_data['country'] = 'Nicaragua';
        
        await saveItemStatistic(raw_data);

    });

    it('should Register user, login user, check token and get all statictis', (done) => {
        
        chai.request(server)
        .post('/auth/signup')
        .send({
            'email':'robertouraccan@gmail.com',
            'password':'Abc123..'
        })
        .end((err, res) => {

            res.should.have.status(200);

            chai.request(server)
            .post('/auth/login')
            .send({
                'email':'robertouraccan@gmail.com',
                'password':'Abc123..'
            }).end(async (err, res) => {

                res.body.should.have.property('token');
                let token = res.body.token;
                
                var response_statistic_all = await chai.request(server)
                .get('/statistic')
                .set('x-token', token);

                response_statistic_all.should.have.status(200);
                response_statistic_all.body.should.have.property('data');
                
                var response_statistic_by_country = await chai.request(server)
                .get('/statistic/Nicaragua')
                .set('x-token', token);
                
                response_statistic_by_country.should.have.status(200);
                response_statistic_by_country.body.should.have.property('data');

                raw_data['country'] = 'moon';

                var response_statistic_new = await chai.request(server)
                .post('/statistic')
                .set('x-token', token)
                .send(raw_data);

                response_statistic_new.should.have.status(200);
                
                done();
                
            });

        });
               
    }).timeout(15000);

});
