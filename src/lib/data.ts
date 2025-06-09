export const orderStatus = [{ status: "COMPLETED" }, { status: "CANCELED" }, { status: "SCHEDULED" }, { status: "IN_PROGRESS" }, { status: "UNPAID" }];
export const transactionStatus = [{ status: "COMPLETED" }, { status: "CANCELED" }, { status: "SCHEDULED" }, { status: "PAID" }, { status: "EXPIRED" }];
export const paymentMethods = [{ value: "cash" }, { value: "bank_transfer" }, { value: "gopay" }, { value: "qris" }];

export const paymentMethodLabels: Record<string, string> = {
  cash: "Tunai",
  bank_transfer: "Bank Transfer",
  gopay: "GoPay",
  qris: "QRIS",
};

export const statusLabels: Record<string, string> = {
  COMPLETED: "Selesai",
  SCHEDULED: "Terjadwal",
  CANCELED: "Dibatalkan",
  PAID: "Sudah dibayar",
  EXPIRED: "Kedaluwarsa",
};
