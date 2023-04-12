import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/Matches.model';
import { fullMatchesDB, homeMatchesDB, awayMatchesDB, firstTotalMatch, firstHomeMatch, firstAwayMatch } from './mocks/Leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Leaderboard service and controller', () => {
  let response: Response;

  describe('full leaderboard', () => {

    before(async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(fullMatchesDB as unknown as MatchesModel[]);
    })

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
    })

    it('returns status 200 and the full leaderboard', async () => {
      response = await chai.request(app).get('/leaderboard');

      expect(response).to.have.status(200);
      expect(response.body[0]).to.deep.equal(firstTotalMatch);
    })
  })

  describe('home leaderboard', () => {

    before(async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(homeMatchesDB as unknown as MatchesModel[]);
    })

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
    })

    it('returns status 200 and the home leaderboard', async () => {
      response = await chai.request(app).get('/leaderboard/home');

      expect(response).to.have.status(200);
      expect(response.body[0]).to.deep.equal(firstHomeMatch);
    })
  })

  describe('home leaderboard', () => {

    before(async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(awayMatchesDB as unknown as MatchesModel[]);
    })

    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
    })

    it('returns status 200 and the home leaderboard', async () => {
      response = await chai.request(app).get('/leaderboard/away');

      expect(response).to.have.status(200);
      expect(response.body[0]).to.deep.equal(firstAwayMatch);
    })
  })
})