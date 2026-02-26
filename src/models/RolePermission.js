// models/RolePermission.js

import mongoose from "mongoose";

const RolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true,
    },

    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate permission assignment to same role
RolePermissionSchema.index({ roleId: 1, permissionId: 1 }, { unique: true });

export default mongoose.models.RolePermission ||
  mongoose.model("RolePermission", RolePermissionSchema);
