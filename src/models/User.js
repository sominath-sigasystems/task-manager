import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
  organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      index: true,
    },
    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    onboardingStatus: {
      type: String,
      enum: ["REGISTERED", "PLAN_SELECTED", "PAID", "SETUP_COMPLETED"],
      default: "REGISTERED",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
