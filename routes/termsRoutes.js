
const express = require("express");
const bodyParser = require("body-parser");
const route = express();
const { body } = require('express-validator');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));
const term_controller = require("../controllers/termController");
const auth = require('../middleware/auth');
const errors = require("../middleware/errors");

route.post("/terms",
auth,
body('term').not().isEmpty().trim().escape(),
body('status').not().isEmpty(),
errors,
term_controller.add_term);

route.get("/terms", auth, term_controller.getterms);
route.delete("/terms/:id", auth, term_controller.delete_term);


module.exports = route;