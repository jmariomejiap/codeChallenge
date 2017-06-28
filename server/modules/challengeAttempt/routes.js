import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

// step one, validateAccessCode
router.post('/accesscode/',
  Controller.validateParams,
  Controller.loadChallengeAttempt,
  Controller.validateAttemptStatus,
  Controller.generateToken,
  Controller.showChallengeAttempt,
);


export default router;
