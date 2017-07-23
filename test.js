import test from 'ava';
// import supertest from 'supertest-as-promised';
import { connectDB, dropDB } from './server/util/test-helpers';
import app from './server/server.js'
import Challenge from './server/models/challenge.js'
import ChallengeStep from './server/models/challengeStep.js';

console.log('Inside test. about to test deepEqual');

test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar')

    t.is(await bar, 'bar');
});

const internals = {}

const createChallenge = new Promise((resolve, reject) => {
  Challenge.create({ name: 'firstB', folderName: 'beginnerFunctionsB' }, (err, challengeDoc) => {
  if (err) {
    return reject(err);
  }
  internals['challengeId'] = challengeDoc['_id'];
  return resolve(challengeDoc)
  });
});

const createChallengeSteps =  (chaDoc) => {
  return new Promise((resolve, reject) => {
    const challengeSteps = [
      {
        id: 'variablesB',
        challengeId: chaDoc['_id'],
        description: 'first file with description TEST',
      },
      {
        id: 'variablesB2',
        challengeId: chaDoc['_id'],
        description: 'second file with description TEST',
      },
    ];
    ChallengeStep.create(challengeSteps, (err, chaStepsDoc) => {
      if (err) {
        return reject(err);
      }
      console.log(chaStepsDoc);
      return resolve(chaStepsDoc);
    });
  });
};

const manager = async () => {
  try {
    console.log('inside try manager')
    const challenge = await createChallenge;
    const challengeStep = await createChallengeSteps(challenge);
    console.log(challengeStep);
    console.log('after all awaits');
 
  }
  catch(e) {
    console.log('error in manager')
  }
};

test.before('connecting to challenge', async (t) => {
  await connectDB(t);
//  await manager();
});

test.after.always(async (t) => {
  await dropDB(t);
});



console.log('\n');