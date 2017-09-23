import test from 'ava'; // eslint-disable-line
import supertest from 'supertest-as-promised'; // eslint-disable-line
import server from '../../server.js'; // eslint-disable-line
import Challenge from '../../models/challenge.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';
import fetchToken from '../../util/validateAccess.js';

const internals = {};
internals.dummyDataToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1OWFmODEwZjkwYzQ4NjNmYWE5YTAyYjkiLCJjaGFsbGVuZ2VJZCI6IjU5YWY4MTBlOTBjNDg2M2ZhYTlhMDJiOCIsInVzZXJGdWxsTmFtZSI6ImR1bW15dXNlcm5hbWUiLCJpYXQiOjE1MDUzMjIxMTd9.JtD7alaWlI_aUF0FCF8dxekTm1DYR1Z5NKQkIA8GZ1I'; // eslint-disable-line
internals.emptyPayloadToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.OatqkwDnaqBNtgHHYJFGMioVx_9ZZ_sePRYyENAx5to';

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
    challengeId: challengeDoc._id,
    status: 'not_started',
  });
});


test('should fail if incomplete arguments,  error missing token', async (t) => {
  const res = await internals.reqAgent
    .get('/api/v1/challengeStep?token=');

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_parameter');
});


test('should not have access to dummyData', async (t) => {
  const res = await internals.reqAgent
    .get(`/api/v1/challengeStep?token=${internals.dummyDataToken}`); // eslint-disable-line

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'challenge_NOT_found');
});

test('internal error if token Has been tampered', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .get(`/api/v1/challenge?token=${token}X`); // eslint-disable-line

  t.is(res.status, 500);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'internal_error');
});

test('should fail if token payload is empty', async (t) => {
  const res = await internals.reqAgent
    .get(`/api/v1/challengeStep?token=${internals.emptyPayloadToken}`);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'challenge_not_found');
});

test('should not accept post with right arguments', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .post('/api/v1/challengeStep')
    .send({ token }); // eslint-disable-line

  t.is(res.status, 404);
  t.falsy(res.body.result, 'result is non existent');
});

test('should not Delete even with right arguments', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .delete('/api/v1/challengeStep')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test', token });

  t.is(res.status, 404);
  t.falsy(res.body.result, 'result is non existent');
});

test('successful test, should return the first challengeStep if new user', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .get(`/api/v1/challengeStep?token=${token}`);

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.falsy(res.body.error, 'error is empty');
  t.truthy(res.body.description, 'got a description');
  t.truthy(res.body.code, 'got a code');
});

test('successful test, should return currentStep found in challengeAttempt collection', async (t) => {
  await ChallengeAttempt.update({ accessCode: 'myAccessCodeTest', passCode: 'myPassCodeTest' }, { currentStepId: '003' });
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .get(`/api/v1/challengeStep?token=${token}`);

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.falsy(res.body.error, 'error is empty');
  t.truthy(res.body.description, 'got a description');
  t.truthy(res.body.code, 'got a code');
});


test('should fail if challengeStep contents are incomplete', async (t) => {
  await ChallengeAttempt.update({ accessCode: 'myAccessCodeTest', passCode: 'myPassCodeTest' }, { currentStepId: '004' });

  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .get(`/api/v1/challengeStep?token=${token}`);

  t.is(res.status, 500);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'internal_error');
});
