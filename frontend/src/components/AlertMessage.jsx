function AlertMessage({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
  };

  return <div className={styles[type]}>{message}</div>;
}

export default AlertMessage;