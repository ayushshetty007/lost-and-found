const express = require('express');
const router = express.Router();
const {
  createLostItem,
  createFoundItem,
  getLostItems,
  getFoundItems,
  getMyItems,
  deleteLostItem,
  deleteFoundItem,
  claimFoundItem
} = require('../controllers/itemController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/lost')
  .post(protect, upload.single('image'), createLostItem)
  .get(getLostItems);

router.route('/found')
  .post(protect, upload.single('image'), createFoundItem)
  .get(getFoundItems);

router.get('/myitems', protect, getMyItems);

router.delete('/lost/:id', protect, deleteLostItem);
router.delete('/found/:id', protect, deleteFoundItem);
router.put('/found/:id/claim', protect, claimFoundItem);

module.exports = router;
