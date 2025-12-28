// routes/store.routes.js
const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const store = require("../controllers/store.controller");
const location = require("../controllers/location.controller");

// 📍 Location-based
router.get("/nearest", auth, location.getNearestStores);

// 🏪 Stores CRUD
router.get("/", auth, store.getStores);
router.get("/:id", auth, store.getStoreById);

router.post("/", auth, role("admin"), store.createStore);
router.put("/:id", auth, role("admin", "manager"), store.updateStore);
router.delete("/:id", auth, role("admin"), store.deleteStore);

module.exports = router;
