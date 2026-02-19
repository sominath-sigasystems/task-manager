// models/RolePermission.js

import mongoose from "mongoose";

const RolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
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

// Prevent duplicate role-permission per organization
RolePermissionSchema.index(
  { roleId: 1, permissionId: 1, organizationId: 1 },
  { unique: true },
);

export default mongoose.models.RolePermission ||
  mongoose.model("RolePermission", RolePermissionSchema);
