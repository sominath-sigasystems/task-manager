import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
