import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import Membership from "@/models/Membership";
import JoinRequest from "@/models/JoinRequest";
import Role from "@/models/Role";

export async function POST(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;
    const { organizationId } = await req.json();

    if (!organizationId)
      return Response.json(
        { error: "Organization ID required" },
        { status: 400 },
      );

  

    const role = await Role.findOne({
      organizationId: organizationId,
      code: "MEMBER",
    });

    de
    const membership = await Membership.findOne({
      userId,
      organizationId
    });

    if (membership)
      return Response.json({ error: "Already a member" }, { status: 409 });

    // Already requested?
    const existingRequest = await JoinRequest.findOne({
      userId,
      organizationId,
      status: "pending",
    });

    if (existingRequest)
      return Response.json(
        { error: "Request already pending" },
        { status: 409 },
      );

     
    await JoinRequest.create({
      userId,
      organizationId,
      
    });

    return Response.json(
      { message: "Join request submitted" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
