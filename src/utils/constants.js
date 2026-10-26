export const USER_ROLES = {
  CUSTOMER: "Customer",
  PROVIDER: "Service Provider",
  ADMIN: "Administrator"
};

export const BOOKING_STATUSES = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  DISPUTED: "Disputed"
};

export const PAYMENT_STATUSES = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SUCCESSFUL: "Successful",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially Refunded"
};

export const PAYMENT_METHODS = {
  CARD: "Card",
  BANK_TRANSFER: "Bank Transfer",
  WALLET: "Wallet",
  CASH: "Cash",
  OTHER: "Other"
};

export const EARNINGS_STATUSES = {
  PENDING: "Pending",
  CALCULATED: "Calculated",
  CONFIRMED: "Confirmed",
  AVAILABLE: "Available",
  ON_HOLD: "On Hold",
  PARTIALLY_ADJUSTED: "Partially Adjusted",
  ADJUSTED: "Adjusted",
  REVERSED: "Reversed",
  PAID_OUT: "Paid Out"
};

export const PAYOUT_STATUSES = {
  PENDING: "Pending",
  AWAITING_APPROVAL: "Awaiting Approval",
  APPROVED: "Approved",
  PROCESSING: "Processing",
  SUCCESSFUL: "Successful",
  FAILED: "Failed",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
  REQUIRES_REVIEW: "Requires Review",
  REVERSED: "Reversed"
};

export const DISPUTE_STATUSES = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  IN_INVESTIGATION: "In Investigation",
  ESCALATED: "Escalated",
  RESOLVED: "Resolved",
  CLOSED: "Closed"
};

export const DISPUTE_CATEGORIES = {
  SERVICE_QUALITY: "Service Quality",
  INCOMPLETE_DELIVERY: "Incomplete Service Delivery",
  SCHEDULING_OR_ATTENDANCE: "Scheduling or Attendance",
  PAYMENT_ISSUES: "Payment-related Issues",
  DESCRIPTION_MISMATCH: "Service Description or Expectation Mismatch",
  OTHER: "Other"
};

export const NOTIFICATION_CHANNELS = {
  IN_APP: "In-App",
  PUSH: "Push",
  EMAIL: "Email",
  SMS: "SMS"
};
