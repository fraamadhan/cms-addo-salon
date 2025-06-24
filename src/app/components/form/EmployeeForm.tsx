'use client'

import { UpdateEmployeeSchema } from "@/schemas/EmployeeSchema";
import { EmployeeItemResponse } from "@/types/employee-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Button from "../button/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2Icon } from "lucide-react";

export const EmployeeForm = (
    { employee, isLoading, isPending, onSubmit }: { employee: EmployeeItemResponse | null, isLoading: boolean, isPending: boolean, onSubmit: (data: z.infer<typeof UpdateEmployeeSchema>) => void }
) => {

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof UpdateEmployeeSchema>>({
        resolver: zodResolver(UpdateEmployeeSchema),
        defaultValues: {
            name: employee?.name,
            email: employee?.email,
            phoneNumber: employee?.phoneNumber,
            availability: employee?.availability ?? 1
        }
    })

    const onCancel = () => {
        reset({
            name: employee?.name || "",
            email: employee?.email || "",
            phoneNumber: employee?.phoneNumber || "",
            availability: employee?.availability ?? 1
        });
    }

    useEffect(() => {
        if (employee) {
            reset({
                name: employee.name || "",
                email: employee.email || "",
                phoneNumber: employee.phoneNumber || "",
                availability: employee.availability ?? 1
            });

        }
    }, [employee, reset])

    if (!employee) {
        return <div className="text-sm text-gray-500">Memuat data karyawan...</div>;
    }

    return (
        <form className="w-full flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
            <span className="text-red-500">(*) simbol wajib diisi</span>
            <div className="max-w-[30rem] flex flex-col gap-y-5">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1 w-full" htmlFor="name"><span className="text-red-500">*</span>Nama</label>
                    <input {...register("name")} type="text" name="name" id="name" className="w-full focus:outline-none p-2 border border-gold-500 rounded-lg" required />
                </div>
                {errors.name && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.name.message}</p>}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1 w-full" htmlFor="email"><span className="text-red-500">*</span>Email</label>
                    <input {...register("email")} type="text" name="email" id="email"
                        className="w-full focus:outline-none p-2 border border-gold-500 rounded-lg" required />
                </div>
                {errors.email && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.email.message}</p>}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1 w-full" htmlFor="phoneNumber"><span className="text-red-500">*</span>No. Telepon</label>
                    <input {...register("phoneNumber")} type="text" name="phoneNumber" id="phoneNumber" className="w-full focus:outline-none p-2 border border-gold-500 rounded-lg" required />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.phoneNumber.message}</p>}
                <div className="flex flex-col w-full md:w-[16rem] lg:w-[18rem] rounded-xl">
                    <label className="block text-sm font-medium mb-1 w-full" htmlFor="phoneNumber"><span className="text-red-500">*</span>Ketersediaan</label>
                    {
                        !isLoading ? (
                            <Controller
                                key={!isLoading ? 'loaded' : 'loading'}
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
                        ) : <input type="text" className="outline-none p-2 bg-white border-gold-500 border rounded-lg w-full" placeholder="Ketersediaan" aria-label="skeleton ketersediaan" disabled />

                    }
                </div>
                {errors.availability && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.availability.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end gap-2 mt-3 w-full">
                <Button type="button" onClick={onCancel} className="px-4 py-2 w-[15rem] text-sm bg-gray-200 rounded hover:bg-gray-300">
                    Reset
                </Button>
                {
                    isPending ? (
                        <Button type="submit" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded">
                            <Loader2Icon className="animate-spin" />
                        </Button>
                    ) : (
                        <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            Ubah
                        </Button>
                    )
                }
            </div>
        </form >
    )
}
