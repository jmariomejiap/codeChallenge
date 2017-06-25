import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import jwt from 'jsonwebtoken';
import * as config from '../config';

const Schema = mongoose.Schema;

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid email format',
  }),
];
const mongoIdValidator = [
  validate({
    validator: 'isMongoId',
    message: 'Invalid Id',
  }),
];

const challengeAttempt = new Schema({
  accessCode: { type: 'String', required: true },
  passCode: { type: 'String', required: true },
  fullName: { type: 'String', lowercase: true, required: true },
  email: { type: 'String', lowercase: true, required: true, validate: emailValidator },
  score: { type: 'Number', min: 0, max: 100 },
  currentStepId: { type: 'String', required: true, validate: mongoIdValidator },
  challengeId: { type: 'String', required: true, validate: mongoIdValidator },
  status: { type: 'String', required: true, enum: ['not_started', 'in_progress', 'completed'] },
});

challengeAttempt.statics.verifyAccess = function verifyAccess(accessCode, passCode, done) {
  this.find({ accessCode, passCode }, (err, fData) => {
    if (err) {
      done(err, null);
    }
    if (fData.length === 0) {
      done(null, 'invalid');
    } else {
      const chaAttemptData = fData[0];
      if (chaAttemptData.status === 'completed') {
        done(null, 'completed');
      } else {
        const payLoad = { challengeAttemptId: chaAttemptData._id };
        const options = {};
        const key = config.default.secretKey;

        jwt.sign(payLoad, key, options, (error, tokenValue) => {
          if (error) {
            done(error, null);
          } else {
            done(null, tokenValue);
          }
        });
      }
    }
  });
};

export default mongoose.model('ChallengeAttempt', challengeAttempt);
