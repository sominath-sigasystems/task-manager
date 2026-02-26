// lib/permission.js
import Membership from "@/models/Membership";
import RolePermission from "@/models/RolePermission";
import Permission from "@/models/Permission";
import Role from "@/models/Role";

export async function hasPermission({
  userId,
  organizationId,
  permissionCode,
  teamId = null,
  projectId = null,
}) {
  // 1️⃣ Get membership (user role in org)
  const membership = await Membership.findOne({
    userId,
    organizationId,
    status: "approved",
  });

  if (!membership) return false;

  const role = await Role.findById(membership.roleId);
  if (!role) return false;

  // 2️⃣ Scope check
  if (
    role.scopeType === "TEAM" &&
    role.scopeId?.toString() !== teamId?.toString()
  ) {
    return false;
  }

  if (
    role.scopeType === "PROJECT" &&
    role.scopeId?.toString() !== projectId?.toString()
  ) {
    return false;
  }

  // 3️⃣ Get permission
  const permission = await Permission.findOne({
    organizationId,
    code: permissionCode,
  });

  if (!permission) return false;

  // 4️⃣ Check role-permission mapping
  const rolePermission = await RolePermission.findOne({
    roleId: role._id,
    permissionId: permission._id,
    organizationId,
  });

  return !!rolePermission;
}
