import { z } from "zod";

export const OrderSchema = z.object({
  customerName: z.string({
    required_error: "Nama pengguna harus diisi",
  }),
  serviceName: z.string({
    required_error: "Nama layanan harus diisi",
  }),
  servicePrice: z.number({
    required_error: "Harga layanan harus diisi berupa angka",
  }),
  note: z.string().optional(),
  employeeId: z.string({
    required_error: "Pegawai harus diisi",
  }),
});
