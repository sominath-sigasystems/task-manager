import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";

export async function GET(req, { params }) {
  await dbConnect();

  const org = await Organization.findById(params.id);

  if (!org) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(org);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const membership = await Membership.findOne({
    userId: session.user.id,
    organizationId: params.id,
    role: "ADMIN",
  });

  if (!membership)
    return Response.json({ error: "Forbidden" }, { status: 403 });

  const update = await req.json();

  const org = await Organization.findByIdAndUpdate(params.id, update, {
    new: true,
  });

  return Response.json(org);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const membership = await Membership.findOne({
    userId: session.user.id,
    organizationId: params.id,
    role: "ADMIN",
  });

  if (!membership)
    return Response.json({ error: "Forbidden" }, { status: 403 });

  await Organization.findByIdAndDelete(params.id);

  return Response.json({ success: true });
}
