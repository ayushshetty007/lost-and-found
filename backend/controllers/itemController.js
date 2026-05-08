const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const Notification = require('../models/Notification');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');
const fs = require('fs');
const path = require('path');

const uploadToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    if (process.env.CLOUDINARY_API_KEY === 'mock_key' || !process.env.CLOUDINARY_API_KEY) {
      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const ext = mimetype ? '.' + mimetype.split('/')[1] : '.jpg';
      const fileName = `local_upload_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      
      fs.writeFile(filePath, buffer, (err) => {
        if (err) return reject(err);
        resolve({ secure_url: `http://localhost:5000/uploads/${fileName}` });
      });
      return;
    }

    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: 'lost-and-found' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

// @desc    Create a lost item
// @route   POST /api/items/lost
// @access  Private
const createLostItem = async (req, res, next) => {
  try {
    const { objectName, description, dateLost, location, mobileNumber } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      imageUrl = result.secure_url;
    }

    const lostItem = await LostItem.create({
      objectName,
      description,
      dateLost,
      location,
      mobileNumber,
      image: imageUrl,
      uploadedBy: req.user._id,
    });

    res.status(201).json(lostItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a found item
// @route   POST /api/items/found
// @access  Private
const createFoundItem = async (req, res, next) => {
  try {
    const { objectName, category, description, dateFound, location, mobileNumber, additionalNotes } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      imageUrl = result.secure_url;
    } else {
      res.status(400);
      throw new Error('Image is required for found items');
    }

    const foundItem = await FoundItem.create({
      objectName,
      category,
      description,
      dateFound,
      location,
      mobileNumber,
      additionalNotes,
      image: imageUrl,
      uploadedBy: req.user._id,
    });

    res.status(201).json(foundItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all lost items
// @route   GET /api/items/lost
// @access  Public
const getLostItems = async (req, res, next) => {
  try {
    const items = await LostItem.find({}).populate('uploadedBy', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all found items
// @route   GET /api/items/found
// @access  Public
const getFoundItems = async (req, res, next) => {
  try {
    const items = await FoundItem.find({}).populate('uploadedBy', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's uploaded items
// @route   GET /api/items/myitems
// @access  Private
const getMyItems = async (req, res, next) => {
  try {
    const lostItems = await LostItem.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    const foundItems = await FoundItem.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    
    res.json({ lostItems, foundItems });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lost item
// @route   DELETE /api/items/lost/:id
// @access  Private
const deleteLostItem = async (req, res, next) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (item && item.uploadedBy.toString() === req.user._id.toString()) {
      await item.deleteOne();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404);
      throw new Error('Item not found or user not authorized');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a found item
// @route   DELETE /api/items/found/:id
// @access  Private
const deleteFoundItem = async (req, res, next) => {
  try {
    const item = await FoundItem.findById(req.params.id);

    if (item && item.uploadedBy.toString() === req.user._id.toString()) {
      await item.deleteOne();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404);
      throw new Error('Item not found or user not authorized');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Claim a found item
// @route   PUT /api/items/found/:id/claim
// @access  Private
const claimFoundItem = async (req, res, next) => {
  try {
    const item = await FoundItem.findById(req.params.id);

    if (item) {
      if (item.status === 'claimed') {
        res.status(400);
        throw new Error('Item is already claimed');
      }
      
      item.status = 'claimed';
      await item.save();

      // Create notification for the uploader
      if (item.uploadedBy.toString() !== req.user._id.toString()) {
        await Notification.create({
          recipient: item.uploadedBy,
          sender: req.user._id,
          item: item._id,
          message: `${req.user.name} has claimed the item: ${item.objectName}. Please contact them at ${req.user.mobileNumber}.`,
        });
      }

      res.json(item);
    } else {
      res.status(404);
      throw new Error('Item not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLostItem,
  createFoundItem,
  getLostItems,
  getFoundItems,
  getMyItems,
  deleteLostItem,
  deleteFoundItem,
  claimFoundItem
};
