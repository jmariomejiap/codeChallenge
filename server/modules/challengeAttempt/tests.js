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


const createChallenge = () => {
  return new Promise((resolve, reject) => {
    Challenge.create({
      name: 'first-test',
      folderName: 'beginnerFunctions-test',
    }, (err, cha) => {
      if (err) { 
        return reject(err);
      }
      return resolve(cha);
    });
  });
};

/*

test.beforeEach('connecting to challenge', async (t) => {
  console.log('inside beforeEach');
  //const challengeParams = { name: 'first-test', folderName: 'beginnerFunctions-test'};
  //console.log('params are: ', challengeParams);
  //const ch = await Challenge.create(challengeParams);
  const chaHolder = await createChallenge();
  
  console.log('after ch await');

   t.is(true, true);
  console.log('end of tests' + chaHolder);
  t.end();
  t.pass();
  //await ChallengeStep.save({....., chnaggendId: ch.id});
  
});


export async function wait(sec) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('continue');
    }, (sec * 1000));
  });
}; */

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


// originally this is part of beforeEach.
// option 1 is to elaborate promise inside the test(below)
// option 2 is to call createChallenge function up in line 18.
// I believe we have a connection error. to db.
test('saves challenge', async (t) => {
  console.log('before await')
  const myChallenge = await new Promise((resolve,reject) => {
    Challenge.create({
      name: 'first-test',
      folderName: 'beginnerFunctions-test',
    }, (err, cha) => {
      if (err) { 
        return reject(err);
      }
      return resolve(cha);
    });
    
  });
  console.log('after await = ', myChallenge);
  t.is(true, true);
  t.end();
})