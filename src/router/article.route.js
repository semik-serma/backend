import express from "express";
import upload from "../utils/multer.js";
import {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} from "../controller/article.controller.js";

const router = express.Router();

router.post("/create", upload.single("image"), createArticle);
router.get("/displayarticle", getArticles);
router.put("/update/:id", upload.single("image"), updateArticle);
router.delete("/delete/:id", deleteArticle);

export default router;
