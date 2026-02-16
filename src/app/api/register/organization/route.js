import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";

/**
 * POST /api/register/organization
 * Creates user (if not exists) + organization + membership
 */
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password, slug, logo, address, mobile } = body;

    if (!name || !email || !password || !slug) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const normalizedSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");

    // Check slug first
    const existingSlug = await Organization.findOne({ slug: normalizedSlug });
    if (existingSlug) {
      return NextResponse.json(
        { message: "Slug already taken" },
        { status: 400 },
      );
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 12);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        image: logo || null,
      });
    }

    // Create organization
    const organization = await Organization.create({
      name,
      slug: normalizedSlug,
      logo: logo || null,
      address: address || "",
      mobile: mobile || "",
      ownerId: user._id,
    });

    // Ensure membership doesn't duplicate
    const existingMembership = await Membership.findOne({
      userId: user._id,
      organizationId: organization._id,
    });

    if (!existingMembership) {
      await Membership.create({
        userId: user._id,
        organizationId: organization._id,
        role: "organization_owner", // must match enum
        status: "approved",
      });
    }

    return NextResponse.json(
      {
        message: "Organization created successfully",
        organization: {
          id: organization._id,
          slug: organization.slug,
        },
      },
      { status: 201 },
    ); 
  } catch (error) {
    console.error("Organization register error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

