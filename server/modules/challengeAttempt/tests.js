import test from 'ava';
import supertest from 'supertest-as-promised';
//import { connectDB } from '../../util/test-helpers';
import server from '../../server.js';
import Challenge from '../../models/challenge.js';
import ChallengeStep from '../../models/challengeStep.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';

const internals = {};

test.before('connecting to challenge', () => {
  const port = 9000;
  const options = { port, masterRole: 'Admin' }; 
  server(options);
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

test.skip('saves a challenge', async (t) => {
  const challenge = await Challenge.create({ name: 'first-test', folderName: 'beginnerFunctions-test' });
  internals.challenge = challenge;

  t.is(challenge.name, 'first-test');
});


test.skip('saves challengeSteps', async (t) => {
  const challengeStepsArray = [
    {
      id: 'variables-test',
      challengeId: internals.challenge._id,
      description: 'first file with description-TEST',
    },
    {
      id: 'variables2-test',
      challengeId: internals.challenge._id,
      description: 'second file with description-TEST',
    },
  ];
  const challengeStep = await ChallengeStep.create(challengeStepsArray);
  internals.challengeStepA = challengeStep[0];
  internals.challengeStepB = challengeStep[1];
  t.is(challengeStep.length, 2);
});


test.skip('saves challengeAttempt', async (t) => {
  const createdChallAttempt = await ChallengeAttempt.create({
    accessCode: 'myAccessCode-test',
    passCode: 'myPassCode-test',
    fullName: 'userName-test',
    email: 'dummy-test@dummy.com',
    score: 0,
    currentStepId: internals.challengeStepA._id,
    challengeId: internals.challengeStepA.challengeId,
    status: 'not_started',
  });
  internals.challengeAttempt = createdChallAttempt;

  t.is(createdChallAttempt.fullName, 'username-test');
});


test('find challenge', async (t) => {
  const challengeSaved = await Challenge.findOne({ name: 'first-test' });

  t.deepEqual(challengeSaved._id, internals.challenge._id);
});


test('should fail if invalid accessCode or passCode', async (t) => {
  const supert = await supertest(server)
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'wrongAccessCode', passCode: 'wrongPassCode' });

  const status = supert.status;
  t.is(status, 404);
});


test.skip('should succesfully retrive challengeAttempt', async (t) => {
  const supert = await supertest(server)
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: internals.challengeAttempt.accessCode, passCode: internals.challengeAttempt.passCode });

  const status = supert.status;
  const resOK = supert.body.result;
  const token = supert.body.token;
  internals.token = token;

  t.is(resOK, 'ok');
  t.is(status, 200);
});


test.skip('delete challenge', async (t) => {
  await Challenge.findOneAndRemove({ name: 'first-test' });
  const noChallenge = await Challenge.findOne({ name: 'first-test' });
  t.is(noChallenge, null);
});


test.skip('delete challengeSteps', async (t) => {
  await ChallengeStep.remove({ challengeId: internals.challengeStepA.challengeId });
  const noChallengeSteps = await ChallengeStep.findOne({ id: 'variables-test' });
  t.is(noChallengeSteps, null);
});


test.skip('delete challengeAttempt', async (t) => {
  await ChallengeAttempt.remove({ challengeId: internals.challengeStepA.challengeId });
  const noChallengeAttempt = await ChallengeAttempt.findOne({ fullName: internals.challengeAttempt.fullName });
  t.is(noChallengeAttempt, null);
});


test.cb.skip('Should wait for a timeout', t => {
  setTimeout(() => {
    t.is(true, true);
    t.end();
  }, (200));
});


test.skip('Should wait for a promise', async (t) => {
  // console.log('begining of tests'); // eslint-disable-line no-console
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('*******');
    }, (200));
  });

  t.is(true, true);
  // console.log('end of tests' + res); // eslint-disable-line no-console
});
