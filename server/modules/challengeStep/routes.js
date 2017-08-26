import { Router } from 'express';
import * as challengeController from '../challenge/controllers.js';
import * as challengeStepController from './controllers.js';

const router = new Router();

router.post('/',
  challengeController.validateParams,
  challengeStepController.checkStepId,
  challengeController.decodeToken,
  challengeController.verifyPayLoad,
  challengeController.loadChallengeAttempt,
  challengeStepController.verifyCurrentStepId,
  challengeStepController.findChallengeStep

);

export default router;
