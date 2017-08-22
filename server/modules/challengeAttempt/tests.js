import test from 'ava';
import supertest from 'supertest-as-promised';
import server from '../../server.js';
import Challenge from '../../models/challenge.js';
import ChallengeStep from '../../models/challengeStep.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';

const internals = {};

test.before('connecting to challenge?', () => {
  // supertest(server);
  // server();
});

test.beforeEach(async () => {
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

test.afterEach.always(async () => {
  await Challenge.remove({});
  await ChallengeStep.remove({});
  await ChallengeAttempt.remove({});
});


test('should fail if invalid accessCode or passCode', async (t) => {
  const supert = await supertest(server)
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'wrongAccessCode', passCode: 'wrongPassCode' });

  t.is(supert.status, 404);
});


test('should succesfully retrive challengeAttempt', async (t) => {
  const supert = await supertest(server)
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'myAccessCode-test', passCode: 'myPassCode-test' });

  internals.token = supert.body.token;

  t.is(supert.body.result, 'ok');
  t.is(supert.status, 200);
});


test('Should wait for a promise', async (t) => {
  // console.log('begining of tests'); // eslint-disable-line no-console
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('*******');
    }, (200));
  });

  t.is(true, true);
  console.log(`end of tests + ${res}`); // eslint-disable-line no-console
});
