const request = require('supertest');
const app = require('./app');
const {
  falseDummyDataReceiving,
  workingDummyData,
  requiredFieldsTesting,
  receivingApiTestUrl,
} = require('./config/constants.js');

describe('DataReceiving-API POST /receiving-api/:mode', () => {
  it('1 reqBodyIsJson validates---> should get Json type data', () => {
    return request(app)
      .post(receivingApiTestUrl)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  it('2 reqObjEmpty Returns 400 if any required field is empty or null', async () => {
    return request(app)
      .post(receivingApiTestUrl)
      .send(falseDummyDataReceiving)
      .expect(400)
      .then((response) => {
        requiredFieldsTesting.forEach((field) => {
          expect(response.body[field]).not.toBeNull();
        });
      });
  });

  it('3 reqObjFieldType ---> Data field types should be correct', () => {
    return request(app)
      .post(receivingApiTestUrl)
      .send(workingDummyData)
      .then((response) => {
        expect(response.body);
        expect.objectContaining({
          GueltigAb: expect.any(Date),
          GueltigBis: expect.any(Date),
          Relationsnummer: expect.any(String),
          FilialNUM: expect.any(String),
          PickupCountry: expect.any(String),
          ZustellGebiet: expect.any(String),
          Deactivierung: expect.any(Boolean),
        });
      });
  });

  it('4 reqModeCheck POST /receiving-api/:mode ---> create or update data if RelNum exists and write to Json file  ', () => {
    return request(app)
      .post(receivingApiTestUrl + '/hello-world')
      .expect(200);
  });
});
