import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

/*
export function connectDB(t, done) {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection('mongodb://localhost:27017/code-challenge-test', err => {
      if (err) t.fail('Unable to connect to test database');
      console.log('mockgoose GOOD!')
      done();
    });
  });
}
*/

export function connectDB(t, done) {
  const testDb = mongoose.createConnection('mongodb://localhost:27017/code-challenge-test');

  testDb.on('error', (err) => {
    if (err) {
      console.log('error Creating testDb', err); // eslint-disable-line no-console
      t.fail(err);
    }
  });
  testDb.once('open', () => {
    console.log('testDb Open!'); // eslint-disable-line no-console
  });
  done();
}


export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
    console.log('Mockgoose Rest!'); // eslint-disable-line no-console
  });
}
