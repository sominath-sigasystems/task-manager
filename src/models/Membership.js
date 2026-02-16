import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema(
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

    role: {
      type: String,
      enum: ["organization_owner", "member"],
      default: "member",
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "approved",
    },
  },
  { timestamps: true },
);

MembershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

export default mongoose.models.Membership ||
  mongoose.model("Membership", MembershipSchema);
