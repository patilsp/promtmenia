import { Schema, model, models } from 'mongoose';

// Clear the existing model to force schema refresh
if (models.Prompt) {
  delete models.Prompt;
}

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
  }
}, {
  timestamps: true // Add timestamps for better tracking
});

const Prompt = model('Prompt', PromptSchema);

export default Prompt;