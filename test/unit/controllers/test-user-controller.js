const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const userController = require(
  '../../../server/controllers/users-controller',
);
const res = require('express/lib/response');

const expect = chai.expect;
const sandbox = sinon.createSandbox();
chai.use(sinonChai);

// unit test of user controller get all
describe('Test user controller', () => {
  before(() => {
    sandbox.stub(res, 'json');
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should return all users', () => {
    const mockReq = {};

    userController.getAll(mockReq, res);
    expect(res.json).to.have.been.calledOnceWith([
      {
          "_id": "5fcbcc61299a5b10b4acf6e1",
          "usern": "OtoelAlex",
          "email": "otoelalex@gmail.com",
          "pwd": "e46795f64aeb9e0f4acfcbbfc977655ef78becc9b7a5b187",
          "pToken": "88dddfcdde64e0446e7fcf5e15eb35a6db78bdbc71510ad2"
      },
      {
          "_id": "5fcd57bb8fe7b4dddec4b8e6",
          "usern": "0thon",
          "email": "0thon.escandona@gmail.com",
          "pwd": "d5a768a07f501cea465985382cf7bd3768631bc27dcf0357",
          "pToken": "f9c7a11cd031df896c09e98e1d9cd6127f11ae3c1e982e27"
      }]);
  });
});

// unit test of user controller get by query
describe('Test user controller', () => {
  before(() => {
    sandbox.stub(res, 'json');
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should return all users', () => {
    const mockReq = {};

    userController.getByQuery(mockReq, res);
    expect(res.json).to.have.been.calledOnceWith({
      "_id": "5fcbcc61299a5b10b4acf6e1",
      "usern": "OtoelAlex",
      "email": "otoelalex@gmail.com",
      "pwd": "e46795f64aeb9e0f4acfcbbfc977655ef78becc9b7a5b187",
      "pToken": "88dddfcdde64e0446e7fcf5e15eb35a6db78bdbc71510ad2"
  });
  });
});
// unit test of user controller get by id
describe('Test user controller', () => {
  before(() => {
    sandbox.stub(res, 'json');
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should return all users', () => {
    const mockReq = {};

    userController.getById(mockReq, res);
    expect(res.json).to.have.been.calledOnceWith({
      "_id": "5fcbcc61299a5b10b4acf6e1",
      "usern": "OtoelAlex",
      "email": "otoelalex@gmail.com",
      "pwd": "e46795f64aeb9e0f4acfcbbfc977655ef78becc9b7a5b187",
      "pToken": "88dddfcdde64e0446e7fcf5e15eb35a6db78bdbc71510ad2"
  });
  });
});
