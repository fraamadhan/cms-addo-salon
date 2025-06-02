import { z } from "zod";

export const UpdateEmployeeSchema = z.object({
  name: z.string({
    required_error: "Nama pegawai wajib diisi",
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
