import ChallengeStep from '../../models/challengeStep';

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

const findChallengeStep = async (req, res) => {
  const stepId = req.body.stepId;
  const challengeStepDoc = await ChallengeStep.findById(stepId); // step id 598a16ea478f611f4a778513
  console.log(challengeStepDoc);// eslint-disable-line no-console
  return res.status(200).json({ result: 'kindOfGood', error: 'inProgress' });
};

export { findChallengeStep };
