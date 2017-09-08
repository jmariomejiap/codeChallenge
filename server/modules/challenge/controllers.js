import Challenge from '../../models/challenge';


import jwt from 'jsonwebtoken';
import * as config from '../../config';
import fs from 'fs';
import path from 'path';

export function verifyToken(req, res, next) {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({ result: 'error', error: 'missing_parameter' });
  }
  req.token = token; // eslint-disable-line no-param-reassign
  return next();
}

export function decodeToken(req, res, next) {
  const token = req.token;
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

const loadChallenge = async (req, res, next) => {
  const challengeDoc = await Challenge.findById(req.challengeId);
  if (!challengeDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
  }
  req.challengeDoc = challengeDoc; // eslint-disable-line no-param-reassign
  return next();
};

const buildPath = (req, res, next) => {
  const challengeFolderName = req.challengeDoc.folderName;
  const filePath = `/home/juan/oscar/codeChallenge/challenges_data/${challengeFolderName}/`;
  req.filePath = filePath; // eslint-disable-line no-param-reassign
  return next();
};


const readChallengeDir = async (req, res, next) => {
  const challengeFolderName = req.challengeDoc.folderName;
  console.log(`__dirname: ${__dirname}`);

  const dirContent = await new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/../../../challenges_data/${challengeFolderName}`, (err, result) => {
      console.log(err, result);
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  })
    .then((content) => {
      req.fileDir = content; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => {
      console.log(e)
      return res.status(404).json({ result: 'error', error: 'challenge_not_found_READING_DIR' });
    });

};


const readChallengeJson = async (req, res, next) => {
  const challengeInfo = await new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}${req.challengeDoc.folderName}/challenge.json`, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      }
      return resolve(JSON.parse(content));
    })
  })
    .then((data) => {
      req.challengeName = data.name; // eslint-disable-line no-param-reassign
      req.challengeDescription = data.description; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(() => {
      return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
    });
};

export function sendChallengeResponse(req, res) {
  const numberOfSteps = req.fileDir.filter((element) => {
    return element !== 'challenge.json';
  });
  res.status(200).json({
    result: 'ok',
    error: '',
    userFullName: req.userFullName,
    challengeId: req.challengeId,
    challengeName: req.challengeName,
    challengeDescription: req.challengeDescription,
    numberOfSteps: numberOfSteps.length,
  });
}

export { loadChallenge, readChallengeDir, readChallengeJson };
