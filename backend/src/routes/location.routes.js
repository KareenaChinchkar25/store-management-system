const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const locationController = require("../controllers/location.controller");

router.get("/nearest", auth, locationController.getNearestStores);

module.exports = router;
