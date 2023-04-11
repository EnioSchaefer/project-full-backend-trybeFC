import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teamsDB } from './mocks/Teams.mock';

import { app } from '../app';
import teamsModel from '../database/models/Teams.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Teams service and controller', () => {
  let response: Response;

  describe('Valid teams request', function () {

    before(async () => {
      sinon.stub(teamsModel, 'findAll').resolves(teamsDB as teamsModel[]);
      sinon.stub(teamsModel, 'findByPk').resolves(teamsDB[2] as teamsModel);
    })

    after(() => {
      (teamsModel.findAll as sinon.SinonStub).restore();
      (teamsModel.findByPk as sinon.SinonStub).restore();
    })

    it('returns a status 200 with all of the teams', async () => {
      response = await chai.request(app).get('/teams');

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(teamsDB);
    })

    it('returns a status 200 with a single team', async () => {
      response = await chai.request(app).get('/teams/3');

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(teamsDB[2]);
    })
  })
})
