import blogController from "@presentation/controllers/blogController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => blogController.addCardBlog(req, res));

router.delete("/delete", (req, res) => blogController.deleteCardBlog(req, res));

router.get("/get-blogs", (req, res) => blogController.getBlogCards(req, res));

router.post("/update", (req, res) => blogController.updateBlogCards(req, res));

export default router;
