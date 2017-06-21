import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

// step one, validateAccessCode
router.route('/accesscode').post(Controller.validateAccessCode);


export default router;
