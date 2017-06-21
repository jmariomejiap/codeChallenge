import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

// step one, validateAccessCode
// working. ("/api" before the route when used in postman);
router.route('/validate').post(Controller.validateAccessCode);


export default router;
