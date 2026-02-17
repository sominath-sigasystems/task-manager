import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import Organization from "@/models/Organization";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await dbConnect();

  const org = await Organization.findOne({
    ownerId: session.user.id,
  }).lean();

  return Response.json({ organization: org });
}
