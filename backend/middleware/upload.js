// backend/middleware/upload.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Upload directory
const uploadDir = path.join(__dirname, '../uploads/reading-materials');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      // Create directory only when an upload actually happens
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      console.error('❌ Failed to create upload directory:', error);
      cb(error);
    }
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1E9);

    const ext = path.extname(file.originalname);

    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + ext
    );
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/zip',
    'application/x-rar-compressed'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'File type not allowed. Please upload PDF, Word, PowerPoint, Excel, text, or image files.'
      ),
      false
    );
  }
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

module.exports = upload;
