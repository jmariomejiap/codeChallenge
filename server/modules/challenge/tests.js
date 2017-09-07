import test from 'ava'; // eslint-disable-line 
import supertest from 'supertest-as-promised'; // eslint-disable-line 
import server from '../../server.js'; // eslint-disable-line 
import Challenge from '../../models/challenge.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';

const internals = {};

test.before('establish connection ', () => {
  server();
  internals.reqAgent = supertest('http://localhost:8080');
});

test.beforeEach(async () => {
  await Challenge.remove({});
  await ChallengeAttempt.remove({});

  const challengeDoc = await Challenge.create({ name: 'Math Challenge', folderName: 'test_challenge_001' });

  await ChallengeAttempt.create({
    accessCode: 'myAccessCodeTest',
    passCode: 'myPassCodeTest',
    fullName: 'dummyUserNameTest',
    email: 'dummyTest@dummy.com',
    score: 0,
    currentStepId: '001',
    challengeId: challengeDoc._id,
    status: 'not_started',
  });
});

const fetchToken = async () => {
  const res = await internals.reqAgent
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCodeTest', passCode: 'myPassCodeTest' });
  return res.body.token;
};

test('should fail if incomplete arguments,  error missing token', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ accessCode: 'wrongAccessCode' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_parameter');
});

test('should not have access to dummyData', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1OThhMTZlYTQ3OGY2MTFmNGE3Nzg1MTUiLCJpYXQiOjE1MDM2MTgwMjZ9.HipZhED2l7-mTPtCYYPEspmN9oEQYOTMcSqfwH-2yeo' }); // eslint-disable-line 

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'challenge_not_found');
});

test('internal error if token Has been tampered', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ token: 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1MDM0MTM3M2U4OTRhZDE2MzQ3ZWZlMDEiLCJpYXQiOjE1MDM2MTgwMjZ9.rTIVRlpDHLT6dKwzLww559Bo1sYVkg8Wr_w5et1RADA' }); // eslint-disable-line 

  t.is(res.status, 500);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'internal_error');
});

test('should fail if token payload is empty', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.OatqkwDnaqBNtgHHYJFGMioVx_9ZZ_sePRYyENAx5to' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'challenge_not_found');
});


test('should not accept GET with right arguments', async (t) => {
  const res = await internals.reqAgent
    .get('/api/v1/challenge')
    .send({ accessCode: 'myAccessCode-test', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1MDM0MTM3M2U4OTRhZDE2MzQ3ZWZlMDEiLCJpYXQiOjE1MDM2MTgwMjZ9.rTIVRlpDHLT6dKwzLww559Bo1sYVkg8Wr_w5et1RADA' }); // eslint-disable-line 

  t.is(res.status, 404);
  t.falsy(res.body.result, 'result is non existent');
});

test('should not Delete even with right arguments', async (t) => {
  const res = await internals.reqAgent
    .delete('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1MDM0MTM3M2U4OTRhZDE2MzQ3ZWZlMDEiLCJpYXQiOjE1MDM2MTgwMjZ9.rTIVRlpDHLT6dKwzLww559Bo1sYVkg8Wr_w5et1RADA' }); // eslint-disable-line 

  t.is(res.status, 404);
  t.falsy(res.body.result, 'result is non existent');
});


test('successful test, right arguments return challenge information', async (t) => {
  const token = await fetchToken();
  const res = await internals.reqAgent
    .post('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ token });

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.falsy(res.body.error, 'error is empty');
  t.truthy(res.body.challengeId, ' challengeId received');
  t.truthy(res.body.challengeName, ' challengeName received');
  t.truthy(res.body.challengeDescription, ' challengeDescription received');
  t.truthy(res.body.numberOfSteps, ' > 0');
});
