'use client'

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import Button from "../button/Button"
import Image from "next/image"
import { AddUserSchema } from "@/schemas/UserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useCreateUser } from "@/services/userService"
import { HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { getAccessToken } from "@/lib/token"

export const AddUserForm = () => {

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const isShowPassword = showPassword ? "text" : "password";

    const IconA = showPassword ? EyeOffIcon : EyeIcon;

    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof AddUserSchema>>({
        resolver: zodResolver(AddUserSchema),
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
            gender: "",
            address: "",
            birth_date: "",
            role: "",
            is_verified: false,
            email_verified_at: "2000-01-01",
            file: undefined
        },
    })

    const handleShowPasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setValue("file", file);
            setImagePreview(previewUrl);
        }
    }

    const onSubmit = (data: z.infer<typeof AddUserSchema>) => {

        const formData = new FormData();
        const { file } = data;

        if (file) {
            formData.append('file', file);
        }
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('phone_number', data.phone_number);
        formData.append('address', data.address);
        formData.append('birth_date', data.birth_date);
        formData.append('role', data.role);
        formData.append('is_verified', String(data.is_verified));
        formData.append('email_verified_at', data.email_verified_at);
        formData.append('gender', data.gender)

        mutation.mutate({ token, body: formData })
    }

    const mutation = useCreateUser({
        onSuccess: (data) => {
            if (data?.status !== HttpStatusCode.Created) {
                toast.error(data.message || "Gagal menambah data pengguna")
                return;
            }
            else {
                toast.success("Berhasil menambah data pengguna", {
                    duration: 1500,
                })
                queryClient.invalidateQueries({ queryKey: ["getUsers"] })
                queryClient.invalidateQueries({ queryKey: ["getUser"] })
                router.replace('/dashboard/user')
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message || "Gagal menambah data pengguna")
            return;
        }
    })

    const onCancel = () => {
        reset({
            name: "",
            email: "",
            phone_number: "",
            gender: "",
            address: "",
            birth_date: "",
            role: "",
            is_verified: false,
            email_verified_at: "",
            file: undefined
        })
        setImagePreview('/si.svg')
    }

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Maaf sesi anda sudah habis. Silakan login kembali")
            return;
        }
        setToken(token);
    }, [])

    return (
        <section className="flex flex-col w-full gap-y-7">
            <form className="w-full flex flex-col p-7 border shadow-xl rounded-xl gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                {Object.keys(errors).length > 0 && (
                    <div className="text-red-500">
                        Masukkan ada yang salah:
                        <ul className="list-disc ml-5">
                            {Object.entries(errors).map(([key, value]) => (
                                <li key={key}>{key}: {value?.message as string}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Image */}
                <div className="flex flex-col items-center justify-center w-full gap-y-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden relative flex-shrink-0 p-3 bg-gray-100">
                        <Image
                            src={imagePreview || "/si.svg"}
                            alt="Foto profil pengguna"
                            fill
                            sizes="192px"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-sm text-red-500">Maksimal ukuran gambar 5MB</p>
                    <label
                        htmlFor="file"
                        className="w-[8rem] bg-gold-500 p-2 rounded-md shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ease-in-out transition delay-150 duration-200 relative text-center">
                        Pilih Foto
                    </label>
                    <input
                        {...register("file")}
                        type="file"
                        name="file"
                        id="file"
                        aria-label="tombol ubah foto profile"
                        className="w-fit hidden"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-y-3">
                    {/* name */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="name" className="w-[10rem]">Nama</label>
                        <input type="text" {...register("name")} id="name" placeholder="Masukkan nama pengguna" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[18rem]" required />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message} </p>}

                    {/* email */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="email" className="w-[10rem]">Email</label>
                        <input type="text" {...register("email")} id="email" placeholder="Masukkan email pengguna" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[18rem]"
                            required />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message} </p>}

                    {/* password */}
                    <div className="flex items-center gap-x-3 relative">
                        <label htmlFor="password" className="w-[10rem]">Password</label>
                        <div className="relative flex items-center w-[18rem]">
                            <input type={isShowPassword} {...register("password")} id="password" placeholder="Masukkan kata sandi pengguna" className="peer focus:outline-none p-2 pr-10 bg-white border-2 border-gold-500 rounded-lg w-[18rem]"
                                required />
                            <span className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                                <IconA onClick={handleShowPasswordToggle} />
                            </span>
                        </div>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message} </p>}

                    {/* phone number */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="phone_number" className="w-[10rem]">No telepon</label>
                        <input
                            {...register("phone_number")}
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            placeholder="08787281929"
                            className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem] border-gold-500"
                            pattern="^(\+62|0)8[1-9][0-9]{6,10}$"
                            required
                        />
                    </div>
                    {errors.phone_number && <p className="text-red-500 text-sm mb-2">{errors.phone_number.message} </p>}

                    {/* role */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="role" className="w-[10rem]">
                            Role
                        </label>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        className="w-[18rem] focus:outline-none border-gold-500 border-2"
                                    >
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent className="w-[18rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                                        <SelectItem className="p-1" value="USER">USER</SelectItem>
                                        <SelectItem className="p-1" value="ADMIN">ADMIN</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {errors.role && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.role.message}
                        </p>
                    )}

                    {/* gender */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="role" className="w-[10rem]">
                            Jenis kelamin
                        </label>
                        <Controller
                            control={control}
                            name="gender"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        className="w-[18rem] focus:outline-none border-gold-500 border-2"
                                    >
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent className="w-[18rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                                        <SelectItem className="p-1" value="male">Laki-laki</SelectItem>
                                        <SelectItem className="p-1" value="female">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {errors.gender && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.gender.message}
                        </p>
                    )}

                    {/* address */}
                    <div className="flex items-start gap-x-3">
                        <label htmlFor="address" className="w-[10rem]">Alamat</label>
                        <textarea
                            {...register("address")}
                            name="address"
                            id="address"
                            cols={30}
                            rows={3}
                            className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem] border-gold-500"
                            required
                            placeholder="Jl. Neverland Raya No. 07 Blok C RT 07 RW 07">
                        </textarea>
                    </div>
                    {errors.address && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.address.message}
                        </p>
                    )}

                    {/* birth date */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="birth_date" className="w-[10rem]">Tanggal Lahir</label>
                        <input
                            {...register("birth_date")}
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem] border-gold-500"
                            required
                        />
                    </div>
                    {errors.birth_date && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.birth_date.message}
                        </p>
                    )}

                    {/* is verified */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="role" className="w-[10rem]">
                            Sudah Diverifikasi
                        </label>
                        <Controller
                            control={control}
                            name="is_verified"
                            render={({ field }) => (
                                <Select
                                    value={String(field.value)}
                                    onValueChange={(val) => field.onChange(val === 'true')}
                                >
                                    <SelectTrigger
                                        className="w-[18rem] focus:outline-none border-gold-500 border-2"
                                    >
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent className="w-[18rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                                        <SelectItem className="p-1" value="true">Sudah</SelectItem>
                                        <SelectItem className="p-1" value="false">Belum</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {errors.is_verified && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.is_verified.message}
                        </p>
                    )}

                    {/* email verified at */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="email_verified_at" className="w-[10rem]">Tanggal Diverifikasi</label>
                        <input
                            {...register("email_verified_at")}
                            type="date"
                            name="email_verified_at"
                            id="email_verified_at"
                            className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem] border-gold-500"
                            required
                        />
                    </div>
                    {errors.email_verified_at && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.email_verified_at.message}
                        </p>
                    )}
                </div>
                <div className="flex justify-end gap-2 mt-3 w-full">
                    <Button type="button" onClick={onCancel} className="px-4 py-2 w-[15rem] text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                        Reset
                    </Button>
                    {
                        mutation.isPending ? (
                            <Button type="button" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded" disabled>
                                <Loader2Icon className="animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                                Simpan
                            </Button>
                        )
                    }
                </div>
            </form>
        </section>
    )
}
