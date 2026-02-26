import mongoose from "mongoose";

const ScopedRoleAssignmentSchema = new mongoose.Schema(
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

    scopeType: {
      type: String,
      enum: ["TEAM", "PROJECT"],
      required: true,
    },

    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate scoped assignment
ScopedRoleAssignmentSchema.index(
  { userId: 1, roleId: 1, scopeType: 1, scopeId: 1 },
  { unique: true },
);

export default mongoose.models.ScopedRoleAssignment ||
  mongoose.model("ScopedRoleAssignment", ScopedRoleAssignmentSchema);
