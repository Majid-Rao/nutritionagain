const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const programController = require('../controllers/programController');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  if (file.fieldname === 'image' && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === 'video' && allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const sanitizedName = path.basename(file.originalname).replace(/[^a-zA-Z0-9]/g, '');
    cb(null, `${Date.now()}-${sanitizedName}${path.extname(file.originalname)}`);
  }
});

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
    files: 2 // Max number of files
  }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'File too large. Max size is 100MB'
      });
    }
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
  next(err);
};

// Routes with error handling
router.post('/addprogram', 
  (req, res, next) => {
    upload.fields([
      { name: 'image', maxCount: 1 }, 
      { name: 'video', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        handleUploadError(err, req, res, next);
      } else {
        next();
      }
    });
  },
  programController.createProgram
);

router.get('/getprograms', programController.getAllPrograms);

router.get('/getprogram/:id', programController.getOneProgram);

router.put('/updateprogram/:id',
  (req, res, next) => {
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        handleUploadError(err, req, res, next);
      } else {
        next();
      }
    });
  },
  programController.updateProgram
);

router.delete('/deleteprogram/:id', programController.deleteProgram);

// Global error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

module.exports = router;