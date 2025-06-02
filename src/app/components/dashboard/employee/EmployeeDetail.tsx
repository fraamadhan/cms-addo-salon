'use client'

import { useEffect, useState } from "react";
import { useGetEmployee, useUpdateEmployee } from "@/services/employeeService";
import { getAccessToken } from "@/lib/token";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { FormEmployeeSkeleton } from "../../skeleton/form/FormSkeleton";
import { EmployeeForm } from "../../form/EmployeeForm";
import { UpdateEmployeeSchema } from "@/schemas/EmployeeSchema";
import { z } from "zod";
import { HttpStatusCode } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const EmployeeDetail = () => {

    const [token, setToken] = useState('');
    const router = useRouter();
    const params = useParams<{ id: string }>()
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useGetEmployee(token, params.id)
    const employee = data?.data;

    const onSubmit = (data: z.infer<typeof UpdateEmployeeSchema>) => {
        if (!employee?._id) {
            toast.error("Data pegawai tidak valid");
            return;
        }
        mutation.mutate({ token, id: employee?._id, body: data })
    }

    const mutation = useUpdateEmployee({
        onSuccess: (data) => {
            if (data?.status !== HttpStatusCode.Ok) {
                toast.error(data.message || "Gagal memperbarui data pegawai")
            }
            else {
                toast.success("Berhasil memperbarui data pegawai", {
                    duration: 1500,
                })
                queryClient.invalidateQueries({ queryKey: ["getEmployees"] })
                router.replace('/dashboard/employee')
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui data pegawai")
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Sesi anda sudah habis, silakan login kembali")
            return;
        }
        setToken(token)
    }, [])


    return (
        <div className="bg-white w-full p-6 rounded-lg shadow-lg space-y-4 z-10">
            {
                isLoading ? (
                    <FormEmployeeSkeleton />
                ) : isError ? (
                    <p className="text-red-500">Gagal memuat data pegawai.</p>
                ) : (
                    <EmployeeForm
                        employee={employee}
                        isLoading={isLoading}
                        isPending={mutation.isPending}
                        onSubmit={onSubmit}
                    />
                )
            }
        </div >
    )
}
