// import Challenge from '../../models/challenge';
import ChallengeAttempt from '../../models/challengeAttempt';

import jwt from 'jsonwebtoken';
import * as config from '../../config';

export function validateParams(req, res, next) {
  const accessCode = req.body.accessCode;
  const token = req.body.token;
  if (!accessCode || !token) {
    return res.status(404).json({ result: 'error', error: 'missing_parameters' });
  }
  req.validatedParams = { accessCode, token }; // eslint-disable-line no-param-reassign
  return next();
}

export function decodeToken(req, res, next) {
  const token = req.validatedParams.token;
  const key = config.default.secretKey;

  jwt.verify(token, key, (err, payLoad) => {
    if (err) {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    }
    // const challengeAttemptId = payLoad.challengeAttemptId;
    req.payLoad = payLoad; // eslint-disable-line no-param-reassign
    return next();
  });
}

export function verifyPayLoad(req, res, next) {
  const challengeAttemptId = req.payLoad.challengeAttemptId;
  if (!challengeAttemptId) {
    return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
  }
  req.challengeAttemptId = challengeAttemptId; // eslint-disable-line no-param-reassign
  return next();
}

export function loadChallengeAttempt(req, res, next) {
  const accessCode = req.validatedParams.accessCode;
  const challengeAttemptId = req.challengeAttemptId;
  return ChallengeAttempt.findOne({ accessCode, _id: challengeAttemptId })
    .then((challengeAttempt) => {
      if (!challengeAttempt) {
        return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
      }
      req.challengeAttemptDoc = challengeAttempt; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => {
      console.error(`getChallenge + loadChallengeAttempt (findOne) ${e}`); // eslint-disable-line no-console
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    });
}

