import { z } from "zod";

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg", "image/webp"];

export const UserSchema = z.object({
  name: z
    .string({
      required_error: "Nama pengguna harus diisi",
    })
    .refine((val) => val.trim() !== "", {
      message: "Nama pengguna tidak boleh kosong",
    }),
  email: z
    .string({
      required_error: "Email pengguna harus diisi berupa email",
    })
    .email(),
  gender: z.string().nonempty("Jenis kelamin pengguna tidak boleh kosong"),
  phone_number: z.string().regex(/^(\+62|0)8[1-9][0-9]{6,10}$/, {
    message: "Nomor telepon bukan format nomor telepon Indonesia",
  }),
  address: z.string().refine((val) => val.trim() !== "", {
    message: "Alamat pengguna tidak boleh kosong",
  }),
  birth_date: z.string(),
  role: z.string().nonempty("Role pengguna tidak boleh kosong"),
  is_verified: z.boolean(),
  email_verified_at: z.string().nullish(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Gambar melebihi 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Hanya mendukung gambar dengan format .jpg, .jpeg, dan .png")
    .optional(),
  asset: z
    .object({
      _id: z.string().nullish(),
      publicUrl: z.string().nullish(),
    })
    .nullish(),
});

export const AddUserSchema = z.object({
  name: z
    .string({
      required_error: "Nama pengguna harus diisi",
    })
    .refine((val) => val.trim() !== "", {
      message: "Nama pengguna tidak boleh kosong",
    }),
  email: z
    .string({
      required_error: "Email pengguna harus diisi berupa email",
    })
    .email(),
  gender: z.string().nonempty("Jenis kelamin pengguna tidak boleh kosong"),
  phone_number: z.string().regex(/^(\+62|0)8[1-9][0-9]{6,10}$/, {
    message: "Nomor telepon bukan format nomor telepon Indonesia",
  }),
  address: z.string().refine((val) => val.trim() !== "", {
    message: "Alamat pengguna tidak boleh kosong",
  }),
  birth_date: z.string(),
  role: z.string().nonempty("Role pengguna tidak boleh kosong"),
  is_verified: z.boolean(),
  email_verified_at: z.string().nullish(),
  file: z
    .instanceof(File, { message: "File harus berupa gambar" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Gambar melebihi 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Hanya mendukung gambar dengan format .jpg, .jpeg, dan .png")
    .optional(),
  password: z
    .string({
      invalid_type_error: "Panjang kata sandi minimal 8 karakter",
    })
    .min(8, {
      message: "Panjang kata sandi minimal 8 karakter",
    })
    .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(password), {
      message: "Kata sandi terlalu lemah",
    }),
});

export const UpdatePasswordUserSchema = z
  .object({
    role: z.string().nullish(),
    password: z
      .string({
        invalid_type_error: "Panjang kata sandi minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi minimal 8 karakter",
      })
      .refine((password) => /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password), {
        message: "Kata sandi terlalu lemah",
      }),
    confirmPassword: z
      .string({
        required_error: "Kata sandi tidak boleh kosong",
        invalid_type_error: "Panjang kata sandi minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi minimal 8 karakter",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Konfirmasi kata sandi tidak cocok",
      });
    }
  });
