'use client'

import { UpdateEmployeeSchema } from "@/schemas/EmployeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import Button from "../button/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2Icon } from "lucide-react";
import { useCreateEmployee } from "@/services/employeeService";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/token";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const AddEmployeeForm = () => {

    const [token, setToken] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof UpdateEmployeeSchema>>({
        resolver: zodResolver(UpdateEmployeeSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            availability: 1
        }
    })

    const onReset = () => {
        reset({
            name: "",
            email: "",
            phoneNumber: "",
            availability: 1
        })
    }

    const onSubmit = (data: z.infer<typeof UpdateEmployeeSchema>) => {
        mutation.mutate({ token, body: data })
    }

    const mutation = useCreateEmployee({
        onSuccess: (data) => {
            if (data?.status !== HttpStatusCode.Created) {
                toast.error(data.message || "Gagal menambah data pegawai")
            }
            else {
                toast.success("Berhasil menambah data pegawai", {
                    duration: 1500,
                })
                queryClient.invalidateQueries({ queryKey: ["getEmployees"] })

                router.push('/dashboard/employee?page=1')
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menambah data pegawai")
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Sesi anda sudah habis silakan login kembali");
            return;
        }
        setToken(token)
    }, [])

    return (
        <section className="flex flex-col w-full gap-y-7">
            <form className="w-full flex flex-col p-7 border shadow-xl rounded-xl gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-[30rem] flex flex-col gap-y-5">
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 w-full" htmlFor="name">Nama</label>
                        <input {...register("name")} type="text" name="name" id="name" className="w-full focus:outline-none p-2 border border-gold-500 rounded-lg" required />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.name.message}</p>}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 w-full" htmlFor="email">Email</label>
                        <input {...register("email")} type="text" name="email" id="email"
                            className="w-full focus:outline-none p-2 border border-gold-500 rounded-lg" required />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.email.message}</p>}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 w-full" htmlFor="phoneNumber">No. Telepon</label>
                        <input {...register("phoneNumber")} type="text" name="phoneNumber" id="phoneNumber" className="w-full focus:outline-none p-2 border border-gold-500 rounded-lg" required />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.phoneNumber.message}</p>}
                    <div className="flex flex-col w-full md:w-[16rem] lg:w-[18rem] rounded-xl">
                        <label className="block text-sm font-medium mb-1 w-full" htmlFor="phoneNumber">Ketersediaan</label>
                        <Controller
                            control={control}
                            name="availability"
                            render={({ field }) => (
                                <Select
                                    value={String(field.value)}
                                    onValueChange={(val) => field.onChange(Number(val))}
                                >
                                    <SelectTrigger className="w-full focus:outline-none border-gold-500">
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                    <SelectContent className="w-[11em] flex flex-col space-y-3 text-gray-400 border rounded-xl p-2 ">
                                        <SelectItem className="p-1" value="1">Tersedia</SelectItem>
                                        <SelectItem className="p-1" value="0">Tidak Tersedia</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {errors.availability && (
                        <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                            {errors.availability.message}
                        </p>
                    )}
                </div>
                <div className="flex justify-end gap-2 mt-7 w-full">
                    <Button type="button" onClick={onReset} className="px-4 py-2 w-[15rem] text-sm bg-gray-200 rounded hover:bg-gray-300">
                        Batal
                    </Button>
                    {
                        mutation.isPending ? (
                            <Button type="submit" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded">
                                <Loader2Icon className="animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Tambah
                            </Button>
                        )
                    }
                </div>
            </form >
        </section>
    )
}
