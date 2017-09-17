import server from '../server.js';
import supertest from 'supertest-as-promised'; // eslint-disable-line 

const fetchToken = async (aCode, pCode) => {
  server();
  const res = await supertest('http://localhost:8080')
    .post('/api/v1/challengeAttempt')
    .set('Accept', 'application/json')
    .send({ accessCode: aCode, passCode: pCode });
  return res.body.token;
};

export { fetchToken };
