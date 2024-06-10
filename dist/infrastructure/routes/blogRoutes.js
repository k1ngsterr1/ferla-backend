"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogController_1 = __importDefault(require("@presentation/controllers/blogController"));
const express = require("express");
const router = express.Router();
router.post("/add", (req, res) => blogController_1.default.addCardBlog(req, res));
exports.default = router;
