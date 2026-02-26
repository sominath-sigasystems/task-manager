import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    logo: {
      type: String, // URL or storage reference
      default: null,
    },

    address: {
      type: String,
      default: null,
    },

    mobile: {
      type: String,
      default: null,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

OrganizationSchema.index({ slug: 1 }, { unique: true });

export default mongoose.models.Organization ||
  mongoose.model("Organization", OrganizationSchema);
