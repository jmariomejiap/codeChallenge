import mongoose from 'mongoose';
// import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
/*
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

const mongoIdValidator = [
  validate({
    validator: function(val) {
      return new Promise((resolve, reject) => {
        if (isMongoId) {
          resolve(true)
        }
        reject(false);
      })
    },
    message: "error with mongodId schema",
  }),
];
*/

const challengeAttempt = new Schema({
  accessCode: { type: String, required: true },
  passCode: { type: String, required: true },
  fullName: { type: String, lowercase: true, required: true },
  email: { type: String, lowercase: true, required: true },
  score: { type: Number, min: 0, max: 100 },
  currentStepId: { type: String, required: true },
  challengeId: { type: String, required: true },
  status: { type: String, required: true, enum: ['not_started', 'in_progress', 'completed'] },
});

export default mongoose.model('ChallengeAttempt', challengeAttempt);
