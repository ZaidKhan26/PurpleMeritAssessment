function RoleBadge({ role }) {
  const normalizedRole = role?.toLowerCase();

  const className =
    normalizedRole === "admin"
      ? "badge-admin"
      : normalizedRole === "manager"
      ? "badge-manager"
      : "badge-user";

  return <span className={className}>{role}</span>;
}

export default RoleBadge;