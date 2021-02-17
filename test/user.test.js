const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const setup = require('../config/conn')

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

var id;

var jwt_header = {
    "Authorization": ""
};
var token_header = {
    "token": "fjsdlafoiefvmdskjijviosad"
}



before(async () => {
    await setup();
});

describe('functional - user', () => {

    /* create user test */
    it('should create a user', async () => {
        const user = {
            email: 'kundan@gmail.com',
            password: 'password'
        };
        const res = await request(app).post('/user/create-user').set(token_header).send(user);
        expect(res.status).to.equal(200);
        jwt_header.Authorization = 'Bearer '+res.body.jwt_token;
        id = res.body.data._id;
        expect(res.body.data.email).to.equal(user.email);
    });

    /* get users test */
    it('should get all users', async () => {
        const res = await request(app).get('/user/get-all-user').set(jwt_header);
        expect(res.status).to.equal(200);
    });

    /* get a user test */
    it('should get a user', async () => {
        const res = await request(app).get('/user/get-user/'+id).set(jwt_header);
        expect(res.status).to.equal(200);
        expect(res.body.data._id).to.equal(id);
    });

    /* delete user test */
    it('should delete a user', async () => {
        const res = await request(app).delete('/user/delete-user/'+id).set(token_header);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.equal(id);
    });
});