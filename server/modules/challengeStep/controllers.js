import ChallengeAttempt from '../../models/challengeAttempt';
import fs from 'fs';

// helper function
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) {
        return reject(err);
      }
      return resolve(content);
    });
  });
};


const loadChallengeAttempt = async (req, res, next) => {
  const stepIdArg = req.challengeAttemptId;
  const challengeAttemptDoc = await ChallengeAttempt.findById(stepIdArg);

  if (!challengeAttemptDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_step_not_found' });
  }
  req.challengeAttemptDoc = challengeAttemptDoc; // eslint-disable-line no-param-reassign
  return next();
};


const findChallengeStep = async (req, res, next) => {
  const currentStepId = req.challengeAttemptDoc.currentStepId; // is a string
  if (!currentStepId) {
    const step = req.challengeStepsFolders[0];
    req.currentStepId = step;// eslint-disable-line no-param-reassign
    return next();
  }
  req.currentStepId = currentStepId; // eslint-disable-line no-param-reassign
  return next();
};

const buildPath = (req, res, next) => {
  const path = `${__dirname}/../../../challenges_data/${req.challengeDoc.folderName}/${req.currentStepId}/`;
  req.stepPath = path; // eslint-disable-line no-param-reassign
  return next();
};

// not being used
/*
const readStepDir = async (req, res, next) => {
  const stepContents = await new Promise((resolve, reject) => {
    fs.readdir(req.stepPath, (err, contents) => {
      if (err) {
        return reject(err);
      }
      return resolve(contents);
    });
  }).catch(() => {
    return res.status(404).json({ result: 'error', error: 'challenge_not_found_READING_DIR' });
  });
};
*/
// //


const fileFetcher = async (req, res, next) => {
  const path = req.stepPath;
  const filesPromises = [
    readFile(`${path}description`),
    readFile(`${path}code`),
  ];

  const resolvedFiles = await Promise.all(filesPromises)
    .catch(() => res.status(500).json({ result: 'error', error: 'internal_error' }));

  req.fileDescription = resolvedFiles[0]; // eslint-disable-line no-param-reassign
  req.fileCode = resolvedFiles[1]; // eslint-disable-line no-param-reassign
  return next();
};


const sendResponse = (req, res) => {
  return res.status(200).json({ result: 'ok', error: '', description: req.fileDescription, code: req.fileCode });
};


export { loadChallengeAttempt, findChallengeStep, buildPath, fileFetcher, sendResponse };
