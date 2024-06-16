import cartController from "@presentation/controllers/cartController";

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

router.post("/add", upload.single("image"), (req, res) =>
  cartController.addCart(req, res)
);

router.get("/get-carts", (req, res) => cartController.getCarts(req, res));

router.post("/update", upload.single("image"), (req, res) =>
  cartController.updateCart(req, res)
);

router.delete("/delete/:id", (req, res) => cartController.deleteCart(req, res));

export default router;
