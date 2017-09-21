import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.get('/',
  Controller.verifyToken,
  Controller.decodeToken,
  Controller.verifyPayLoad,
  Controller.loadChallenge,
  Controller.readChallengeDir,
  Controller.readChallengeJson,
  Controller.sendChallengeResponse
);

export default router;
