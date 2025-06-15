'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TableEmployee } from "../../table/TableEmployee"
import { EmployeeHeader } from "./EmployeeHeader"
import { useGetEmployees } from "@/services/employeeService"
import { useEffect, useState } from "react"
import { getAccessToken } from "@/lib/token"
import { toast } from "sonner"
import { Pagination } from "../../pagination/Pagination"
import { TableEmployeeSkeleton } from "../../skeleton/table/TableSkeleton"

export const EmployeeContent = () => {

    const [token, setToken] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const params = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();
    const keyword = params.get('keyword') || "";

    const { data, isLoading, isError } = useGetEmployees(token, {
        page: String(currentPage),
        keyword: keyword,
        limit: undefined,
        slug: undefined,
        sorttype: undefined,
        sortby: undefined
    })

    const employees = data?.data?.employees;
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

        setToken(token)
    }, [])
    return (
        <div className="w-full flex flex-col gap-y-7">
            <h1 className="w-full font-semibold text-3xl font-lora">Daftar Pegawai</h1>
            <EmployeeHeader />
            {
                !isError && !isLoading ? (
                    <TableEmployee employees={employees} token={token} startIndex={(currentPage - 1) * paginator?.limit} />
                ) : <TableEmployeeSkeleton />
            }
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </div>
    )
}
