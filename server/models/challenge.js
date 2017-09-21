import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const challenge = new Schema({
  name: { type: String, required: true },
  folderName: { type: String, required: true },
});

export default mongoose.model('Challenge', challenge);
