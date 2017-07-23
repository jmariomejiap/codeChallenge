import test from 'ava';
// import supertest from 'supertest-as-promised';
import { connectDB } from '../../util/test-helpers';
// import app from './server/server.js'
import Challenge from '../../models/challenge.js';
import ChallengeStep from '../../models/challengeStep.js';


test.cb.before('connecting to challenge', (t) => {
  connectDB(t, () => {
    console.log('connected to the db');
    t.end();
    t.pass();
  });
});

export async function wait(sec) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('continue');
    }, (sec * 1000));
  });
};

test('Should always pass', t => {
  t.is(true, true);
});

test.cb('Should wait for a timeout', t => {
  setTimeout(() => {
      t.is(true, true);
      t.end();
  }, (200));
});

test('Should wait for a promise', async (t) => {
  console.log('begining of tests');
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('*******');
    }, (200));
  });

  t.is(true, true);
  console.log('end of tests' + res);
});
