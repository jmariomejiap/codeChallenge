import { Router } from 'express';
import * as challengeController from '../challenge/controllers';

const router = new Router();

router.post('/',
  challengeController.validateParams,
  challengeController.decodeToken,
  challengeController.verifyPayLoad,
  //Controller.loadChallengeAttempt,
  //Controller.loadChallengeStep,
  //Controller.showChallenge,
);

export default router;
