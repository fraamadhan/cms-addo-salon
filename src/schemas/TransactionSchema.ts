import { z } from "zod";

export const TransactionSchema = z.object({
  customerName: z
    .string({
      required_error: "Nama pengguna harus diisi",
    })
    .refine((val) => val.trim() !== "", {
      message: "Nama pengguna tidak boleh kosong",
    }),
  employeeId: z
    .string({
      required_error: "Pegawai harus diisi",
    })
    .min(1, "Pegawai harus dipilih"),
  transactionType: z
    .string({
      required_error: "Tipe transaksi harus diisi",
    })
    .min(1, "Tipe transaksi harus dipilih"),
  reservationDate: z
    .string({
      required_error: "Jadwal pesanan harus diisi",
    })
    .refine((val) => val.trim() !== "", {
      message: "Jadwal pesanan tidak boleh kosong",
    }),
  status: z
    .string({
      required_error: "Status harus diisi",
    })
    .min(1, "Status transaksi harus dipilih"),
  productId: z
    .string({
      required_error: "Layanan harus diisi",
    })
    .min(1, "Layanan harus dipilih"),
  paymentMethod: z
    .string({
      required_error: "Metode pembayaran harus diisi",
    })
    .min(1, "Metode pembayaran harus dipilih"),
  bank: z.string().nullish(),
});
