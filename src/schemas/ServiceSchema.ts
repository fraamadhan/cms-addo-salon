import { z } from "zod";

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg", "image/webp"];

export const ServiceSchema = z.object({
  name: z.string({
    required_error: "Nama pengguna harus diisi",
  }),
  description: z
    .string({
      required_error: "Email pengguna harus diisi berupa email",
    })
    .max(1500, "Maksimal deskripsi produk 1500 karakter"),
  estimation: z
    .number({
      required_error: "Estimasi harus berupa angka",
    })
    .min(1, "Estimasi waktu layanan minimal 1 jam"),
  category: z.string({
    required_error: "Kategori utama harus diisi",
  }),
  subCategory: z.string().nullish(),
  price: z
    .number({
      required_error: "Harga tidak boleh kosong",
    })
    .min(0, "Harga tidak boleh kurang darii 0"),
  type: z.string({
    required_error: "Tipe tidak boleh kosong",
  }),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Gambar melebihi 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Hanya mendukung gambar dengan format .jpg, .jpeg, dan .png")
    .optional(),
});
