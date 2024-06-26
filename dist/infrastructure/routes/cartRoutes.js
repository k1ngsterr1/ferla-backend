"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartController_1 = __importDefault(require("@presentation/controllers/cartController"));
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const result = file.originalname;
        req.body.image = result;
        cb(null, result);
    },
});
const upload = multer({ storage: storage });
router.post("/add", upload.single('image'), (req, res) => cartController_1.default.addCart(req, res));
router.get("/get-carts", (req, res) => cartController_1.default.getCarts(req, res));
router.post("/update", upload.single('image'), (req, res) => cartController_1.default.updateCart(req, res));
exports.default = router;
