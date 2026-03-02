import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Role from "@/models/Role";
import Permission from "@/models/Permission";
import RolePermission from "@/models/RolePermission";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      roleName,
      code,
      description,
      organizationId,
      scopeType,
      scopeId,
      permissions,
    } = body;

    if (!roleName || !code || !organizationId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Create Role
      const role = await Role.create(
        [
          {
            roleName,
            code,
            description,
            organizationId,
            scopeType: scopeType || "ORGANIZATION",
            scopeId: scopeId || null,
          },
        ],
        { session },
      );

      const createdRole = role[0];

      // 2️⃣ If permissions provided
      if (permissions && permissions.length > 0) {
        // Find permission documents by code
        const permissionDocs = await Permission.find({
          organizationId,
          code: { $in: permissions },
        }).session(session);

        if (permissionDocs.length !== permissions.length) {
          throw new Error("Some permissions not found");
        }

        const rolePermissionDocs = permissionDocs.map((perm) => ({
          roleId: createdRole._id,
          permissionId: perm._id,
          organizationId,
        }));

        await RolePermission.insertMany(rolePermissionDocs, { session });
      }

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        {
          message: "Role created successfully",
          role: createdRole,
        },
        { status: 201 },
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error creating role:", error);

    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json(
        { message: "organizationId is required" },
        { status: 400 },
      );
    }

    // 1️⃣ Get all roles for organization
    const roles = await Role.find({ organizationId })
      .sort({ createdAt: -1 })
      .lean();

    if (!roles.length) {
      return NextResponse.json({ roles: [] });
    }

    const roleIds = roles.map((r) => r._id);

    // 2️⃣ Get all role-permissions for these roles
    const rolePermissions = await RolePermission.find({
      organizationId,
      roleId: { $in: roleIds },
    })
      .populate("permissionId")
      .lean();

    // 3️⃣ Attach permissions to roles
    const roleMap = {};

    roles.forEach((role) => {
      roleMap[role._id] = {
        ...role,
        permissions: [],
      };
    });

    rolePermissions.forEach((rp) => {
      if (rp.permissionId && roleMap[rp.roleId]) {
        roleMap[rp.roleId].permissions.push({
          _id: rp.permissionId._id,
          code: rp.permissionId.code,
          permissionName: rp.permissionId.permissionName,
          description: rp.permissionId.description,
        });
      }
    });

    const finalRoles = Object.values(roleMap);

    return NextResponse.json({
      roles: finalRoles,
      total: finalRoles.length,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);

    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 },
    );
  }
}
