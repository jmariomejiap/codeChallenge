
const apiDynamicTesting = (body) => {
  return fetch('/api/v1/challengeStep/score', {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then(result => {
      return result;
    })
    .catch((e) => e);
};

export default apiDynamicTesting;
