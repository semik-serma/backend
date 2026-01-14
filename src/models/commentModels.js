import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true, Integer: false }
});

export const Comment=mongoose.model("Comment",commentSchema)