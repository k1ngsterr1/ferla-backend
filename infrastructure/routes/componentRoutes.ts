import componentController from "@presentation/controllers/componentController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => componentController.addComponent(req, res));

router.get("/get-components", (req, res) =>
  componentController.getComponents(req, res)
);

router.delete("/delete/:id", (req, res) =>
  componentController.deleteComponent(req, res)
);

router.post("/update/:id", (req, res) =>
  componentController.updateComponent(req, res)
);

export default router;
