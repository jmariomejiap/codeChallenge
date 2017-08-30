import ChallengeStep from '../../models/challengeStep';
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
  const stepId = req.body.stepId;
  const challengeStepDoc = await ChallengeStep.findById(stepId); // step id 598a16ea478f611f4a778513
  if (!challengeStepDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_step_not_found' });
  }
  req.challengeStepDoc = challengeStepDoc; // eslint-disable-line no-param-reassign
  return next();
};

const findChallenge = async (req, res, next) => {
  // console.log('inside findChallenge');
  const challengeId = req.challengeStepDoc.challengeId;
  const challengeDoc = await Challenge.findById(challengeId);
  if (!challengeDoc) {
    return res.status(404).json({ result: 'error', error: 'challenge_NOT_found' });
  }
  req.challengeDoc = challengeDoc; // eslint-disable-line no-param-reassign
  return next();
};

const buildPath = async (req, res, next) => {
  // console.log('inside buildPath');
  const challengeFolderName = req.challengeDoc.folderName;
  const stepName = req.challengeStepDoc.id;
  const filePath = `../../../challenges_data/${challengeFolderName}/${stepName}`;
  // console.log('this is the path ', filePath);
  req.filePath = filePath; // eslint-disable-line no-param-reassign
  return next();
};

const fileReader = (location, target) => { // eslint-disable-line
  return new Promise((resolve, reject) => { // ../../../challenges_data/${challengeFolderName}/${stepName}
    fs.readFile('../../../challenges_data/test_challenge_001/001/info.json', 'utf8', (err, content) => {
      // console.log('inside readFile');
      if (err) {
        // console.log('going reject');
        // console.log('this is the err', err);
        return reject(err);
      }
      // console.log('going with resolve;')
      return resolve(content);
    });
  });
};

const fileFetcher = async (req, res) => { // eslint-disable-line
  const fileDescription = await fileReader(req.filePath, 'description');

  // const fileCode = await fs.readFile(`${req.filePath}/code`, 'base64');
  // const fileJson = await fs.readFile(`${req.filePath}/info.json`);
  // console.log('going to print description******************************');
  console.log(fileDescription); // eslint-disable-line no-console
};


export { findChallengeStep, findChallenge, buildPath, fileFetcher };
