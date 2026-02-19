// models/Permission.js

import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    permissionName: {
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

// Prevent duplicate permission code per organization
PermissionSchema.index({ organizationId: 1, code: 1 }, { unique: true });

export default mongoose.models.Permission ||
  mongoose.model("Permission", PermissionSchema);
