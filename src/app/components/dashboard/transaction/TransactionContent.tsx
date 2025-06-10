'use client'

import { getAccessToken } from "@/lib/token";
import { useGetTransactions } from "@/services/transactionService";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TransactionHeader } from "./TransactionHeader"
import { TableTransaction } from "../../table/TableTransaction";
import { SkeletonTableTransaction } from "../../skeleton/table/TableSkeleton";
import { Pagination } from "../../pagination/Pagination";

export const TransactionContent = () => {

    const [token, setToken] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const keyword = searchParams.get('keyword');
    const orderStatus = searchParams.get('orderStatus');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const { data, isLoading, isError } = useGetTransactions(token, { keyword: keyword ?? "", page: currentPage.toString(), orderStatus, startDate, endDate })

    const transactions = data?.data?.transactions;
    const paginator = data?.data?.paginator;

    const handlePageChange = (page: number) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('page', page.toString());
        setCurrentPage(page);
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: true })
    }

    useEffect(() => {
        const totalPage = paginator?.pageCount;
        const page = searchParams.get('page');
        if (totalPage) setTotalPage(totalPage);
        if (page) setCurrentPage(Number(page))
    }, [paginator, searchParams])

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Maaf sesi anda sudah habis. Silakan login kembali");
            return;
        }
        setToken(token)
    }, [])

    return (
        <div className="w-full flex flex-col gap-y-7 p-7">
            <h1 className="text-3xl font-lora font-bold">Daftar Transaksi</h1>
            <TransactionHeader />
            {
                !isError && !isLoading ? (
                    <TableTransaction transactions={transactions} token={token} startIndex={(currentPage - 1) * paginator?.limit} />
                ) :
                    (< SkeletonTableTransaction />)
            }
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </div>
    )
}
