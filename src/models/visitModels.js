import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Visit", visitSchema);
