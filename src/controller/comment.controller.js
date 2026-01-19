import { Comment } from "../models/commentModels.js";
import { successResponse } from "../utils/response.js";
import User from "../models/userModels.js";
import { AfterLoginComment } from "../models/afterlogincommentModels.js";

export const beforelogincomment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body required"
      });
    }

    const { comment } = req.body;

    if (!comment || comment.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Comment text required"
      });
    }

    const commentData = await Comment.create({ 
      comment: comment.trim() 
    });

    if (successResponse) {
      return successResponse(res, 'Comment created', commentData);
    } else {
      return res.status(201).json({
        success: true,
        message: "Comment created",
        data: commentData
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: "Error creating comment",
      error: error.message
    });
  }
};

export const beforelogindisplaycomment = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load comments",
      error: err.message
    });
  }
};

export const beforelogincommentgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comment",
      error: error.message,
    });
  }
};

export const usercommentname = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (successResponse) {
      return successResponse(res, 'User found', user);
    } else {
      return res.status(200).json({
        success: true,
        message: "User found",
        data: user
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: "Error finding user",
      error: error.message
    });
  }
};

export const afterlogincomments = async (req, res) => {
  try {
    const { comment, user } = req.body;

    if (!comment || comment.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Comment text required"
      });
    }

    const created = await AfterLoginComment.create({ 
      comment: comment.trim(),
      user: user || 'Anonymous'
    });

    return res.status(201).json({
      success: true,
      message: "Comment created",
      data: created
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: "Error creating comment",
      error: error.message,
    });
  }
};

export const afterlogincommentget = async (req, res) => {
  try {
    const comments = await AfterLoginComment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};

export const afterlogincommentgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await AfterLoginComment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comment",
      error: error.message,
    });
  }
};