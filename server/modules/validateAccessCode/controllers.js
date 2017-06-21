import ChallengeAttempt from '../../models/challenge_attempt';
import jwt from 'jsonwebtoken';
import * as config from '../../config';

export function validateAccessCode(req, res, next) {
  if (!req.body.accessCode || !req.body.passCode) {
    res.status(404).json({ result: 'error', error: 'missing_parameters' });
  }
  ChallengeAttempt.find({ accessCode: req.body.accessCode, passCode: req.body.passCode }).exec((err, data) => {
    if (err) {
      res.status(500).json({ result: 'error', error: 'internal_error' });
    } else {
      if (data.length === 0) {
        res.status(404).json({ result: 'error', token: '', error: 'invalid_access_tokens' });
      } else {
        const chaAttemptData = data[0];
        if (chaAttemptData.status === 'completed') {
          res.status(404).json({ result: 'error', token: '', error: 'challenge_completed' });
        } else {
          const payLoad = { challengeAttemptId: chaAttemptData._id };
          const options = {};
          const key = config.default.secretKey;

          jwt.sign(payLoad, key, options, (error, tokenValue) => {
            if (error) {
              res.status(500).json({ result: 'error', error: 'internal_error' });
            } else {
              // res.status(200).json({ result: 'ok', token: tokenValue, error: '' });  // if res not here error is thrown when trying to commit.
              req.token = tokenValue; // eslint-disable-line no-param-reassign
              next();
              return;
            }
          });
        }
      }
    }
  });
}
