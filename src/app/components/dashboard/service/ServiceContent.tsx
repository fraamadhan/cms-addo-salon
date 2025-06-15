'use client'

import { getAccessToken } from "@/lib/token";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TableService } from "../../table/TableService"
import { ServiceHeader } from "./ServiceHeader"
import { useGetServices } from "@/services/serviceProductService";
import { Pagination } from "../../pagination/Pagination";
import { TableServiceSkeleton } from "../../skeleton/table/TableSkeleton";

export const ServiceContent = () => {

    const [token, setToken] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const keyword = params.get('keyword') || "";
    const sortby = params.get('sortby') || undefined;
    const sorttype = params.get('sorttype') || undefined;

    const { data, isLoading, isError } = useGetServices({ keyword: keyword || undefined, page: String(currentPage), sortby, sorttype })

    const services = data?.data?.products;
    const paginator = data?.data?.paginator;

    const handlePageChange = (page: number) => {
        const currentParams = new URLSearchParams(params);
        currentParams.set('page', String(page));
        setCurrentPage(page);
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: true })
    }

    useEffect(() => {
        const totalPage = paginator?.pageCount;
        const page = params.get('page');
        if (totalPage) setTotalPage(totalPage);
        if (page) setCurrentPage(Number(page))
    }, [paginator, params])

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Sesi anda sudah habis. Silakan login kembali");
            return;
        }

        setToken(token);
    }, [])
    return (
        <div className="w-full flex flex-col gap-y-7 p-7">
            <h1 className="text-3xl font-lora font-bold">Daftar Layanan</h1>
            <ServiceHeader />
            {
                !isError && !isLoading ? (
                    <TableService services={services} token={token} startIndex={(currentPage - 1) * paginator?.limit} />
                ) : (<TableServiceSkeleton />)
            }
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </div>
    )
}
