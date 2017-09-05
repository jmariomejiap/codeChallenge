// import ChallengeStep from '../../models/challengeStep';
import Challenge from '../../models/challenge';
import fs from 'fs';

export function checkStepId(req, res, next) {
  const stepId = req.body.stepId;
  if (!stepId) {
    return res.status(404).json({ result: 'error', error: 'missing_parameters' });
  }
  return next();
}


export function verifyCurrentStepId(req, res, next) {
  const stepIdArg = req.body.stepId;
  const currentStepId = req.challengeAttemptDoc.currentStepId;
  if (stepIdArg !== currentStepId) {
    return res.status(404).json({ result: 'error', error: 'challenge_step_not_found' });
  }
  return next();
}


const findChallengeStep = async (req, res, next) => {
/*
  const stepId = req.body.stepId;
  const challengeStepDoc = await ChallengeStep.findById(stepId);
  if (!challengeStepDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_step_not_found' });
  }
  req.challengeStepDoc = challengeStepDoc; // eslint-disable-line no-param-reassign
  */
  return next();
};


const findChallenge = async (req, res, next) => {
  const challengeId = req.challengeStepDoc.challengeId;
  const challengeDoc = await Challenge.findById(challengeId);
  if (!challengeDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
  }
  req.challengeDoc = challengeDoc; // eslint-disable-line no-param-reassign
  return next();
};


const buildPath = (req, res, next) => {
  const challengeFolderName = req.challengeDoc.folderName;
  const stepName = req.challengeStepDoc.id;
  const filePath = `/home/juan/oscar/codeChallenge/challenges_data/${challengeFolderName}/${stepName}/`;
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


const fileFetcher = async (req, res, next) => {
  const source = req.filePath;
  // const source = '/home/juan/oscar/codeChallenge/challenges_data/test_challenge_001/001/';

  await fileReader(source, 'description', 'base64')
    .then((fd) => {
      req.fileDescription = fd; // eslint-disable-line no-param-reassign
    })
    .catch(() => {
      return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
    });

  await fileReader(source, 'code', 'base64')
    .then((fd) => {
      req.fileCode = fd; // eslint-disable-line no-param-reassign
    })
    .catch(() => {
      return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
    });

  await fileReader(source, 'info.json', 'utf8')
    .then((fd) => {
      req.fileJson = fd; // eslint-disable-line no-param-reassign
    })
    .catch(() => {
      return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
    });

  return next();
};


const sendResponse = (req, res) => {
  return res.status(200).json({ result: 'ok', error: '', description: req.fileDescription, code: req.fileCode, test: req.fileJson });
};


export { findChallengeStep, findChallenge, buildPath, fileFetcher, sendResponse };
