// models/Team.js

import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate team names within same organization
TeamSchema.index({ organizationId: 1, name: 1 }, { unique: true });

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
