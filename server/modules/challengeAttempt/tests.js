import test from 'ava';
import supertest from 'supertest-as-promised';
import { connectDB } from '../../util/test-helpers';
import app from '../../server.js';
import Challenge from '../../models/challenge.js';
import ChallengeStep from '../../models/challengeStep.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';

const internals = {};

test.before('connecting to challenge', t => {
  connectDB(t, () => {
  });
  // console.log('connected to the db');
  // t.end();
  // t.pass();
});


test('saves a challenge', async (t) => {
  const challenge = await new Promise((resolve, reject) => {
    Challenge.create({
      name: 'first-test',
      folderName: 'beginnerFunctions-test',
    }, (err, chaDoc) => {
      if (err) {
        console.log('error inside challenge creation!'); // eslint-disable-line no-console
        return reject(err);
      }
      return resolve(chaDoc);
    });
  });
  internals.challenge = challenge;

  t.is(challenge.name, 'first-test');
});


test('saves challengeSteps', async (t) => {
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


test('saves challengeAttempt', async (t) => {
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
  const supert = await supertest(app)
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: 'wrongAccessCode', passCode: 'wrongPassCode' });

  const status = supert.status;
  t.is(status, 404);
});


test('should succesfully retrive challengeAttempt', async (t) => {
  const supert = await supertest(app)
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


test('delete challenge', async (t) => {
  await Challenge.findOneAndRemove({ name: 'first-test' });
  const noChallenge = await Challenge.findOne({ name: 'first-test' });
  t.is(noChallenge, null);
});


test('delete challengeSteps', async (t) => {
  await ChallengeStep.remove({ challengeId: internals.challengeStepA.challengeId });
  const noChallengeSteps = await ChallengeStep.findOne({ id: 'variables-test' });
  t.is(noChallengeSteps, null);
});


test('delete challengeAttempt', async (t) => {
  await ChallengeAttempt.remove({ challengeId: internals.challengeStepA.challengeId });
  const noChallengeAttempt = await ChallengeAttempt.findOne({ fullName: internals.challengeAttempt.fullName });
  t.is(noChallengeAttempt, null);
});


test.cb('Should wait for a timeout', t => {
  setTimeout(() => {
    t.is(true, true);
    t.end();
  }, (200));
});


test('Should wait for a promise', async (t) => {
  // console.log('begining of tests'); // eslint-disable-line no-console
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('*******');
    }, (200));
  });

  t.is(true, true);
  // console.log('end of tests' + res); // eslint-disable-line no-console
});
