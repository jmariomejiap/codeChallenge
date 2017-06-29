import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.post('/',
  Controller.validateParams,
  Controller.loadChallengeAttempt,
  Controller.validateAttemptStatus,
  Controller.generateToken,
  Controller.showChallengeAttempt,
);


export default router;
