import { z } from "zod";

export const TransactionSchema = z.object({
  customerName: z.string({
    required_error: "Nama pengguna harus diisi",
  }),
  employeeId: z.string({
    required_error: "Pegawai harus diisi",
  }),
  transactionType: z.string({
    required_error: "Tipe transaksi harus diisi",
  }),
  reservationDate: z.string({
    required_error: "Jadwal pesanan harus diisi",
  }),
  status: z.string({
    required_error: "Status harus diisi",
  }),
  productId: z.string({
    required_error: "Layanan harus diisi",
  }),
  paymentMethod: z.string({
    required_error: "Metode pembayaran harus diisi",
  }),
  bank: z.string().nullish(),
});
