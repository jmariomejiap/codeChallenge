import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.post('/',
  Controller.validateParams,
  Controller.decodeToken,
  Controller.verifyPayLoad,
  // Controller.loadChallengeAttempt,
  Controller.loadChallengeStep,
  Controller.showChallenge,
);

export default router;
