// models/UserRole.js

import mongoose from "mongoose";

/*
 ⚠️ DEPRECATED MODEL

 This model is being phased out.

 Membership model now handles:
 - user
 - organization
 - role
 - status

 Do NOT use this model for new logic.
 It exists only for backward compatibility.
*/

const UserRoleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
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

UserRoleSchema.index(
  { userId: 1, roleId: 1, organizationId: 1 },
  { unique: true },
);

export default mongoose.models.UserRole ||
  mongoose.model("UserRole", UserRoleSchema);
