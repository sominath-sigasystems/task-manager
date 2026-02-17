import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";
import JoinRequest from "@/models/JoinRequest";
import { log } from "node:console";

export async function POST(req) {
  try {
    await dbConnect();
    console.log(authOptions);

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug } = await req.json();

    if (!name?.trim() || !slug?.trim()) {
      return Response.json(
        { error: "Name and slug are required" },
        { status: 400 },
      );
    }

    // Prevent duplicate slug
    const existing = await Organization.findOne({ slug });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 409 });
    }

    const org = await Organization.create({
      name: name.trim(),
      slug: slug.trim(),
    });

    // Assign creator as owner
    await Membership.create({
      userId: session.user.id,
      organizationId: org._id,
      role: "organization_owner",
    });

    return Response.json({ organization: org }, { status: 201 });
  } catch (error) {
    console.error("Create organization error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ================================
// Get All Organizations with Status
// ================================
export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
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
