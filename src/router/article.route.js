import express from "express";
import { article, updateArticle } from "../controller/article.controller.js";
import upload from "../utils/multer.js";

export const articleRoute = express.Router();

articleRoute.post("/createarticle", upload.single("image"), article);
articleRoute.get('/displayarticle',article)
articleRoute.put("/updatearticle/:id", upload.single("image"), updateArticle);
