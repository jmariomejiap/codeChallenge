import { Router } from 'express';
import * as challengeController from '../challenge/controllers.js';
import * as challengeStepController from './controllers.js';

const router = new Router();

router.get('/',
  challengeController.verifyToken,
  challengeController.decodeToken,
  challengeController.verifyPayLoad,
  challengeController.loadChallenge,
  challengeController.readChallengeDir,
  challengeStepController.loadChallengeAttempt,
  challengeStepController.findChallengeStep,
  challengeStepController.buildPath,
  // challengeStepController.readStepDir,
  challengeStepController.fileFetcher,
  challengeStepController.sendResponse,
);

export default router;
