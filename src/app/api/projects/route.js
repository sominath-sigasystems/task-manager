import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, description } = await req.json();

  const project = await Project.create({
    name,
    description,
    owner: session.user.id,
    members: [session.user.id],
  });

  return NextResponse.json(project);
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const projects = await Project.find({
    members: session.user.id,
  });

  return NextResponse.json(projects);
}
