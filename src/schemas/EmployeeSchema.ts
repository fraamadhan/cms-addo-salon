import { z } from "zod";

export const UpdateEmployeeSchema = z.object({
  name: z
    .string({
      required_error: "Nama pegawai wajib diisi",
    })
    .min(1, "Nama pegawai tidak boleh kosong")
    .refine((val) => val.trim() !== "", {
      message: "Nama pegawai tidak boleh kosong",
    }),
  email: z
    .string({
      required_error: "Email pegawai wajib diisi",
    })
    .email(),
  phoneNumber: z.string().regex(/^(\+62|0)8[1-9][0-9]{6,10}$/, {
    message: "Nomor telepon bukan format nomor telepon Indonesia",
  }),
  availability: z.number(),
});
