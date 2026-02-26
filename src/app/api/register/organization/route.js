import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";

import User from "@/models/User";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";
import Role from "@/models/Role";
import Permission from "@/models/Permission";
import RolePermission from "@/models/RolePermission";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password, slug, logo, address, mobile } = body;

    /* ---------------------------------------------------------
       1️⃣ Validate Required Fields
    --------------------------------------------------------- */
    if (!name || !email || !password || !slug) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const normalizedSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");

    const existingSlug = await Organization.findOne({
      slug: normalizedSlug,
    });

    if (existingSlug) {
      return NextResponse.json(
        { message: "Slug already taken" },
        { status: 400 },
      );
    }

    /* ---------------------------------------------------------
       2️⃣ Create or Find User
    --------------------------------------------------------- */
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

    /* ---------------------------------------------------------
       3️⃣ Create Organization (Tenant Root)
    --------------------------------------------------------- */
    const organization = await Organization.create({
      name,
      slug: normalizedSlug,
      logo: logo || null,
      address: address || "",
      mobile: mobile || "",
      ownerId: user._id,
    });

    /* ---------------------------------------------------------
       4️⃣ Seed Default Roles (Tenant Scoped)
    --------------------------------------------------------- */
    const roles = await Role.insertMany([
      {
        roleName: "Organization Owner",
        code: "ORGANIZATION_OWNER",
        description: "Full access to organization",
        organizationId: organization._id,
        scopeType: "ORGANIZATION",
        scopeId: null,
      },
      {
        roleName: "Member",
        code: "MEMBER",
        description: "Default member role",
        organizationId: organization._id,
        scopeType: "ORGANIZATION",
        scopeId: null,
      },
    ]);

    const ownerRole = roles.find((r) => r.code === "ORGANIZATION_OWNER");

    const memberRole = roles.find((r) => r.code === "MEMBER");

    /* ---------------------------------------------------------
       5️⃣ Seed Default Permissions (Tenant Scoped)
    --------------------------------------------------------- */
    const entities = ["organization", "project", "issue", "team"];
    const actions = ["create", "read", "update", "delete"];

    const permissionsToInsert = [];

    for (const entity of entities) {
      for (const action of actions) {
        permissionsToInsert.push({
          permissionName: `${entity} ${action}`,
          code: `${entity}_${action}`.toUpperCase(),
          description: `Allows ${action} on ${entity}`,
          organizationId: organization._id,
        });
      }
    }

    const createdPermissions = await Permission.insertMany(permissionsToInsert);

    /* ---------------------------------------------------------
       6️⃣ Assign ALL Permissions to OWNER Role
    --------------------------------------------------------- */
    const ownerRolePermissions = createdPermissions.map((permission) => ({
      roleId: ownerRole._id,
      permissionId: permission._id,
      organizationId: organization._id,
    }));

    await RolePermission.insertMany(ownerRolePermissions);

    /* ---------------------------------------------------------
       7️⃣ Assign READ Permissions to MEMBER Role
    --------------------------------------------------------- */
    const memberRolePermissions = createdPermissions
      .filter((p) => p.code.endsWith("_READ"))
      .map((permission) => ({
        roleId: memberRole._id,
        permissionId: permission._id,
        organizationId: organization._id,
      }));

    await RolePermission.insertMany(memberRolePermissions);

    /* ---------------------------------------------------------
       8️⃣ Create Membership + Assign OWNER Role to Creator
    --------------------------------------------------------- */
    await Membership.create({
      userId: user._id,
      organizationId: organization._id,
      roleId: ownerRole._id,
      status: "ACTIVE",
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
