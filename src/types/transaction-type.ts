export type TransactionResponseItem = {
  _id: string;
  reservationDate: string;
  note: string;
  price: number;
  transactionId: string;
  serviceStatus: string;
  transaction: TransactionItem;
  product: TransactionProductItem;
  user: TransactionUserItem;
  employee: TransactionEmployeeItem;
};

export type TransactionHistoryResponseItem = {
  _id: string;
  status: string;
  orderCode: string;
  customerName?: string | null;
  items: HistoryItem[];
  user: TransactionUserItem;
  createdAt: string;
  transactionType?: string;
  bank?: string | null;
  paymentMethod?: string;
};

export type HistoryItem = {
  _id: string;
  reservationDate: string;
  serviceStatus: string;
  price: number;
  note: string;
  product: TransactionProductItem;
  employee: TransactionEmployeeItem;
};

export type TransactionItem = {
  _id: string;
  orderCode: string;
  status: string;
};

export type TransactionProductItem = {
  _id: string;
  name: string;
  price: number;
  assetRef: string;
  estimation: number;
};

export type TransactionUserItem = {
  _id: string;
  name: string;
  email?: string;
  phone_number?: string;
  customerName: string;
};

export type TransactionEmployeeItem = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

export type OrderForm = {
  customerName: string;
  employeeId: string;
};

export type UpdateScheduleBody = {
  reservationDate: string;
  estimation: number;
};

export type UpdateOrderForm = {
  customerName: string;
  serviceName: string;
  servicePrice: number;
  note: string;
  employeeId: string;
};

export type AddTransactionForm = {
  customerName: string;
  orderCode?: string;
  employeeId: string;
  transactionType: string;
  reservationDate: string;
  status: string;
  productId: string;
  paymentMethod: string;
  bank?: string;
};
