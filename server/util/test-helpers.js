import mongoose from 'mongoose';

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
