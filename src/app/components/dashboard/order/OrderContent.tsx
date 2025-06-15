'use client'

import { useEffect, useState } from "react"
import { OrderHeader } from "./OrderHeader"
import { getAccessToken } from "@/lib/token";
import { toast } from "sonner";
import { useGetOrders } from "@/services/transactionService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SkeletonTableOrder } from "../../skeleton/table/TableSkeleton";
import { TableOrder } from "../../table/TableOrder";
import { Pagination } from "../../pagination/Pagination";

export const OrderContent = () => {
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

    const { data, isLoading, isError } = useGetOrders(token, { keyword: keyword ?? "", page: currentPage.toString(), orderStatus, startDate, endDate })

    const orders = data?.data?.orders;
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
            <h1 className="text-3xl font-lora font-bold">Daftar Pesanan</h1>
            <OrderHeader />
            {
                !isError && !isLoading ? (
                    <TableOrder orders={orders} startIndex={(currentPage - 1) * paginator?.limit} token={token} />
                ) :
                    (< SkeletonTableOrder />)
            }
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </div>
    )
}
