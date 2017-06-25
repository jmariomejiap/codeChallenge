import ChallengeAttempt from '../../models/challenge_attempt';

export function validateAccessCode(req, res, next) {
  if (!req.body.accessCode || !req.body.passCode) {
    return res.status(404).json({ result: 'error', error: 'missing_parameters' });
  }
  return ChallengeAttempt.verifyAccess(req.body.accessCode, req.body.passCode, (err, dbData) => {
    if (err) {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    }
    if (dbData === 'invalid') {
      return res.status(404).json({ result: 'error', token: '', error: 'invalid_access_tokens' });
    }
    if (dbData === 'completed') {
      return res.status(404).json({ result: 'error', token: '', error: 'challenge_completed' });
    }
    // res.status(200).json({ result: 'ok', token: tokenValue, error: '' });  // if res not here error is thrown when trying to commit.
    req.token = dbData; // eslint-disable-line no-param-reassign
    return next();
  });
}
