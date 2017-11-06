
const fetchChallengeStepInfo = (token) => {
  return fetch(`/api/v1/challengeStep?token=${token}`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .then(result => {
      return result;
    })
    .catch((e) => e);
};

export default fetchChallengeStepInfo;
