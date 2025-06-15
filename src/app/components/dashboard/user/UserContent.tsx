'use client'

import { getAccessToken } from "@/lib/token";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { UserHeader } from "./UserHeader";
import { useGetUsers } from "@/services/userService";
import { TableUser } from "../../table/TableUser";
import { TableUserSkeleton } from "../../skeleton/table/TableSkeleton";
import { Pagination } from "../../pagination/Pagination";

export const UserContent = () => {
    const [token, setToken] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const keyword = params.get('keyword') || "";

    const { data, isLoading, isError } = useGetUsers(token, { keyword: keyword, page: String(currentPage) })

    const users = data?.data?.users;
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
        <div className="w-full flex flex-col gap-y-7">
            <h1 className="w-full font-semibold font-lora text-3xl">Daftar Pengguna</h1>
            <UserHeader />
            {
                !isError && !isLoading ? (
                    <TableUser users={users} token={token} startIndex={(currentPage - 1) * paginator?.limit} />
                ) :
                    (
                        <TableUserSkeleton />
                    )
            }
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </div>
    )
}