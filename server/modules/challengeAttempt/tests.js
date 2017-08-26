import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../server.js';
import Challenge from '../../models/challenge.js';
import ChallengeStep from '../../models/challengeStep.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';

const internals = {};

test.before('connecting to challenge?', () => {
  server();
  internals.reqAgent = supertest('http://localhost:8080');
});

test.beforeEach(async () => {
  await Challenge.remove({});
  await ChallengeStep.remove({});
  await ChallengeAttempt.remove({});

  const challengeDoc = await Challenge.create({ name: 'first-test', folderName: 'beginnerFunctions-test' });
  const challengeStepsDoc = await ChallengeStep.create([
    { id: 'variables-test', challengeId: challengeDoc._id, description: 'first file with description-test' },
    { id: 'variables2-test', challengeId: challengeDoc._id, description: 'second file with description-test' },
  ]);

  await ChallengeAttempt.create({
    accessCode: 'myAccessCode-test',
    passCode: 'myPassCode-test',
    fullName: 'dummyusername-test',
    email: 'dummy-test@dummy.com',
    score: 0,
    currentStepId: challengeStepsDoc[0]._id,
    challengeId: challengeStepsDoc[0].challengeId,
    status: 'not_started',
  });
});

test('should fail if invalid accessCode or passCode', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'wrongAccessCode', passCode: 'wrongPassCode' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.falsy(res.body.token, 'token is empty');
  t.truthy(res.body.error, 'got error message');
});


test('should fail with lowercase or uppercase arguments, must be case sensitive', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'MYACCESSCODE-test', passCode: 'MYPASSCODE-test' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.falsy(res.body.token, 'token is empty');
  t.truthy(res.body.error, 'got error message');
});


test('should fail if incomplete arguments, error missing params', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_parameters');
});


test('should work even if lowerCase endpoint', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challengeattempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test', passCode: 'myPassCode-test' });

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.truthy(res.body.token, 'got token');
  t.falsy(res.body.error, 'error is empty');
});


test('should succesfully retrive challengeAttempt', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test', passCode: 'myPassCode-test' });

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.truthy(res.body.token, 'token is On');
  t.falsy(res.body.error, 'error is empty');
});

test('should not be able to delete challengeAttempt', async (t) => {
  const res = await internals.reqAgent
    .delete('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test', passCode: 'myPassCode-test' });

  t.is(res.status, 404);
});
