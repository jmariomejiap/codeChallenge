import supertest from 'supertest-as-promised'; // eslint-disable-line


const fetchToken = async (aCode, pCode) => {
  const res = await supertest('http://localhost:8080')
    .get(`/api/v1/challengeAttempt?accessCode=${aCode}&passCode=${pCode}`);

  return res.body.token;
};

export default fetchToken;
