import componentController from "@presentation/controllers/componentController";

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

router.post("/add", (req, res) => componentController.addComponent(req, res));

router.get("/get-components", (req, res) =>
  componentController.getComponents(req, res)
);

router.delete("/delete/:id", (req, res) =>
  componentController.deleteComponent(req, res)
);

router.post("/update/:id", (req, res) => componentController.updateComponent(req, res));

router.post("/upload-image/:id", upload.single('image'), (req, res) => componentController.uploadImage(req, res));

export default router;
