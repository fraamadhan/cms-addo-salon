'use client'

import { useSearchParams } from "next/navigation"
import { DashboardContentSkeleton } from "../skeleton/DashboardSkeleton"
import { FilterTime } from "./FilterTime"
import { useEffect, useState } from "react"
import { getAccessToken } from "@/lib/token"
import { toast } from "sonner"
import { useGetDashboardData } from "@/services/dashboardService"
import { rupiahFormatter } from "@/lib/general"
import { StatBox } from "./StatBox"

export const DashboardContent = () => {
    const params = useSearchParams();
    const [token, setToken] = useState('')

    const oneMonth = params.get('oneMonth') === 'true' || undefined;
    const threeMonth = params.get('threeMonth') === 'true' || undefined;
    const sixMonth = params.get('sixMonth') === 'true' || undefined;

    const { data, isLoading, isError } = useGetDashboardData(token, { oneMonth, threeMonth, sixMonth })

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            toast.error("Sesi anda sudah habis, silakan login kembali")
            return;
        }

        setToken(token)
    }, [])
    return (
        <div className="flex flex-col gap-y-7">
            {
                isError && isLoading ? (
                    <DashboardContentSkeleton />
                ) :
                    (
                        <>
                            <div className="w-full grid grid-cols-3 gap-4">
                                <StatBox title="Total Transaksi" value={data?.data?.totalTransactions} />
                                <StatBox title="Total Pengguna" value={data?.data?.totalUsers} />
                                <StatBox title="Total Layanan" value={data?.data?.totalProducts} />
                                <StatBox title="Total Pegawai" value={data?.data?.totalEmployees} />
                                <StatBox title="Total Pesanan" value={data?.data?.totalOrders} />
                            </div>
                            <div className="w-full grid grid-cols-2">
                                <div className="w-full flex flex-col gap-y-1 border p-5 rounded-md border-gold-500 ring-1 ring-gold-500">
                                    {/* filter by quartal */}
                                    <FilterTime />
                                    <div className="p-2 w-full bg-white shadow-md shadow-gray-600 rounded-lg border border-gold-500 ring-2 ring-gold-500 mt-2">
                                        <div className="w-full flex flex-col items-center justify-center gap-y-4">
                                            <p className="leading-none text-lg font-semibold font-lora">Total GMV</p>
                                            <p className="leading-none text-2xl font-semibold font-lora">{rupiahFormatter(data?.data?.totalRevenue)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}
