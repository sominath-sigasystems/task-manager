import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Membership from "@/models/Membership";

export async function GET(req) {
  try {
    await dbConnect(); // Assuming you have a `dbConnect` function for connecting to the database

    const { organizationId } = req.query;

    if (!organizationId || !mongoose.Types.ObjectId.isValid(organizationId)) {
      return NextResponse.json(
        { message: "Invalid organization ID" },
        { status: 400 },
      );
    }

    const members = await Membership.find({ organizationId });

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
