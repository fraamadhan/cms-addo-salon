'use client'

import { SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { TransactionStatus } from "@/lib/enum";
import Button from "../../button/Button";
import { toast } from "sonner";

const statusList = [
    { value: TransactionStatus.SCHEDULED, label: "Terjadwal" },
    { value: TransactionStatus.IN_PROGRESS, label: "Sedang berlangsung" },
    { value: TransactionStatus.UNPAID, label: "Belum dibayar" }
]

export const OrderHeader = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || "");
    const [filterStatus, setFilterByStatus] = useState("");
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    const handleOnSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            updateQueryParams((e.target as HTMLInputElement).value);
        }
    }

    const updateQueryParams = (keyword: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('keyword', keyword);
        currentParams.set('page', '1');
        router.push(`${pathname}?${currentParams.toString()}`)
    }

    const handleOnFilter = (value: string) => {
        const currentParams = new URLSearchParams(searchParams);
        if (value === TransactionStatus.SCHEDULED) {
            currentParams.set('orderStatus', TransactionStatus.SCHEDULED);
        }
        else if (value === TransactionStatus.IN_PROGRESS) {
            currentParams.set('orderStatus', TransactionStatus.IN_PROGRESS);
        }
        else if (value === TransactionStatus.UNPAID) {
            currentParams.set('orderStatus', TransactionStatus.UNPAID);
        }
        currentParams.set('page', '1')
        router.push(`${pathname}?${currentParams.toString()}`)
    }

    const handleOnChange = () => {
        const startDate = startDateRef.current?.value;
        const endDate = endDateRef.current?.value;
        const currentParams = new URLSearchParams(searchParams);

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            toast.error("Tanggal mulai tidak boleh lebih besar dari tanggal akhir");
            return;
        }

        if (startDate) {
            currentParams.set('startDate', startDate);
        }
        if (endDate) {
            currentParams.set('endDate', endDate)
        }
        currentParams.set('page', '1')
        router.push(`${pathname}?${currentParams.toString()}`)
    }

    const handleResetFilter = () => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.delete('orderStatus');
        currentParams.delete('keyword');
        currentParams.delete('startDate');
        currentParams.delete('endDate');
        setKeyword('')
        setFilterByStatus('')
        if (startDateRef.current) {
            startDateRef.current.value = '';
        }
        if (endDateRef.current) {
            endDateRef.current.value = '';
        }
        currentParams.set('page', '1')
        router.push(`${pathname}?${currentParams.toString()}`)
    }
    return (
        <section className="w-full flex items-center gap-x-5">
            <div className="w-full flex flex-col gap-y-2 max-w-[20em]">
                <div className="w-full px-2">
                    Cari Kode Pesanan
                </div>
                <div className="w-full flex max-w-[20em] bg-white border-2 p-1 items-center space-x-2 rounded-lg mx-2 shrink-1 border-gold-500">
                    <input
                        type="text" name="keyword" id="keyword" aria-label="Kolom Pencarian" placeholder="Cari kode pesanan"
                        className="w-full h-full placeholder:text-gray-300 border-0 p-2 focus:outline-none"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleOnSearch}
                    />
                    <div className="p-1" onClick={() => updateQueryParams(keyword)}>
                        <SearchIcon className="mr-2" />
                    </div>
                </div>
            </div>

            {/* filter by status */}
            <div className="flex flex-col gap-y-2">
                <div className="w-full">
                    Pilih Status
                </div>
                <div className="flex w-[14rem] rounded-xl gap-x-1">
                    <Select
                        value={filterStatus || ""}
                        onValueChange={(value) => {
                            setFilterByStatus(value);
                            handleOnFilter(value);
                        }}
                    >
                        <SelectTrigger className="w-full border-2 border-gold-500">
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent className="w-[14rem] flex flex-col gap-y-2 rounded-xl p-2">
                            {
                                statusList.map((item, idx) => (
                                    <SelectItem key={idx} value={item.value} className="p-1" >
                                        {item.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="startDate">Dari Tanggal</label>
                <input type="datetime-local" ref={startDateRef} name="startDate" id="startDate" className="max-w-[12rem] border-2 border-gold-500 bg-white rounded-md p-2" onChange={handleOnChange} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="endDate">Sampai Tanggal</label>
                <input type="datetime-local" ref={endDateRef} name="endDate" id="endDate" className="max-w-[12rem] border-2 border-gold-500 bg-white rounded-md p-2" onChange={handleOnChange} />
            </div>
            <div className="flex w-[7rem] max-w-[9rem] flex-col justify-start">
                <div className="flex-grow min-h-[2rem]">

                </div>
                <Button className="w-full bg-gold-600 text-white p-1 rounded-md" onClick={handleResetFilter}>
                    Reset
                </Button>
            </div>
        </section >
    )
}
