import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";
import Role from "@/models/Role";
import Permission from "@/models/Permission";
import RolePermission from "@/models/RolePermission";

/**
 * POST /api/register/organization
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

    // Check slug
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

    // ----------------------------
    // CREATE DEFAULT ROLES
    // ----------------------------

    const roles = await Role.insertMany([
      {
        roleName: "Organization Owner",
        code: "organization_owner",
        description: "Full access to organization",
        organizationId: organization._id,
      },
      {
        roleName: "Member",
        code: "member",
        description: "Default member role",
        organizationId: organization._id,
      },
    ]);

    const ownerRole = roles.find((r) => r.code === "organization_owner");

    // ----------------------------
    // CREATE DEFAULT PERMISSIONS
    // ----------------------------
    const entities = ["organization", "project", "issue", "core_entity"];

    const actions = ["create", "read", "update", "delete"];

    const permissionsToInsert = [];

    for (const entity of entities) {
      for (const action of actions) {
        permissionsToInsert.push({
          permissionName: `${entity} ${action}`,
          code: `${entity}_${action}`,
          description: `Allows ${action} on ${entity}`,
          organizationId: organization._id,
        });
      }
    }
    debugger;
    const createdPermissions = await Permission.insertMany(permissionsToInsert);
    // ----------------------------
    // ASSIGN ALL PERMISSIONS TO OWNER ROLE
    // ----------------------------

    const rolePermissions = createdPermissions.map((permission) => ({
      roleId: ownerRole._id,
      permissionId: permission._id,
      organizationId: organization._id,
    }));

    await RolePermission.insertMany(rolePermissions);

    // ----------------------------
    // CREATE MEMBERSHIP
    // ----------------------------

    await Membership.create({
      userId: user._id,
      organizationId: organization._id,
      roleId: ownerRole._id,
      status: "approved",
    });

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
