const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  objectName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  dateLost: {
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
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['lost', 'recovered'],
    default: 'lost',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('LostItem', lostItemSchema);
