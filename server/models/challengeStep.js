import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;

const mongoIdValidator = [
  validate({
    validator: 'isMongoId',
    message: 'Invalid Id',
  }),
];

const challengeStep = new Schema({
  id: { type: 'String', required: true },
  challengeId: { type: 'String', required: true, validate: mongoIdValidator },
  // challengeStepId: { type: 'String', required: true, validate: mongoIdValidator },
  answer: { type: 'String' },
  score: { type: 'Number', required: true },
  dateFinished: { type: Date, default: Date.now },
});

export default mongoose.model('ChallengeStep', challengeStep);
