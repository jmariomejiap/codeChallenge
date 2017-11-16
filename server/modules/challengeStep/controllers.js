import fs from 'fs';
import _ from 'lodash';
import evaluator from '../../util/answerEval';
import ChallengeAttempt from '../../models/challengeAttempt';
import ChallengeStepResult from '../../models/challengeStepResult';

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

const setScore = (tests) => {
  const passed = tests.filter((test) => {
    return test.score;
  });

  return (passed.length * 100) / tests.length;
};


const setNextStep = (currentStep, arrSteps) => {
  const current = arrSteps.indexOf(currentStep);
  return arrSteps[current + 1];
};


/* istanbul ignore next */
const loadChallengeAttempt = async (req, res, next) => {
  const stepIdArg = req.challengeAttemptId;
  const challengeAttemptDoc = await ChallengeAttempt.findById(stepIdArg);

  if (!challengeAttemptDoc) {
    /* istanbul ignore next */
    return res.status(404).json({ result: 'error', error: 'challenge_step_not_found' });
  }
  req.challengeAttemptDoc = challengeAttemptDoc; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const findChallengeStep = async (req, res, next) => {
  const currentStepId = req.challengeAttemptDoc.currentStepId;
  if (!currentStepId) {
    const step = req.challengeStepFolders[0];
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


/* istanbul ignore next */
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
  const output = {
    result: 'ok',
    error: '',
    description: new Buffer(req.fileDescription).toString('base64'),
    code: new Buffer(req.fileCode).toString('base64'),
    challengeStepId: req.currentStepId,
  };
  return res.status(200).json(output);
};

// dynimic test functionalilty //

const verifyArguments = (req, res, next) => {
  if (!req.body.input || !req.body.token || !req.body.sample || !req.body.challengeStepId) {
    return res.status(404).json({ result: 'error', error: 'missing arguments' });
  }
  req.token = req.body.token; // eslint-disable-line no-param-reassign
  req.answer = req.body.input; // eslint-disable-line no-param-reassign
  req.sample = req.body.sample; // eslint-disable-line no-param-reassign
  req.challengeStepId = req.body.challengeStepId; // eslint-disable-line no-param-reassign
  return next();
};

/* istanbul ignore next */
const readInfoJson = async (req, res, next) => {
  const path = req.stepPath;
  const resultPromise = await new Promise((resolve, reject) => {
    fs.readFile(`${path}info.json`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  })
    .catch(() => {
      return res.status(500).json({ result: 'error', error: 'internal_error' });
    });

  const parsedResult = JSON.parse(resultPromise);
  req.infoJson = parsedResult; // eslint-disable-line no-param-reassign
  return next();
};

const testAnswer = (req, res, next) => {
  const tests = req.infoJson.test;

  const results = _.map(tests, (test) => {
    const summary = {
      userAnswer: req.answer,
      testInput: test.input,
      expectedOutput: test.expected_output,
      sample: test.sample,
      score: evaluator(req.answer, test.input, test.expected_output),
    };
    return summary;
  });

  req.results = results; // eslint-disable-line no-param-reassign
  return next();
};

const sampleFilter = (req, res, next) => {
  const sampleFlag = req.sample;
  const results = req.results;
  if (sampleFlag === 'true') {
    const filteredResults = _.filter(results, (o) => {
      return o.sample;
    });
    return res.status(200).json({ sample: 'true', result: filteredResults });
  }

  return next();
};

/* istanbul ignore next */
const updateCollections = async (req, res) => {
  await ChallengeStepResult.remove({});

  const currentChallengeAttemptId = req.challengeAttemptId;
  const currentChallengeStep = req.challengeStepId;
  const challengeStepFolders = req.challengeStepFolders;
  const nextStep = setNextStep(currentChallengeStep, challengeStepFolders);

  const newStepResult = {
    id: 'to be Determined',
    challengeId: req.challengeId,
    challengeStepId: currentChallengeStep,
    answer: req.answer,
    score: setScore(req.results),
  };

  await ChallengeStepResult.create(newStepResult)
    .catch(() => {
      return res.status(500).json({ result: 'error', error: 'internal_error_creating' });
    });

  if (nextStep) {
    await ChallengeAttempt.update({ _id: currentChallengeAttemptId }, { currentStepId: nextStep });
    return res.status(200).json({ result: 'ok' });
  }

  // must update for next Challenge!
  // await ChallengeAttempt.update({ _id: currentChallengeAttemptId }, { currentStepId: nextStep });
  return res.status(200).json({ result: 'challenge_completed' });

  // return res.status(200).json({ result: req.results });
};


export { loadChallengeAttempt, findChallengeStep, buildPath, fileFetcher, sendResponse, verifyArguments, readInfoJson, testAnswer, sampleFilter, updateCollections };
