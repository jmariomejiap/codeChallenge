import ChallengeAttempt from '../../models/challenge_attempt';
import jwt from 'jsonwebtoken';
import * as config from '../../config';


export function verifyAccess(req, res, next) {
  const accessCode = req.body.accessCode;
  const passCode = req.body.passCode;

  if (!accessCode || !passCode) {
    return res.status(404).json({ result: 'error', error: 'missing_parameters' });
  }
  return ChallengeAttempt.find({ accessCode, passCode }, (err, data) => {
    if (err) {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    }
    if (data.length === 0) {
      return res.status(404).json({ result: 'error', token: '', error: 'invalid_access_tokens' });
    }
    req.dbData = data[0]; // eslint-disable-line no-param-reassign
    return next();
  });
}

export function verifyStatus(req, res, next) {
  const status = req.dbData.status;
  if (status === 'completed') {
    return res.status(404).json({ result: 'error', token: '', error: 'challenge_completed' });
  }
  return next();
}

export function generateToken(req, res, next) {
  const payLoad = { challengeAttemptId: req.dbData._id };
  const options = {};
  const key = config.default.secretKey;
  jwt.sign(payLoad, key, options, (err, token) => {
    if (err) {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    }
    req.token = token; // eslint-disable-line no-param-reassign
    return next();
  });
}
