import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions"; // ✅ IMPORTANT
import Organization from "@/models/Organization";
import JoinRequest from "@/models/JoinRequest";


export async function GET(req) {
  try {
    await dbConnect();

    // ✅ MUST pass authOptions
    const session = await getServerSession(authOptions);

    console.log("SESSION IN API:", session);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId || !mongoose.Types.ObjectId.isValid(organizationId)) {
      return NextResponse.json(
        { message: "Invalid organization id" },
        { status: 400 }
      );
    }

    // 1️⃣ Verify organization exists
    const organization = await Organization.findById(organizationId).lean();

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Verify current user is owner
    if (organization.ownerId.toString() !== session.user.id) {
      return NextResponse.json(
        { message: "Forbidden: Not organization owner" },
        { status: 403 }
      );
    }

    // 3️⃣ Fetch pending join requests
    const requests = await JoinRequest.find({
      organizationId,
      status: "pending",
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ requests }, { status: 200 });

  } catch (error) {
    console.error("Pending request error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
