const request = require('supertest');
const app = require('./app');

const {
  falseDataReceiving,
  standardModeUrl,
  comparisonModeUrl,
  correctDataReceiving,
  wrongFieldReceiving,
  wrongEndpoint,
  correctDataReceivingRelNum2,
  messageQueueUrl,
  messageQueueData,
  messageQueueBadData,
  processingApiUrl,
  processingData,
} = require('./config/test.constants');

describe('DataReceiving-API POST  ', () => {
  it('1 reqBodyIsJson validates---> should get Json type data', () => {
    return request(app)
      .post(standardModeUrl)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  it('2 reqBodyNotJson  --> if request body is not JSON return', async () => {
    return request(app)
      .post(standardModeUrl)
      .send(['this is dummy data'])
      .expect(400);
  });

  it('3 reqObjEmpty  --> if request body has empty or null fields return 400', async () => {
    return request(app)
      .post(standardModeUrl)
      .send(falseDataReceiving)
      .expect(400);
  });

  it('4 reqObjFieldType  --> if request body field types are correct return 200', async () => {
    return request(app)
      .post(standardModeUrl)
      .send(correctDataReceiving)
      .expect(200);
  });

  it('5 reqObjWrongField  --> if request body field types are wrong return 400', async () => {
    return request(app)
      .post(comparisonModeUrl)
      .send(wrongFieldReceiving)
      .expect(400);
  });

  it('6 404notFound  --> wrong enpoint return 404', async () => {
    return request(app)
      .post(wrongEndpoint)
      .send(correctDataReceiving)
      .expect(404);
  });

  it('7 DbSaveTest  --> check if data is saved to database', async () => {
    const postReq = await request(app)
      .post(standardModeUrl)
      .send(correctDataReceiving) //this has relationsnummer 1
      .expect(200);

    const getReq = await request(app)
      .get('/receiving-api/Standard/' + '1')
      .expect(200);
    //expect(getReq.body).toEqual({ message: 'Data exists in database' });
  });

  it('8 DbUpdateTest  --> check if data is updated on standard mode', async () => {
    const postReq2 = await request(app)
      .post(standardModeUrl)
      .send(correctDataReceivingRelNum2) //this has relationsnummer 2
      .expect(200);

    const postReq1 = await request(app)
      .post(standardModeUrl)
      .send(correctDataReceiving) //this has relationsnummer 1
      .expect(200);

    const getReq = await request(app) //get rel.Num 1
      .get('/receiving-api/Standard/' + '1')
      .expect(200);
    expect(getReq.body).toEqual({ message: 'Data exists in database' });
  });

  it('9 MessageQueueSaveTest  --> test if data is saved to messageQueue', async () => {
    const postReq1 = await request(app)
      .post(comparisonModeUrl)
      .send(correctDataReceiving) //this has relationsnummer 1
      .expect(200);

    const getReq = await request(app) //get rel.Num 1
      .get('/receiving-api/Comparison/' + '1')
      .expect(200);

    expect(getReq.body).toEqual({ message: 'Data exists in messageQueue' });
  });

  it('10 DbUpdateTest  --> test if data is updated in database', async () => {
    const postReq1 = await request(app)
      .post(standardModeUrl)
      .send(correctDataReceiving) //this has relationsnummer 1
      .expect(200);

    const postReq2 = await request(app)
      .post(standardModeUrl)
      .send(correctDataReceivingRelNum2) //this has relationsnummer 2
      .expect(200);

    const getReq = await request(app) //get rel.Num 2
      .get('/receiving-api/Standard/' + '2')
      .expect(200);

    expect(getReq.body).toEqual({ message: 'Data exists in database' });
  });
});

describe('MessageQueue POST /message-queue', () => {
  it('11 404NotFound  ---> wrong endpoint error test ,returns 404', () => {
    return request(app)
      .post('/message-queue/hello-world')
      .send(messageQueueData)
      .expect(404);
  });

  it('12 reqBodyNotArray  ---> Test if request body is not an array , expect 400', async () => {
    const postReq1 = await request(app)
      .post(messageQueueUrl)
      .send({ test: 'data' })
      .expect(400);

    expect(postReq1.text).toBe('Invalid data type for messageQueue');
  });

  it('13 reqBodyIsArray  ---> Test if request body is an array , expect 200', async () => {
    const postReq1 = await request(app)
      .post(messageQueueUrl)
      .send(messageQueueData)
      .expect(200);
  });

  it('14 reqBodyFieldCheck  ---> Test if req body has all necessary fields', async () => {
    const postReq1 = await request(app)
      .post(messageQueueUrl)
      .send(messageQueueData)
      .expect(200);
  });
  it('15  reqBodyMissingField  ---> Test if req body has missing fields', async () => {
    const postReq1 = await request(app)
      .post(messageQueueUrl)
      .send(messageQueueBadData)
      .expect(400);
  });
});
describe('Processing-API POST /processing-api', () => {
  it('16 reqBodyNotArray  ---> Test if request body is not an array , expect 400', async () => {
    const postReq1 = await request(app)
      .post(processingApiUrl)
      .send({
        Relationsnummer: '123',
        reportMessage: 'Not existing in our system',
      })
      .expect(400);

    expect(postReq1.text).toBe('Invalid data type for receiving api');
  });

  it('17 reqBodyIsArray  ---> Test if request body is an array , expect 200', async () => {
    const postReq1 = await request(app)
      .post(processingApiUrl)
      .send(processingData)
      .expect(200);
  });
});
