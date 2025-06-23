import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .email({
      message: "Masukkan harus berupa email",
    }),
  password: z
    .string({
      required_error: "Kata sandi harus diisi",
    })
    .min(8, "Panjang kata sandi minimal 8 karakter"),
});
