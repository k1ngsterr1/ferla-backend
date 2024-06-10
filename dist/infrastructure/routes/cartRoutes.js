"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartController_1 = __importDefault(require("@presentation/controllers/cartController"));
const express = require("express");
const router = express.Router();
router.post("/add", (req, res) => cartController_1.default.addCart(req, res));
router.get("/get-carts", (req, res) => cartController_1.default.getCarts(req, res));
exports.default = router;
