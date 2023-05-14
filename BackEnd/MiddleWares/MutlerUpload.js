const multer = require('multer');

//multer
// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create instance of Multer and specify image upload settings
const uploadProduct = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB max file size
}).array('imageUrl', 3); // specify field name for single file upload

const upload = multer({ storage });

module.exports = {
  upload,
  uploadProduct
}
