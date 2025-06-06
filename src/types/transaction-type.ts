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
  userId: string;
};
