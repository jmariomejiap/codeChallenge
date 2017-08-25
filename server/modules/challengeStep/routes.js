import { Router } from 'express';
import * as challengeController from '../challenge/controllers';

const router = new Router();

router.post('/',
  challengeController.validateParams,
  challengeController.decodeToken,
  challengeController.verifyPayLoad,
);

export default router;
