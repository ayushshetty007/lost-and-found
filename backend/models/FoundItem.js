const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  objectName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateFound: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'claimed'],
    default: 'available',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('FoundItem', foundItemSchema);
