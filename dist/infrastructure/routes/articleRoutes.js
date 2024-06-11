"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const componentController_1 = __importDefault(require("@presentation/controllers/componentController"));
const express = require("express");
const multer = require("multer");
const router = express.Router();
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
router.post("/add", (req, res) => componentController_1.default.addComponent(req, res));
router.get("/get-components", (req, res) => componentController_1.default.getComponents(req, res));
router.delete("/delete/:id", (req, res) => componentController_1.default.deleteComponent(req, res));
router.post("/update/:id", (req, res) => componentController_1.default.updateComponent(req, res));
router.post("/upload-image/:id", upload.single('image'), (req, res) => componentController_1.default.uploadImage(req, res));
exports.default = router;
