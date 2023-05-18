
const { storage } = require('../storage/storage');
const multer = require('multer');

const uploadProduct = multer({ storage }).array('imageUrl', 3);

module.exports = {
  uploadProduct
}
