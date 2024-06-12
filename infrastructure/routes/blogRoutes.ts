import blogController from "@presentation/controllers/blogController";

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

router.post("/add", upload.single("image"), (req, res) => blogController.addCardBlog(req, res));

router.delete("/delete/:id", (req, res) => blogController.deleteCardBlog(req, res));

router.get("/get-blogs", (req, res) => blogController.getBlogCards(req, res));

router.post("/update/:id", upload.single("image"), (req, res) => blogController.updateBlogCards(req, res));

export default router;
