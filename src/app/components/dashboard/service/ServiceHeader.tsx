'use client'

import { SearchIcon, X } from "lucide-react"
import Button from "../../button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from 'next/link';
import { KeyboardEvent, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../ui/select"
import { SelectValue } from "@radix-ui/react-select"

export const ServiceHeader = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? "");
    const [sortingByPrice, setSortingByPrice] = useState('');
    const sorttype = searchParams.get('sorttype') === 'asc'
        ? 'lowestPrice'
        : searchParams.get('sorttype') === 'desc'
            ? 'highestPrice'
            : '';

    const handleOnSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateQueryParams((e.target as HTMLInputElement).value);
        }
    }

    const updateQueryParams = (keyword: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('page', '1');
        currentParams.set('keyword', keyword);
        router.push(`${pathname}?${currentParams.toString()}`)
    }

    const handleOnSelectSort = (value: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('sortby', "price");
        if (value === 'lowestPrice') {
            currentParams.set('sorttype', 'asc');
        }
        else if (value === 'highestPrice') {
            currentParams.set('sorttype', 'desc');
        }
        currentParams.set('page', '1')
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const handleReset = () => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.delete('sortby');
        currentParams.delete('sorttype')
        setSortingByPrice("");
        currentParams.set('page', '1')
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <section className="w-full flex items-center">
            {/* filter */}
            <div className="w-full flex items-center">
                {/* search box */}
                <div className="w-full flex max-w-[25em] bg-white border-2 p-1 items-center space-x-2 rounded-lg mx-2 shrink-1 ">
                    <input
                        type="text" name="keyword" id="keyword" aria-label="Kolom Pencarian" placeholder="Cari nama layanan"
                        className="w-full h-full placeholder:text-gray-300 border-0 p-2 focus:outline-none"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleOnSearch}
                    />
                    <div className="p-1" onClick={() => updateQueryParams(keyword)}>
                        <SearchIcon className="mr-2" />
                    </div>
                </div>
                {/* filter order by price */}
                <div className="flex w-[18rem] p-2 rounded-xl gap-x-1">
                    <Select value={sortingByPrice || sorttype} onValueChange={(value) => {
                        setSortingByPrice(value);
                        handleOnSelectSort(value);
                    }}>
                        <SelectTrigger className="w-full border-2 border-gold-500">
                            <SelectValue placeholder="Urutkan" />
                        </SelectTrigger>
                        <SelectContent className="w-[16rem] flex flex-col gap-y-2 rounded-xl p-2">
                            <SelectItem className="p-2" value="lowestPrice">
                                Harga Terendah
                            </SelectItem>
                            <SelectItem className="p-2" value="highestPrice">
                                Harga Tertinggi
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {(sortingByPrice || sorttype) && (
                        <div className="flex flex-row items-center">
                            <X
                                className="text-gray-400 hover:text-red-500 cursor-pointer w-5 h-5"
                                onClick={handleReset}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* button */}
            <div className="w-[15rem]">
                <Link href={'/dashboard/service/add-service/form'}>
                    <Button className="p-2 w-full text-gray-700 bg-gold-500 hover:bg-gold-700 border border-gold-700 ring-1 ring-gold-700 rounded-lg">
                        Tambah Layanan
                    </Button>
                </Link>
            </div>
        </section>
    )
}
