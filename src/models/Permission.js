// models/Permission.js

import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    permissionName: {
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

    // 🔐 System permissions cannot be modified or deleted
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Prevent duplicate permission code per organization
PermissionSchema.index({ organizationId: 1, code: 1 }, { unique: true });

export default mongoose.models.Permission ||
  mongoose.model("Permission", PermissionSchema);
