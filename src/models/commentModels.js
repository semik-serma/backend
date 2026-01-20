import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    userEmail: { type: String },
    userName: { type: String },
    likes: [{ type: String }], // Array of user emails or IDs
    dislikes: [{ type: String }],
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
