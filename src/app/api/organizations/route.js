import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";

export async function POST(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug } = await req.json();

  const org = await Organization.create({ name, slug });

  // Auto assign creator as ADMIN
  await Membership.create({
    userId: session.user.id,
    organizationId: org._id,
    role: "ADMIN",
  });

  return Response.json(org);
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const memberships = await Membership.find({
    userId: session.user.id,
  }).populate("organizationId");

  const organizations = memberships.map((m) => m.organizationId);

  return Response.json({ organizations });
}
