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
    req.payLoad = payLoad; // eslint-disable-line no-param-reassign
    return next();
  });
}

export function verifyPayLoad(req, res, next) {
  const challengeAttemptId = req.payLoad.challengeAttemptId;
  const challengeId = req.payLoad.challengeId;
  const userFullName = req.payLoad.userFullName;
  if (!challengeAttemptId || !challengeId || !userFullName) {
    return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
  }
  req.challengeAttemptId = challengeAttemptId; // eslint-disable-line no-param-reassign
  req.challengeId = challengeId; // eslint-disable-line no-param-reassign
  req.userFullName = userFullName; // eslint-disable-line no-param-reassign
  return next();
}

// No need to query challengeAttempt collection for challengeId. it is now inside the token payload
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
    .catch(() => {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    });
}

/*
export function loadChallengeStep(req, res, next) {
  const challengeId = req.challengeId;

  return ChallengeStep.find({ challengeId })
    .then((challengeStep) => {
      if (challengeStep.length === 0) {
        return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
      }
      req.challengeStepDoc = challengeStep; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(() => {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    });
}
*/

export function showChallenge(req, res) {
  const userFullName = req.userFullName;
  const stepIdA = req.challengeStepDoc[0]._id;
  const stepNameA = req.challengeStepDoc[0].id;
  const stepIdB = req.challengeStepDoc[1]._id;
  const stepNameB = req.challengeStepDoc[1].id;
  res.status(200).json({
    result: 'ok',
    error: '',
    userFullName,
    challengeSteps: [
      { stepId: stepIdA, stepName: stepNameA },
      { stepId: stepIdB, stepName: stepNameB },
    ],
  });
}

