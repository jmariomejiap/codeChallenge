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
  description: { type: 'String', required: true },
});

export default mongoose.model('ChallengeStep', challengeStep);
