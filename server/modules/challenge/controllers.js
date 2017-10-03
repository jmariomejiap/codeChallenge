import jwt from 'jsonwebtoken';
import * as config from '../../config';
import fs from 'fs';
import _ from 'lodash';


import Challenge from '../../models/challenge';

const verifyToken = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(404).json({ result: 'error', error: 'missing_parameter' });
  }
  req.token = token; // eslint-disable-line no-param-reassign
  return next();
};

const decodeToken = (req, res, next) => {
  const token = req.token;
  const key = config.default.secretKey;
  jwt.verify(token, key, (err, payLoad) => {
    if (err) {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    }
    req.payLoad = payLoad; // eslint-disable-line no-param-reassign
    return next();
  });
};


const verifyPayLoad = (req, res, next) => {
  const challengeAttemptId = req.payLoad.challengeAttemptId;
  const challengeId = req.payLoad.challengeId;
  if (!challengeAttemptId || !challengeId) {
    return res.status(404).json({ result: 'error', error: 'challenge_not_found' });
  }
  req.challengeAttemptId = challengeAttemptId; // eslint-disable-line no-param-reassign
  req.challengeId = challengeId; // eslint-disable-line no-param-reassign
  return next();
};

/* istanbul ignore next */
const loadChallenge = async (req, res, next) => {
  const challengeDoc = await Challenge.findById(req.challengeId);
  if (!challengeDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
  }
  req.challengeDoc = challengeDoc; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const readChallengeDir = async (req, res, next) => {
  const path = `${__dirname}/../../../challenges_data/${req.challengeDoc.folderName}`;

  const dirContents = await new Promise((resolve, reject) => {
    fs.readdir(path, (err, contents) => {
      /* istanbul ignore if */
      if (err) {
        return reject(err);
      }

      return resolve(contents);
    });
  }).catch(() => {
    /* istanbul ignore next */
    return res.status(404).json({ result: 'error', error: 'challenge_not_found_READING_DIR' });
  });

  const statPromises = dirContents.map((element) => {
    return new Promise((resolve, reject) => {
      fs.stat(`${path}/${element}`, (err, stat) => {
        /* istanbul ignore if */
        if (err) {
          return reject(err);
        }

        if (stat.isDirectory()) {
          return resolve(element);
        }

        return resolve(null);
      });
    });
  });

  const resolvedStat = await Promise.all(statPromises)
    .catch(() => {
      /* istanbul ignore next */
      const output = { result: 'error', error: 'internal_error' };
      /* istanbul ignore next */
      return res.status(500).json(output);
    });

  const folders = resolvedStat.filter((item) => {
    return item !== null;
  });
  const sortedFolders = _.sortBy(folders);
  req.challengeStepFolders = sortedFolders; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const readChallengeJson = (req, res, next) => {
  const challengeFolderName = req.challengeDoc.folderName;
  fs.readFile(`${__dirname}/../../../challenges_data/${challengeFolderName}/challenge.json`, 'utf8', (err, content) => {
    if (err) {
      return res.status(500).json({ result: 'error', error: 'challenge_does_not_have_descriptor' });
    }

    let challengeJson;

    try {
      challengeJson = JSON.parse(content);
    } catch (error) {
      return res.status(500).json({ result: 'error', error: 'error_parsing_challenge' });
    }

    if (!challengeJson.name || !challengeJson.description) {
      return res.status(500).json({ result: 'error', error: 'challenge_is_invalid' });
    }

    req.challengeName = challengeJson.name; // eslint-disable-line no-param-reassign
    req.challengeDescription = challengeJson.description; // eslint-disable-line no-param-reassign
    return next();
  });
};

const sendChallengeResponse = (req, res) => {
  res.status(200).json({
    result: 'ok',
    error: '',
    userFullName: req.userFullName,
    challengeId: req.challengeId,
    challengeName: req.challengeName,
    challengeDescription: req.challengeDescription,
    numberOfSteps: req.challengeStepFolders.length,
  });
};

export { verifyToken, decodeToken, verifyPayLoad, loadChallenge, readChallengeDir, readChallengeJson, sendChallengeResponse };
