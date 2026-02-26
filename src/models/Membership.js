import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INVITED", "SUSPENDED"],
      default: "ACTIVE",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// One user can only have one membership per organization
MembershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

export default mongoose.models.Membership ||
  mongoose.model("Membership", MembershipSchema);
