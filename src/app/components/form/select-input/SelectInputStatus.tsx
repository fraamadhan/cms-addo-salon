import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { TransactionResponseItem } from '@/types/transaction-type';
import { TransactionStatus } from '@/lib/enum';

interface SelectInputStatusProps {
    order?: TransactionResponseItem;
    serviceStatus: TransactionStatus | null;
    data: Record<string, string>[];
    placeholder?: string;
    onValueChange: (value: TransactionStatus) => void;
}

export const SelectInputStatus = (
    { order, serviceStatus, data, placeholder, onValueChange }: SelectInputStatusProps
) => {
    return (
        <div className="flex items-center gap-x-3">
            <Select
                value={serviceStatus || order?.serviceStatus}
                onValueChange={(value) => {
                    onValueChange(value as TransactionStatus);
                }}
            >
                <SelectTrigger className="w-[20rem] focus:outline-none border-gold-500 border-2">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="w-[20rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                    {
                        data.map((value: Record<string, string>, idx: number) => (
                            <SelectItem key={idx} value={value.status} >
                                {{
                                    IN_PROGRESS: "Sedang Berlangsung",
                                    COMPLETED: "Selesai",
                                    SCHEDULED: "Terjadwal",
                                    CANCELED: "Dibatalkan",
                                    "UNPAID": "Belum dibayar"
                                }[value.status]}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
