import test from 'ava'; // eslint-disable-line 
import supertest from 'supertest-as-promised'; // eslint-disable-line 
import server from '../../server.js'; // eslint-disable-line 
import Challenge from '../../models/challenge.js';
import ChallengeStep from '../../models/challengeStep.js';
import ChallengeAttempt from '../../models/challengeAttempt.js';

const internals = {};

test.before('establish connection ', () => {
  server();
  internals.reqAgent = supertest('http://localhost:8080');
});

test.beforeEach(async () => {
  await Challenge.remove({});
  await ChallengeStep.remove({});
  await ChallengeAttempt.remove({});
// id 599d19a1ce1126df3caa53e4

  const challengeDoc = await Challenge.create({ name: 'first-test', folderName: 'beginnerFunctions-test' });
  const challengeStepsDoc = await ChallengeStep.create([
    { id: 'variables-test', challengeId: challengeDoc._id, description: 'first file with description-test' },
    { id: 'variables2-test', challengeId: challengeDoc._id, description: 'second file with description-test' },
  ]);

  await ChallengeAttempt.create({
    _id: '50341373e894ad16347efe01',
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

test('should fail if incomplete arguments, error missing params', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/challenge')
    .set('Accept', 'application/json')
    .send({ accessCode: 'wrongAccessCode' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_parameters');
});


test('silly test', (t) => {
  t.is(true, true);
});
