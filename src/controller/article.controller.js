import { Article } from "../models/articleModel.js";
/* CREATE */
export const createArticle = async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !author || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const article = await Article.create({
      title,
      author,
      content,
      image,
    });

    res.status(201).json({ success: true, data: article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
};

/* READ */
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: articles });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* UPDATE */
export const updateArticle = async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const updateData = { title, author, content };
    if (req.file) updateData.image = req.file.path;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* DELETE */
export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
