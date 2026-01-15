import { Article } from "../models/articleModels.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const article = async (req, res) => {
  try {
    console.log("FILE:", req.file); // must NOT be undefined

    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return errorResponse(res, "All fields are required");
    }

    if (!req.file) {
      return errorResponse(res, "Image missing from request");
    }

    // 🔥 THIS was missing — upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    console.log("CLOUDINARY RESULT:", result.secure_url);

    const article = await Article.create({
      title,
      content,
      author,
      image: result.secure_url, // now real URL
    });

    return successResponse(res, "Article created", article);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};




export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const updateData = { title, content, author };

    if (req.file) {
      updateData.image = req.file.path; // new Cloudinary image
    }

    const article = await Article.findByIdAndUpdate(id, updateData, { new: true });

    if (!article) return errorResponse(res, "Article not found");

    successResponse(res, "Article updated", article);
  } catch (error) {
    errorResponse(res, "Server error");
  }
};
