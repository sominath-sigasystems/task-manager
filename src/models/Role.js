// models/Role.js

import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate role code per organization
RoleSchema.index({ organizationId: 1, code: 1 }, { unique: true });

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
