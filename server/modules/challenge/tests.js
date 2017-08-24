import test from 'ava'; // eslint-disable-line 
import supertest from 'supertest-as-promised'; // eslint-disable-line 
import server from '../../server.js'; // eslint-disable-line 

console.log('inside challenge test!'); // eslint-disable-line no-console

test('silly test', (t) => {
  t.is(true, true);
});
