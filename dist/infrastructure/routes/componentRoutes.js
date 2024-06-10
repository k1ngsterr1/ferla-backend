"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const componentController_1 = __importDefault(require("@presentation/controllers/componentController"));
const express = require("express");
const router = express.Router();
router.post("/add", (req, res) => componentController_1.default.addComponent(req, res));
router.get("/get-components", (req, res) => componentController_1.default.getComponents(req, res));
router.delete("/delete/:id", (req, res) => componentController_1.default.deleteComponent(req, res));
router.post("/update/:id", (req, res) => componentController_1.default.updateComponent(req, res));
exports.default = router;
