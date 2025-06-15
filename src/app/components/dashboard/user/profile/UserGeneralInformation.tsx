'use client'

import Button from "@/app/components/button/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { birthDateFormater } from "@/lib/general";
import { UserSchema } from "@/schemas/UserSchema";
import { UserItemResponse } from "@/types/user-type"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Image from "next/image"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';

export const UserGeneralInformation = (
    {
        user,
        isLoading,
        isPending,
        onSubmit,
    }:
        {
            user: UserItemResponse,
            isLoading: boolean,
            isPending: boolean,
            onSubmit: (data: z.infer<typeof UserSchema>) => void,
        }
) => {

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
            gender: "",
            address: "",
            birth_date: "",
            role: "",
            is_verified: true,
            email_verified_at: "",
            file: undefined
        },
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setValue("file", file);
            setImagePreview(previewUrl);
        }
    }

    const onCancel = () => {
        reset({
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone_number: user?.phone_number ?? "",
            gender: user?.gender ?? "",
            address: user?.address ?? "",
            birth_date: birthDateFormater(user?.birth_date) ?? "",
            role: user?.role ?? "",
            is_verified: user?.is_verified ?? false,
            email_verified_at: birthDateFormater(user?.email_verified_at) ?? "",
            file: undefined
        })
        setImagePreview(user?.asset?.publicUrl ?? '/si.svg')
    }

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name ?? "",
                email: user?.email ?? "",
                phone_number: user?.phone_number ?? "",
                gender: user?.gender ?? "",
                address: user?.address ?? "",
                birth_date: birthDateFormater(user?.birth_date) ?? "",
                role: user?.role ?? "",
                is_verified: user?.is_verified ?? false,
                email_verified_at: birthDateFormater(user?.email_verified_at) ?? "",
                file: undefined
            })
            setImagePreview(user?.asset?.publicUrl ?? '/si.svg')
        }
    }, [user, reset])

    if (!user) {
        return <div className="text-sm text-gray-500">Memuat data pengguna...</div>;
    }

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
                            src={imagePreview || user?.asset?.publicUrl || "/si.svg"}
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
                        <input type="text" {...register("name")} id="name" placeholder="Masukkan nama pengguna" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[18rem]" />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message} </p>}

                    {/* email */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="email" className="w-[10rem]">Email</label>
                        <input type="text" {...register("email")} id="email" placeholder="Masukkan email pengguna" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[18rem]"
                            disabled
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message} </p>}

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
                        {
                            !isLoading ? (
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || user.role}
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
                            ) :
                                (
                                    <input type="text" className="outline-none p-2 bg-white border-gold-500 border rounded-lg w-[18rem]" placeholder="Role" aria-label="skeleton role" disabled />
                                )
                        }
                    </div>
                    {errors.role && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.role.message}
                        </p>
                    )}

                    {/* gender */}
                    <div className="flex items-center gap-x-3">
                        <label htmlFor="gender" className="w-[10rem]">
                            Jenis kelamin
                        </label>
                        {
                            !isLoading ? (
                                <Controller
                                    key={!isLoading ? 'loaded' : 'loading'}
                                    control={control}
                                    name="gender"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || user.gender}
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
                            ) :
                                (
                                    <input type="text" className="outline-none p-2 bg-white border-gold-500 border rounded-lg w-[18rem]" placeholder="Jenis Kelamin" aria-label="skeleton gender" disabled />
                                )
                        }
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
                        <label htmlFor="is_verified" className="w-[10rem]">
                            Sudah Diverifikasi
                        </label>
                        {
                            !isLoading ? (
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
                            ) :
                                (
                                    <input type="text" className="outline-none p-2 bg-white border-gold-500 border rounded-lg w-[18rem]" placeholder="Jenis Kelamin" aria-label="skeleton gender" disabled />
                                )
                        }
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
                        isPending ? (
                            <Button type="button" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded" disabled>
                                <Loader2Icon className="animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                                Ubah
                            </Button>
                        )
                    }
                </div>
            </form>
        </section>
    )
}
