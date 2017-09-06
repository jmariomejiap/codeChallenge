import mongoose from 'mongoose';
import validate from 'mongoose-validator';

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
  accessCode: { type: String, required: true },
  passCode: { type: String, required: true },
  fullName: { type: String, lowercase: true, required: true },
  email: { type: String, lowercase: true, required: true, validate: emailValidator },
  score: { type: Number, min: 0, max: 100 },
  currentStepId: { type: String, required: true },
  challengeId: { type: String, required: true, validate: mongoIdValidator },
  status: { type: String, required: true, enum: ['not_started', 'in_progress', 'completed'] },
});

export default mongoose.model('ChallengeAttempt', challengeAttempt);
