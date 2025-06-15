import { TableHistory } from '@/app/components/table/TableHistory'
import { HistoryItem } from '@/types/transaction-type'
import React from 'react'

export const TransactionItem = (
    { items }: { items: HistoryItem[] }
) => {
    return (
        <div className='w-full'>
            <TableHistory items={items} />
        </div>
    )
}
