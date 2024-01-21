const path = require('path');
const multer = require('multer');
const createHttpError = require('http-errors');
const { STATIC_PATH } = require('./../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  // image/gif, image/jpef, image/png
  const MIMETYPE_REG_EXP = /^image\/(gif|jpeg|png)$/;

  // cb(null, MIMETYPE_REG_EXP.test(file.mimetype)); // cb(null, чи_зберігати)

  // Якщо тип файлу допустимий, то зберігаємо
  if (MIMETYPE_REGEXP.test(file.mimetype)) {
    return cb(null, true);
  }
  // Інакше генеруємо помилку і перериваємо ланцюжок обробників
  cb(createHttpError(415, 'Support only jpeg/png/gif mimetypes'));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadUserPhoto = upload.single('userPhoto');
