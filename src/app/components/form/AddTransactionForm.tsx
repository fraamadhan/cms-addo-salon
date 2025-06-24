'use client'

import { getAccessToken } from "@/lib/token";
import { TransactionSchema } from "@/schemas/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner";
import { z } from 'zod';
import { SelectEmployee } from "./combo-box/SelectEmployee";
import { useGetChooseEmployees } from "@/services/employeeService";
import { SelectTransactionType } from "./select-input/SelectTransactionType";
import { SelectStatus } from "./select-input/SelectStatus";
import { paymentMethodLabels, paymentMethods, transactionStatus } from "@/lib/data";
import { statusLabels } from "@/lib/data";
import { useGetServices } from "@/services/serviceProductService";
import { SelectService } from "./combo-box/SelectServices";
import { SelectPaymentMethod } from "./select-input/SelectPaymentMethod";
import { Loader2Icon } from "lucide-react";
import Button from "../button/Button";
import { useCreateTransaction } from "@/services/transactionService";
import { HttpStatusCode } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const AddTransactionForm = () => {

    const [token, setToken] = useState('');
    const [open, setOpen] = useState(false);
    const [openService, setOpenService] = useState(false);
    const queryClient = useQueryClient();

    const { data } = useGetChooseEmployees(token);
    const employees = data?.data;
    const { data: servicesData } = useGetServices({ getAll: true });
    const services = servicesData?.data;

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof TransactionSchema>>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            customerName: "",
            employeeId: "",
            transactionType: "",
            reservationDate: "",
            status: "",
            productId: "",
            paymentMethod: "",
            bank: "",
        }
    })

    const selectedValue = useWatch({
        control: control,
        name: 'paymentMethod'
    })

    const onSubmit = (data: z.infer<typeof TransactionSchema>) => {
        mutation.mutate({ token, body: data });
        onCancel()
    }

    const onCancel = () => {
        reset({
            customerName: "",
            employeeId: "",
            transactionType: "",
            reservationDate: "",
            status: "",
            productId: "",
            paymentMethod: "",
            bank: "",
        })
    }

    const mutation = useCreateTransaction({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Created) {
                toast.error(data.message || "Gagal menambahkan data transaksi");
                return;
            }
            else {
                toast.success("Berhasil menambahkan data transaksi", {
                    duration: 1500
                });
                queryClient.invalidateQueries({ queryKey: ['getTransactions'] })
                queryClient.invalidateQueries({ queryKey: ['getOrders'] })
                return;
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menambahkan data transaksi");
            return;
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Maaf sesi anda sudah habis. Silakan login kembali")
            return;
        }
        setToken(token);
    }, [])
    return (
        <section className="w-full">
            <form className="w-full flex flex-col p-5 gap-4 bg-white rounded-xl border border-gold-500 shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <span className="text-red-500">(*) simbol wajib diisi</span>
                {/* Customer Name */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="customerName" className="w-[10rem]"><span className="text-red-500">*</span>Nama pelanggan</label>
                    <div className="flex items-center gap-x-3">
                        <input {...register('customerName')} type="text" id="customerName" name="customerName" placeholder="Nama pelanggan" className="focus:outline-none p-2 border-2 border-gold-500 rounded-xl w-[20rem]" />
                    </div>
                </div>
                {errors.customerName && <p className="text-red-500 text-sm mb-2">{errors.customerName.message} </p>}
                {/* Employee Name */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="employeeName" className="w-[10rem]"><span className="text-red-500">*</span>Nama Pegawai</label>
                    <SelectEmployee employees={employees} fieldName="employeeId" open={open} setOpen={setOpen} control={control} />
                </div>
                {errors.employeeId && <p className="text-red-500 text-sm mb-2">{errors.employeeId.message} </p>}
                {/* Transaction Type */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="transactionType" className="w-[10rem]"><span className="text-red-500">*</span>Tipe Transaksi</label>
                    <SelectTransactionType control={control} fieldName="transactionType" />
                </div>
                {errors.transactionType && <p className="text-red-500 text-sm mb-2">{errors.transactionType.message} </p>}
                {/* Reservation Date */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="reservationDate" className="w-[10rem]"><span className="text-red-500">*</span>Jadwal Pesanan</label>
                    <input {...register('reservationDate')} type="datetime-local" name="reservationDate" id="reservationDate"
                        className="focus:outline-none p-2 border-2 border-gold-500 rounded-xl w-[20rem]" required />
                </div>
                {/* Status */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="transactionStatus" className="w-[10rem]"><span className="text-red-500">*</span>Status</label>
                    <SelectStatus control={control} fieldName="status" data={transactionStatus} statusLabels={statusLabels} />
                </div>
                {errors.status && <p className="text-red-500 text-sm mb-2">{errors.status.message} </p>}
                {/* Service */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="employeeName" className="w-[10rem]"><span className="text-red-500">*</span>Nama Layanan</label>
                    <SelectService services={services} fieldName="productId" open={openService} setOpen={setOpenService} control={control} />
                </div>
                {errors.productId && <p className="text-red-500 text-sm mb-2">{errors.productId.message} </p>}
                {/* Payment Method */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="paymentMethod" className="w-[10rem]"><span className="text-red-500">*</span>Metode Pembayaran</label>
                    <SelectPaymentMethod control={control} fieldName="paymentMethod" data={paymentMethods} paymentMethodLabels={paymentMethodLabels} />
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm mb-2">{errors.paymentMethod.message} </p>}
                {/* Bank */}
                {
                    selectedValue === 'bank_transfer' && (
                        <>
                            <div className="flex items-center gap-x-3">
                                <label htmlFor="bank" className="w-[10rem]"><span className="text-red-500">*</span>Bank Pengguna</label>
                                <div className="flex items-center gap-x-3">
                                    <input {...register('bank')} type="text" id="bank" name="bank" placeholder="Bank pengguna" className="focus:outline-none p-2 border-2 border-gold-500 rounded-xl w-[20rem]" required />
                                </div>
                            </div>
                            {errors.bank && <p className="text-red-500 text-sm mb-2">{errors.bank.message} </p>}
                        </>
                    )
                }

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
                {/* button */}
                <div className="flex justify-end gap-2 mt-7 w-full">
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
