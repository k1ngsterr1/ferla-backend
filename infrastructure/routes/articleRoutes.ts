import articleController from "@presentation/controllers/articleController";

const express = require("express");

const router = express.Router();

router.post("/add", (req, res) => articleController.addArticle(req, res));

router.get("/get-components", (req, res) =>
  articleController.getArticles(req, res)
);

router.delete("/delete/:id", (req, res) =>
  articleController.deleteArticle(req, res)
);

router.post("/update/:id", (req, res) => articleController.updateArticle(req, res));

export default router;
