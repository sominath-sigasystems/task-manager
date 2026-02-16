import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import Membership from "@/models/Membership";

export async function POST(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await Membership.findOne({
    userId: session.user.id,
    organizationId: params.id,
  });

  if (existing)
    return Response.json({ error: "Already a member" }, { status: 400 });

  await Membership.create({
    userId: session.user.id,
    organizationId: params.id,
    role: "MEMBER",
  });

  return Response.json({ success: true });
}
