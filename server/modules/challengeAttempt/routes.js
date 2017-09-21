import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.get('/',
  Controller.validateParams,
  Controller.loadChallengeAttempt,
  Controller.validateAttemptStatus,
  Controller.generateToken,
  Controller.sendToken,
);


export default router;
