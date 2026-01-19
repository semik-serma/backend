import mongoose from "mongoose";

const afterloginSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: { type: String }, // optional (email/username)
  },
  { timestamps: true }
);

export const AfterLoginComment = mongoose.model(
  "AfterLoginComment",
  afterloginSchema
);
