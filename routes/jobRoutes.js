const express = require("express");
const bodyParser = require("body-parser");
const job_route = express();
const { body } = require('express-validator');

job_route.use(bodyParser.json());
job_route.use(bodyParser.urlencoded({ extended: false }));
const job_controller = require("../controllers/jobController");
const auth = require('../middleware/auth');
const errors = require("../middleware/errors");

const multer = require("multer");
const path = require("path");

job_route.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(
      null,
      path.join(__dirname, "../public/companyLogo"),
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

const checkFileType = (file, cb) => {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
 });

job_route.post("/jobs",
auth,
upload.single("companyLogo"),
body('jobTitle').not().isEmpty().trim().escape(),
body('category').not().isEmpty(),
body('jobDesc').not().isEmpty().trim().escape(),
body('terms').not().isEmpty(),
// body('companyLogo'),

//     // Check if the uploaded file is allowed
//     if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(image.memetype)) {
//         throw Error('Invalid file');
//     }

//     if ((image.size / (1024 * 1024)) > allowed_file_size) {                  
//        throw Error('File too large');
//     }   
//   }),
body('companyName').not().isEmpty().trim().escape(),
body('contactNo','Please enter a valid phone number.').isMobilePhone(),
body('address').not().isEmpty(),
body('state').not().isEmpty(),
body('website').trim().isURL()
.withMessage("Please enter the Valid URL"),
body('appEmail').isEmail().normalizeEmail(),
body('appWebLink').trim()
.isURL()
.withMessage("Please enter the URL for your website"),
errors,
job_controller.jobs);
job_route.get("/search-jobs/", auth, job_controller.search_jobs);


module.exports = job_route;

