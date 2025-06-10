import Link from "next/link"
import Button from "../button/Button"
import { TransactionHistoryResponseItem } from "@/types/transaction-type"
import { dateFormatter } from "@/lib/general"

export const TableTransactionItem = (
    { transaction, idx, onDelete }: { transaction: TransactionHistoryResponseItem, idx: number, onDelete: () => void }
) => {
    return (
        <tr className='text-center border border-gold-500 w-full'>
            <td className='border-r-1 border-gold-500'>{idx}</td>
            <td className='border-r-1 border-gold-500'>{transaction.user.name}</td>
            <td className='border-r-1 border-gold-500 p-1'>
                <div className='w-full flex flex-col gap-y-2'>
                    {
                        transaction.items.slice(0, 5).map((item, idx: number) => (
                            <p className="leading-none" key={idx}>{item.product?.name}</p>
                        ))
                    }
                    {
                        transaction.items.length > 5 && (
                            <p className="text-gold-800 font-bold">+{transaction.items.length - 5} lainnya</p>
                        )
                    }
                </div>
            </td>
            <td className='border-r-1 border-gold-500 p-1'>
                {dateFormatter(transaction.createdAt)}
            </td>
            <td className='w-[10rem] border-r-1 border-gold-500'>
                {{
                    COMPLETED: "Selesai",
                    CANCELED: "Dibatalkan",
                    EXPIRED: "Kedaluwarsa",
                    PAID: "Sudah dibayar"
                }[transaction.status]}
            </td>
            <td className='w-[10rem] p-2'>
                <div className='flex flex-col gap-y-1 px-3'>
                    <Link href={`/dashboard/transaction/${transaction._id}`} className="w-full">
                        <Button className='p-1 rounded-md bg-gray-300 hover:bg-gray-700 text-white w-full cursor-pointer'>Detail</Button>
                    </Link>
                    <Button className='w-full p-1 rounded-md bg-error-300 text-red-500 hover:bg-red-500 hover:text-red-300 cursor-pointer' onClick={onDelete}>Hapus</Button>
                </div>
            </td>
        </tr>
    )
}
