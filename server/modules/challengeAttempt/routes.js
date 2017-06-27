import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

// step one, validateAccessCode
router.post('/accesscode/',
  Controller.verifyAccess,
  Controller.verifyStatus,
  Controller.generateToken,
);


export default router;
