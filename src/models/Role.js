// models/Role.js

import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: null,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    scopeType: {
      type: String,
      enum: ["ORGANIZATION", "TEAM", "PROJECT"],
      default: "ORGANIZATION",
      required: true,
    },

    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      validate: {
        validator: function (value) {
          if (this.scopeType === "ORGANIZATION") return value === null;
          return mongoose.Types.ObjectId.isValid(value);
        },
        message:
          "scopeId must be null for ORGANIZATION scope and required for TEAM/PROJECT",
      },
    },
  },
  { timestamps: true },
);

// Unique role per organization + scope
RoleSchema.index(
  { organizationId: 1, code: 1, scopeType: 1, scopeId: 1 },
  { unique: true },
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
