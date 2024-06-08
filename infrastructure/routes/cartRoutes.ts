import cartController from "@presentation/controllers/cartController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => cartController.addCart(req, res));

router.get("/get-carts", (req, res) => cartController.getCarts(req, res));

export default router;