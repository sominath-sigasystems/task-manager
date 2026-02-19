import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";
import JoinRequest from "@/models/JoinRequest";

// ================================
// Get All Organizations with Status
// ================================
export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    console.log(session);

    
    if (!session) {
      debugger;
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const organizations = await Organization.find().lean();

    const memberships = await Membership.find({
      userId,
    }).lean();

    const joinRequests = await JoinRequest.find({
      userId,
      status: "pending",
    }).lean();

    const result = organizations.map((org) => {
      const isMember = memberships.some(
        (m) => m.organizationId.toString() === org._id.toString(),
      );

      const isPending = joinRequests.some(
        (r) => r.organizationId.toString() === org._id.toString(),
      );

      return {
        id: org._id,
        name: org.name,
        slug: org.slug,
        membershipStatus: isMember ? "member" : isPending ? "pending" : "none",
      };
    });

    return Response.json({ organizations: result });
  } catch (error) {
    console.error("Get organizations error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
