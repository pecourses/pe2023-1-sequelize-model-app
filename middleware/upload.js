const path = require('path');
const multer = require('multer');
const { STATIC_PATH } = require('./../constants');

const upload = multer({ dest: path.join(STATIC_PATH, 'images') });

module.exports.uploadUserPhoto = upload.single('userPhoto');
