function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();

  return (
    <span className={normalizedStatus === "active" ? "badge-active" : "badge-inactive"}>
      {status}
    </span>
  );
}

export default StatusBadge;