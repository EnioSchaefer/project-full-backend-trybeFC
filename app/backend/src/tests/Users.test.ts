import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {
  invalidEmailLoginBody, invalidMissingLoginBody, invalidPasswordFormatLoginBody,
  invalidPasswordLoginBody, userDB, validLoginBody, validToken
} from './mocks/Users.mock';

import { app } from '../app';
import userModel from '../database/models/Users.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Users service and controller', () => {
  let response: Response;

  describe('Valid post login', () => {

    before(async () => {
      sinon.stub(userModel, 'findOne').resolves(userDB as userModel);
    })

    after(() => {
      (userModel.findOne as sinon.SinonStub).restore();
    })

    it('returns status 200 with token', async () => {
      response = await chai.request(app).post('/login').send(validLoginBody);

      expect(response).to.have.status(200);
      expect(response.body).to.haveOwnProperty('token')

    })
  })
  describe('Invalid post login', () => {
    it('returns status 400 with missing fields message', async () => {
      response = await chai.request(app).post('/login').send(invalidMissingLoginBody);

      expect(response).to.have.status(400);
      expect(response.body.message).to.equal('All fields must be filled');
    })

    it('returns status 401 with invalid fields message with wrong format', async () => {
      response = await chai.request(app).post('/login').send(invalidPasswordFormatLoginBody);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Invalid email or password');
    })

    it('returns status 401 with invalid fields message with wrong email', async () => {
      response = await chai.request(app).post('/login').send(invalidEmailLoginBody);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Invalid email or password');
    })

    it('returns status 401 with invalid fields message with wrong password', async () => {
      response = await chai.request(app).post('/login').send(invalidPasswordLoginBody);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Invalid email or password');
    })
  })

  describe('Gets user role after logging in', () => {
    it('returns status 401 and token not found message', async () => {
      response = await chai.request(app).get('/login/role');

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Token not found');
    })

    it('returns status 401 and invalid token message', async () => {
      response = await chai.request(app).get('/login/role').set('Authorization', 'invalidToken');

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Token must be a valid token');
    })

    it('returns status 200 and the user`s role', async () => {
      response = await chai.request(app).get('/login/role').set('Authorization', validToken);

      expect(response).to.have.status(200);
      expect(response.body.role).to.equal('user');
    })
  })
});
