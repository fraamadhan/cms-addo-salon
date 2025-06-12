'use client'

import { useParams } from "next/navigation"
import { ManageGeneralInfoOrder } from "./ManageGeneralInfoOrder"
import { ManageStatusSchedule } from "./ManageStatusSchedule"
import { useEffect, useState } from "react"
import { getAccessToken } from "@/lib/token"
import { toast } from "sonner"
import { useGetOrder, useUpdateGeneralInfoOrder } from "@/services/transactionService"
import { OrderFormSkeleton, OrderStatusSkeleton } from "../../skeleton/detail-order/skeleton"
import { z } from 'zod';
import { OrderSchema } from "@/schemas/OrderSchema"
import { HttpStatusCode } from "axios"
import { useQueryClient } from "@tanstack/react-query"

export const OrderDetail = () => {

    const params = useParams<{ id: string }>()
    const [token, setToken] = useState("");
    const [reservationDate, setReservationDate] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useGetOrder(token, params.id)
    const order = data?.data;

    const onSubmit = (data: z.infer<typeof OrderSchema>) => {
        if (!data) {
            toast.error("Maaf data tidak valid. Tolong cek masukkan pada form")
        }
        const body = {
            customerName: data.customerName,
            employeeId: data.employeeId,
            transactionId: order?.transactionId
        }

        mutation.mutate({ token, body, id: params?.id })
    }

    const mutation = useUpdateGeneralInfoOrder({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Ok) {
                toast.error(data.message || "Gagal memperbarui data pesanan");
                return;
            }
            else {
                queryClient.invalidateQueries({ queryKey: ["getOrders"] })
                queryClient.invalidateQueries({ queryKey: ["getOrder"] })
                queryClient.invalidateQueries({ queryKey: ["getChooseEmployees"] })
                toast.success('Berhasil memperbarui data pesanan', {
                    duration: 1500
                });
                return;
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui data pesanan");
            return;
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Maaf sesi anda sudah habis. Silakan login kembali");
            return;
        }
        setToken(token);
    }, [])

    return (
        <div className="w-full flex flex-col gap-y-7">
            {
                !isError && !isLoading ? (
                    <>
                        <ManageStatusSchedule order={order} token={token} id={params.id} setReservationDate={setReservationDate} />
                        <ManageGeneralInfoOrder order={order} token={token} onSubmit={onSubmit} isPending={mutation.isPending} reservationDate={reservationDate} />
                    </>
                ) : (
                    <>
                        <OrderStatusSkeleton />
                        <OrderFormSkeleton />
                    </>
                )
            }

        </div>
    )
}
