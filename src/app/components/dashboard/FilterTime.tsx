'use client'

import { useEffect, useState } from "react"
import Button from "../button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const FilterTime = () => {

    const [filter, setFilter] = useState<'all' | '1m' | '3m' | '6m'>('all');
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    const handleFilterByTime = (value: 'all' | '1m' | '3m' | '6m') => {
        setFilter(value);

        const currentParams = new URLSearchParams(params);

        switch (value) {
            case 'all':
                currentParams.delete('oneMonth')
                currentParams.delete('threeMonth')
                currentParams.delete('sixMonth')
                break;
            case '1m':
                currentParams.set('oneMonth', 'true');
                currentParams.delete('threeMonth')
                currentParams.delete('sixMonth')
                break;
            case '3m':
                currentParams.set('threeMonth', 'true');
                currentParams.delete('oneMonth')
                currentParams.delete('sixMonth')
                break;
            case '6m':
                currentParams.set('sixMonth', 'true');
                currentParams.delete('oneMonth')
                currentParams.delete('threeMonth')
                break;
        }

        router.push(`${pathname}?${currentParams.toString()}`, { scroll: true })

    }

    useEffect(() => {
        if (params.get("oneMonth") === "true") setFilter("1m");
        else if (params.get("threeMonth") === "true") setFilter("3m");
        else if (params.get("sixMonth") === "true") setFilter("6m");
        else setFilter("all");
    }, [params]);

    return (
        <div className="flex flex-col gap-y-3">
            <p className="font-semibold">Lihat total pendapatan berdasarkan jangka waktu</p>
            <div className="flex items-center gap-x-3">
                <Button
                    className={`p-2 border border-gold-500 rounded-md ${filter === 'all' ? "bg-gold-500 text-white" : ""}`}
                    onClick={() => handleFilterByTime('all')}
                >
                    Semua
                </Button>
                <Button
                    className={`p-2 border border-gold-500 rounded-md ${filter === '6m' ? "bg-gold-500 text-white" : ""}`}
                    onClick={() => handleFilterByTime('6m')}
                >
                    Enam Bulan
                </Button>
                <Button
                    className={`p-2 border border-gold-500 rounded-md ${filter === '3m' ? "bg-gold-500 text-white" : ""}`}
                    onClick={() => handleFilterByTime('3m')}
                >
                    Tiga Bulan
                </Button>
                <Button
                    className={`p-2 border border-gold-500 rounded-md ${filter === '1m' ? "bg-gold-500 text-white" : ""}`}
                    onClick={() => handleFilterByTime('1m')}
                >
                    Satu Bulan
                </Button>
            </div>
        </div>
    )
}
