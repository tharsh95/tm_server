"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const feedController_1 = require("../controllers/feedController");
const router = (0, express_1.Router)();
router.post('/', auth_1.auth, feedController_1.createFeed);
router.get('/', auth_1.auth, feedController_1.getFeed);
exports.default = router;
