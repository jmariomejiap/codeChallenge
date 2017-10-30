
const sendParams = (data) => {
  const accessCode = data.accessCode;
  const passCode = data.passCode;

  return fetch(`/api/v1/challengeAttempt?accessCode=${accessCode}&passCode=${passCode}`, {
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

export default sendParams;
