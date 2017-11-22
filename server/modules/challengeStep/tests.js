import test from 'ava'; // eslint-disable-line
import supertest from 'supertest-as-promised'; // eslint-disable-line
import server from '../../server.js'; // eslint-disable-line
import Challenge from '../../models/challenge.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';
import ChallengeStepResult from '../../models/challengeStepResult';
import fetchToken from '../../util/validateAccess.js';
import evaluator from '../../util/answerEval.js';

const internals = {};
internals.dummyDataToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1OWFmODEwZjkwYzQ4NjNmYWE5YTAyYjkiLCJjaGFsbGVuZ2VJZCI6IjU5YWY4MTBlOTBjNDg2M2ZhYTlhMDJiOCIsInVzZXJGdWxsTmFtZSI6ImR1bW15dXNlcm5hbWUiLCJpYXQiOjE1MDUzMjIxMTd9.JtD7alaWlI_aUF0FCF8dxekTm1DYR1Z5NKQkIA8GZ1I'; // eslint-disable-line
internals.emptyPayloadToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.OatqkwDnaqBNtgHHYJFGMioVx_9ZZ_sePRYyENAx5to';
internals.solutionExample = 'function sum(a, b) {return a + b;}';

test.before('establish connection ', async () => {
  internals.reqAgent = await supertest(server);
  // internals.reqAgent = supertest('http://localhost:8080');
});


test.beforeEach(async () => {
  await Challenge.remove({});
  await ChallengeAttempt.remove({});
  await ChallengeStepResult.remove({});

  const challengeDoc = await Challenge.create({ name: 'Math Challenge', folderName: 'test_challenge_001' });
  const challengeDocTwo = await Challenge.create({ name: 'Fake Challenge', folderName: 'test_challenge_004' });

  await ChallengeAttempt.create({
    accessCode: 'myAccessCodeTest',
    passCode: 'myPassCodeTest',
    fullName: 'dummyUserNameTest',
    email: 'dummyTest@dummy.com',
    score: 0,
    challengeId: challengeDoc._id,
    status: 'not_started',
  });

  await ChallengeAttempt.create({
    accessCode: 'myAccessCodeFake',
    passCode: 'myPassCodeFake',
    fullName: 'dummyUserNameTest',
    email: 'dummyTest@dummy.com',
    score: 0,
    challengeId: challengeDocTwo._id,
    status: 'not_started',
  });

  await ChallengeStepResult.create({
    id: 'to be determine',
    challengeId: challengeDoc._id,
    challengeStepId: '011',
    answer: 'incoming answer',
    score: 50,
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

/*
// this has been skip since we are testing front end step progression.

test('should fail if challengeStep contents are incomplete', async (t) => {
  await ChallengeAttempt.update({ accessCode: 'myAccessCodeTest', passCode: 'myPassCodeTest' }, { currentStepId: '004' });

  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const res = await internals.reqAgent
    .get(`/api/v1/challengeStep?token=${token}`);

  t.is(res.status, 500);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'internal_error');
});
*/

// Unit testing evaluator function.

test('should add 1 + 1 equal 2', async (t) => {
  const solutionExample = 'function sum(a, b) {return a + b;}';
  const result = evaluator(solutionExample, [1, 1], 2);

  t.is(result, true);
});

test('should substract 1 - 1 equal 0', async (t) => {
  const solutionExample = 'function sum(a, b) {return a - b;}';
  const result = evaluator(solutionExample, [1, 1], 0);

  t.is(result, true);
});

test('should return false if argument give is not a number', async (t) => {
  const solutionExample = 'function sum(a, b) {return a + b;}';
  const result = evaluator(solutionExample, ['A', 1], 0);

  t.is(result, false);
});

test('should return false if solution has typos (ex, retun) ', async (t) => {
  const solutionExample = 'function sum(a, b) {retun a + b;}';
  const result = evaluator(solutionExample, [1, 1], 2);

  t.is(result, false);
});

test('should return false if result is not equal to expected output ', async (t) => {
  const solutionExample = 'function sum(a, b) {return a + b;}';
  const result = evaluator(solutionExample, [1, 1], 3);

  t.is(result, false);
});

test('should work with arrow functions ES6', async (t) => {
  const solutionExample = '(a, b) => {return a + b;}';
  const result = evaluator(solutionExample, [1, 1], 2);

  t.is(result, true);
});

test('should not concatenate strings', async (t) => {
  const solutionExample = 'function sum(a, b) {return a + b;}';
  const result = evaluator(solutionExample, ['a', 'a'], 'aa');

  t.is(result, false);
});

test('safe-eval transform strings to numbers', async (t) => {
  const solutionExample = 'function sum(a, b) {return a + b;}';
  const result = evaluator(solutionExample, ['1', '1'], 2);

  t.is(result, true);
});

// testing '/score' endpoint

test('/score endpoint fail missing arguments', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const args = {
    input: internals.solutionExample,
    token,
    sample: false,
  };

  const res = await internals.reqAgent
    .post('/api/v1/challengeStep/score')
    .send(args);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing arguments');
});

test('/score endpoint succesfully returns tests ran with sample flag ', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const args = {
    input: internals.solutionExample,
    token,
    challengeStepId: '001',
    sample: 'true',
  };

  const res = await internals.reqAgent
    .post('/api/v1/challengeStep/score')
    .send(args);

  t.is(res.status, 200);
  t.is(res.body.sample, 'true');
  t.truthy(res.body.result, 'array of objects');
});

test('/score returns OK when user submits answer', async (t) => {
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const args = {
    input: internals.solutionExample,
    token,
    challengeStepId: '001',
    sample: 'false',
  };

  const res = await internals.reqAgent
    .post('/api/v1/challengeStep/score')
    .send(args);

  t.is(res.status, 200);
  t.truthy(res.body.result, 'ok');
});

test('/score should return challenge_completed when the last step is done', async (t) => {
  await ChallengeAttempt.update({ accessCode: 'myAccessCodeTest', passCode: 'myPassCodeTest' }, { currentStepId: '004' });
  const token = await fetchToken('myAccessCodeTest', 'myPassCodeTest');
  const args = {
    input: 'function subtract(a, b) {return a - b;}',
    token,
    challengeStepId: '004',
    sample: 'false',
  };

  const res = await internals.reqAgent
    .post('/api/v1/challengeStep/score')
    .send(args);

  t.is(res.status, 200);
  t.truthy(res.body.result, 'challenge_completed');
});


/*
test('/score endpoint failing when reading a challengeStep without info.json', async (t) => {
  const token = await fetchToken('myAccessCodeFake', 'myPassCodeFake');
  const args = {
    input: internals.solutionExample,
    token,
    challengeStepId: '001',
    sample: 'true',
  };

  const res = await internals.reqAgent
    .post('/api/v1/challengeStep/score')
    .send(args);

  console.log(res.body);
  t.is(res.status, 500);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'internal_error');
});
*/
