const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // Add body-parser middleware
app.use(cors());
app.use(express.static('uploads'));
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false,
  })
);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(
      null,
      uuidv4() +
        file.fieldname +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const fileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return callback(null, false);
  }
  callback(null, true);
};
const upload = multer({ storage, fileFilter });

router.get('/', usersController.getAllUsers);

router.get('/getUser/:id', usersController.getUserById);

router.put('/updateUser/:id', usersController.updateUserById);

router.delete('/deleteUser/:id', usersController.deleteUserById);

router.post(
  '/createUser',
  upload.single('photo'), // Use upload.single() for single file upload
  usersController.createUser
);

module.exports = router;