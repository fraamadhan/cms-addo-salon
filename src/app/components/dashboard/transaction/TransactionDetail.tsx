'use client'

import { useGetTransaction } from "@/services/transactionService"
import { StatusInformation } from "./detail/StatusInformation"
import { TotalPriceInformation } from "./detail/TotalPriceInformation"
import { TransactionInformation } from "./detail/TransactionInformation"
import { TransactionItem } from "./detail/TransactionItem"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAccessToken } from "@/lib/token"
import { toast } from "sonner"
import { TransactionDetailSkeleton } from "../../skeleton/detail-transaction/skeleton"

export const TransactionDetail = () => {

    const [token, setToken] = useState('');
    const params = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetTransaction(token, params.id)

    const transaction = data?.data;

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Maaf sesi anda sudah habis. Silakan login kembali");
            return;
        }
        setToken(token)
    }, [])
    return (
        <div className="w-full flex flex-col gap-7">
            {
                !isError && !isLoading ? (
                    <>
                        <StatusInformation status={transaction?.status} />
                        <TransactionInformation transaction={transaction} />
                        <TransactionItem items={transaction?.items} />
                        <TotalPriceInformation subtotal={transaction?.subTotal} transactionFee={transaction?.transactionFee} totalPrice={transaction?.totalPrice} />
                    </>
                ) : (
                    <TransactionDetailSkeleton />
                )
            }
        </div>
    )
}
