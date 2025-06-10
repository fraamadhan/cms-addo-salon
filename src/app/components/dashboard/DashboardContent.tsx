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
import { ItemsQuarterlyChart, RevenueQuarterlyChart } from "../chart/QuarterlyChart"
import { SelectYear } from "../form/select-input/SelectYear"

export const DashboardContent = () => {
    const params = useSearchParams();
    const [token, setToken] = useState('')
    const [selectedYear, setSelectedYear] = useState<number | undefined>(new Date().getFullYear());

    const oneMonth = params.get('oneMonth') === 'true' || undefined;
    const threeMonth = params.get('threeMonth') === 'true' || undefined;
    const sixMonth = params.get('sixMonth') === 'true' || undefined;

    const { data, isLoading, isError } = useGetDashboardData(token, { oneMonth, threeMonth, sixMonth, year: selectedYear })

    const years = data?.data?.availableYears;

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            toast.error("Sesi anda sudah habis, silakan login kembali")
            return;
        }

        setToken(token)
    }, [])

    if (isError) return <div className="text-red-500">Gagal memuat data dashboard</div>
    return (
        <div className="flex flex-col gap-y-7">
            {
                isLoading ? (
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
                            <div className="w-full grid grid-cols-2 gap-x-3">
                                <div className="w-full flex flex-col gap-y-1 border p-5 rounded-md border-gold-500 ring-1 ring-gold-500">
                                    {/* filter by month */}
                                    <FilterTime />
                                    <div className="p-2 w-full bg-white shadow-md shadow-gray-600 rounded-lg border border-gold-500 ring-2 ring-gold-500 mt-2">
                                        <div className="w-full flex flex-col items-center justify-center gap-y-4">
                                            <p className="leading-none text-lg font-semibold font-lora">Total Pendapatan</p>
                                            <p className="leading-none text-2xl font-semibold font-lora">{rupiahFormatter(data?.data?.totalRevenue)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-2 gap-x-3">
                                {/* revenue graphs */}
                                {data?.data?.quarterlyStats?.length > 0 && (
                                    <div className="w-full p-4 border rounded-md border-gold-500 ring-1 ring-gold-500 bg-white">
                                        <p className="text-lg font-semibold font-lora mb-4">Statistik Pendapatan Per Kuartal</p>
                                        <SelectYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years} />
                                        <RevenueQuarterlyChart data={data?.data?.quarterlyStats} />
                                    </div>
                                )}
                                {/* items graphs */}
                                {data?.data?.quarterlyStats?.length > 0 && (
                                    <div className="w-full p-4 border rounded-md border-gold-500 ring-1 ring-gold-500 bg-white">
                                        <p className="text-lg font-semibold font-lora mb-4">Statistik Layanan Terjual Per Kuartal</p>
                                        <SelectYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years} />
                                        <ItemsQuarterlyChart data={data?.data?.quarterlyStats} />
                                    </div>
                                )}
                            </div>
                        </>
                    )
            }
        </div>
    )
}
