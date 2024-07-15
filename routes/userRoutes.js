const express = require("express");
const bodyParser = require("body-parser");
const user_route = express();
const { body } = require('express-validator');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: false }));

const multer = require("multer");
const path = require("path");

user_route.use(express.static("public"));
const errors = require('../middleware/errors');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(
      null,
      path.join(__dirname, "../public/userImages"),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  },
});

// const upload = multer({ storage: storage });

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

upload.single("image");
const user_controller = require("../controllers/userController");
const auth = require("../middleware/auth");
user_route.post(
  "/register", upload.none(), 
  body('name').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body('terms').toBoolean(),
  errors,
  user_controller.register_user
);
user_route.post("/login", upload.none(),
  body('email').not().isEmpty().isEmail().normalizeEmail(),
  body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  errors,
  user_controller.user_login);
user_route.get("/auth", auth, user_controller.auth);
user_route.post("/update-password", 
// body('password', 'Password must be at least 8 chars long').isLength({ min: 8 }).not().isEmpty(),
body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
  minLength: 8,
  maxLength: 20,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}),
errors,
auth, 
user_controller.update_password);
user_route.post("/forget-password", 
body('email','Please include a valid email').not().isEmpty().normalizeEmail().isEmail(),
errors,
user_controller.forget_password);
user_route.get("/reset-password",
body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
  minLength: 8,
  maxLength: 20,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}),
errors,
user_controller.reset_password);
user_route.route('/user/:id').delete(auth, user_controller.deleteuser).patch(auth, user_controller.updateuser).get(auth, user_controller.getuser);
user_route.get("/all-users", user_controller.getAllUsers);


module.exports = user_route;
