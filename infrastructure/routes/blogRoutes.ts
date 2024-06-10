import authenticateToken from "@infrastructure/middleware/authMiddleware";
import blogController from "@presentation/controllers/blogController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => blogController.addCardBlog(req, res));

export default router;
