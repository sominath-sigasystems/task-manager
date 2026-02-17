import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Prevent duplicate pending requests
JoinRequestSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

export default mongoose.models.JoinRequest ||
  mongoose.model("JoinRequest", JoinRequestSchema);
