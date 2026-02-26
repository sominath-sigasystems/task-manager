import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import JoinRequest from "@/models/JoinRequest";
import Membership from "@/models/Membership";


export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Read request body (ONLY once)
    const { requestId, status } = await req.json();

    // Basic validation
    if (!requestId || !status) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return NextResponse.json(
        { message: "Invalid request ID" },
        { status: 400 },
      );
    }

    // Validate allowed statuses
    const allowedStatuses = ["approved", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 },
      );
    }

    // Fetch join request with organization populated
    const joinRequest = await JoinRequest.findById(requestId)
      .populate("organizationId")
      .lean();

    if (!joinRequest) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 },
      );
    }

    const organization = joinRequest.organizationId;

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 },
      );
    }

    // Authorization: only organization owner
    if (organization.ownerId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Atomic update to prevent double processing
    const result = await JoinRequest.updateOne(
      { _id: requestId, status: "pending" },
      { $set: { status } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Request already processed" },
        { status: 409 },
      );
    }

    if (status === "approved") {
      try {
        // Fetch MEMBER role for this organization
        const memberRole = await Role.findOne({
          organizationId: organization._id,
          code: "MEMBER",
        });

        if (!memberRole) {
          throw new Error("Default MEMBER role not found");
        }

        // Create membership using roleId (ObjectId reference)
        await Membership.create({
          userId: joinRequest.userId,
          organizationId: organization._id,
          roleId: memberRole._id,
          status: "approved",
        });
      } catch (err) {
        // Duplicate entry error is fine if membership already exists
        if (err.code === 11000) {
          console.warn("Membership already exists:", err.message);
        } else {
          console.error("Error creating membership:", err);
          return NextResponse.json(
            { message: "Failed to add user to organization" },
            { status: 500 },
          );
        }
      }
    }
    return NextResponse.json({
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Join request update error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
