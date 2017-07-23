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


test('Should always pass', t => {
  t.is(true, true);
});
