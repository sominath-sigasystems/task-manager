import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or cloud storage path
      default: null,
    },
    onboardingStatus: {
      type: String,
      enum: ["REGISTERED", "PLAN_SELECTED", "PAID", "SETUP_COMPLETED"],
      default: "REGISTERED",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
