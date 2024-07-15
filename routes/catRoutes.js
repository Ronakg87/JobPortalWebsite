
const express = require("express");
const bodyParser = require("body-parser");
const cat_route = express();
const { body } = require('express-validator');

cat_route.use(bodyParser.json());
cat_route.use(bodyParser.urlencoded({ extended: false }));
const cat_controller = require("../controllers/categoryController");
const auth = require('../middleware/auth');
const errors = require("../middleware/errors");

cat_route.post("/category",
auth,
body('category').not().isEmpty().trim().escape(),
body('status').not().isEmpty(),
errors,
cat_controller.add_category);

cat_route.get("/categories", auth, cat_controller.getcategories);
cat_route.delete("/category/:id", auth, cat_controller.delete_category);


module.exports = cat_route;