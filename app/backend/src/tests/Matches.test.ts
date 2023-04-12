import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import validToken from './mocks/validToken.mock';
import { invalidIdBody, matchesDB, repeatedIdBody } from './mocks/Matches.mock';

import { app } from '../app';
import matchesModel from '../database/models/Matches.model';


import { Response } from 'superagent';
import TeamsModel from '../database/models/Teams.model';
import { teamsDB } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Matches service and controller', () => {
  let response: Response;

  describe('Valid all matches request', () => {

    before(async () => {
      sinon.stub(matchesModel, 'findAll').resolves(matchesDB as matchesModel[]);
    })

    after(() => {
      (matchesModel.findAll as sinon.SinonStub).restore();
    })

    it('returns status 200 with all matches', async () => {
      response = await chai.request(app).get('/matches').set('Authorization', validToken);

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(matchesDB);
    })
  })

  describe('Valid matches in progress request', async () => {
    const matchesInProgress = matchesDB.filter((match) => match.inProgress);

    before(async () => {
      sinon.stub(matchesModel, 'findAll').resolves(matchesInProgress as matchesModel[]);
    })

    after(() => {
      (matchesModel.findAll as sinon.SinonStub).restore();
    })

    it('returns status 200 with matches in progress', async () => {
      response = await chai.request(app).get('/matches?inProgress=true').set('Authorization', validToken);

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(matchesInProgress);
    })
  })

  describe('Valid finished matches request', async () => {
    const matchesFinished = matchesDB.filter((match) => !match.inProgress);

    before(async () => {
      sinon.stub(matchesModel, 'findAll').resolves(matchesFinished as matchesModel[]);
    })

    after(() => {
      (matchesModel.findAll as sinon.SinonStub).restore();
    })

    it('returns status 200 with matches finished', async () => {
      response = await chai.request(app).get('/matches?inProgress=false').set('Authorization', validToken);

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(matchesFinished);
    })
  })


  describe('Update match status to finished', async () => {

    before(async () => {
      sinon.stub(matchesModel, 'update').resolves();
    })

    after(() => {
      (matchesModel.update as sinon.SinonStub).restore();
    })

    it('returns status 200 with "Finished" message', async () => {
      response = await chai.request(app).patch('/matches/3/finish').set('Authorization', validToken);

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal('Finished');
    })
  })

  describe('Update match information', async () => {

    before(async () => {
      sinon.stub(matchesModel, 'update').resolves();
    })

    after(() => {
      (matchesModel.update as sinon.SinonStub).restore();
    })

    it('returns status 200 with the edited object', async () => {
      const body = { homeTeamGoals: 0, awayTeamGoals: 0 };

      response = await chai.request(app).patch('/matches/3').send(body).set('Authorization', validToken);

      const { userData, ...cleanResponse } = response.body;

      expect(response).to.have.status(200);
      expect(cleanResponse).to.deep.equal(body);
    })
  })

  describe('Insert new match', async () => {

    describe('with valid information', () => {
      const body = { homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 0, awayTeamGoals: 0, inProgress: true };
      const createReturn = { id: 0, ...body };

      before(async () => {
        sinon.stub(matchesModel, 'create').resolves(createReturn as unknown as TeamsModel);
      })

      after(() => {
        (matchesModel.create as sinon.SinonStub).restore();
      })

      it('returns status 201 with the created object', async () => {

        response = await chai.request(app).post('/matches').send(body).set('Authorization', validToken);

        expect(response).to.have.status(201);
        expect(response.body).to.deep.equal(createReturn);
      })
    })

    describe('with invalid information', () => {

      before(async () => {
        sinon.stub(TeamsModel, 'findAll').resolves(teamsDB as TeamsModel[]);
      })

      after(() => {
        (TeamsModel.findAll as sinon.SinonStub).restore();
      })

      it('returns status 422 with repeated team id message', async () => {
        response = await chai.request(app).post('/matches').send(repeatedIdBody).set('Authorization', validToken);

        expect(response).to.have.status(422);
        expect(response.body.message).to.deep.equal('It is not possible to create a match with two equal teams');
      })

      it('returns status 404 with invalid team id message', async () => {
        response = await chai.request(app).post('/matches').send(invalidIdBody).set('Authorization', validToken);

        expect(response).to.have.status(404);
        expect(response.body.message).to.deep.equal('There is no team with such id!');
      })
    })
  })
})
