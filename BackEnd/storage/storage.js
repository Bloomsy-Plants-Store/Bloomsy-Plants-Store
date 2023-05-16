const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('../config.json');

cloudinary.config({
    cloud_name:config.CLOUD_NAME,
    api_key:config.API_KEY,
    api_secret:config.SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

module.exports = {
    storage
};
