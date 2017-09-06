import Challenge from '../../models/challenge';
import ChallengeAttempt from '../../models/challengeAttempt';

import jwt from 'jsonwebtoken';
import * as config from '../../config';
import fs from 'fs';

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


const loadChallenge = async (req, res, next) => {
  const challengeId = req.challengeId;
  const challengeDoc = await Challenge.findById(challengeId);
  if (!challengeDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
  }
  // console.log('inside loadCh')
  req.challengeDoc = challengeDoc; // eslint-disable-line no-param-reassign
  return next();
};

const buildPath = (req, res, next) => {
  // console.log('inside buildPath ', req.challengeDoc);
  const challengeFolderName = req.challengeDoc.folderName;
  const filePath = `/home/juan/oscar/codeChallenge/challenges_data/${challengeFolderName}/`;
  req.filePath = filePath; // eslint-disable-line no-param-reassign
  return next();
};

const fileReader = async (myPath, target, encoding) => {
  return await new Promise((resolve, reject) => {
    fs.readFile(myPath + target, encoding, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
};

/*
const readChallengeFolder = async (req, res, next) => {
  // to be continued.
}
*/
const readChallengeJson = async (req, res, next) => {
  await fileReader(req.filePath, 'challenge.json', 'utf8')
    .then((f) => {
      req.challengeName = f.name; // eslint-disable-line no-param-reassign
      req.challengeDescription = f.description; // eslint-disable-line no-param-reassign
      return next();
      // return res.status(200).json({ result: f});
    })
    .catch(() => {
      return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
    });
};

/*
{
  challengeId: '', // you will have this i the token
  challengeName: '', // challenge.json file
  challengeDescription: '', // challenge.json file
  numberOfSteps: 0, // read the number of folders in the challenge folder, each subfolder is a step.
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

export { loadChallenge, buildPath, readChallengeJson };
