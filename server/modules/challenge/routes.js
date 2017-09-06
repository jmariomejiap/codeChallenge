import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.post('/',
  Controller.validateParams,
  Controller.decodeToken,
  Controller.verifyPayLoad,
  Controller.loadChallenge,
  Controller.buildPath,
  Controller.readChallengeJson
);

export default router;
