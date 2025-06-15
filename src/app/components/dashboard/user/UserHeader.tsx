'use client'

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import Button from "../../button/Button";
import Link from "next/link";

export const UserHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get("") || "");

    const updateQueryParams = (keyword: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('keyword', keyword);
        currentParams.set('page', '1');
        router.replace(`${pathname}?${currentParams.toString()}`)
    }

    const handleOnSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateQueryParams((e.target as HTMLInputElement).value)
        }
    }

    return (
        <div className="w-full flex items-center justify-between">
            <div className="w-full flex max-w-[25em] bg-white border-2 p-1 items-center space-x-2 rounded-lg mx-2 shrink-1 ">
                <input
                    type="text" name="keyword" id="keyword" aria-label="Kolom Pencarian" placeholder="Cari pengguna"
                    className="w-full h-full placeholder:text-gray-300 border-0 p-2 focus:outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleOnSearch}
                />
                <div className="p-1" onClick={() => updateQueryParams(keyword)}>
                    <SearchIcon className="mr-2" />
                </div>
            </div>
            <div className="w-[15rem]">
                <Link href={'/dashboard/user/add-user/form'}>
                    <Button className="p-2 w-full text-gray-700 bg-gold-500 hover:bg-gold-700 border border-gold-700 ring-1 ring-gold-700 rounded-lg">
                        Tambah Pengguna
                    </Button>
                </Link>
            </div>
        </div>
    )
}