import formController from "@presentation/controllers/formController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => formController.addForm(req, res));

router.delete("/delete/:id/:code", (req, res) => formController.deleteForm(req, res));

router.get("/get-forms/:code", (req, res) => formController.getForms(req, res));

export default router;
