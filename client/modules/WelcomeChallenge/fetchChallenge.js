

const fetchChallengeInfo = (token) => {
  return fetch(`/api/v1/challenge?token=${token}`, {
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

export default fetchChallengeInfo;
