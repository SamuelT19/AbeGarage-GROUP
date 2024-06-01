export const statusClasses = {
  1: "status-received",
  2: "status-in-progress",
  3: "status-completed",
  4: "status-canceled",
  default: "status-unknown",
};

export const statusLabels = {
  1: "Received",
  2: "In Progress",
  3: "Completed",
  4: "Canceled",
};

// export function getStatusClass(statusCode) {
//   return statusClasses[statusCode] || statusClasses.default;
// }

export function getStatusLabel(statusCode) {
  return statusLabels[statusCode] || "Unknown";
}

export const getStatusClass = (statusCode) => {
  switch (statusCode) {
    case 1:
      return "received";
    case 2:
      return "in-progress";
    case 0:
      return "completed";
    case 3:
      return "canceled";
    default:
      return "";
  }
};

export const orderStatusLabels = {
  1: "Received",
  2: "In Progress",
  0: "Completed",
  3: "Canceled",
};
