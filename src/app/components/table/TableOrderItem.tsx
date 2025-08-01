import Link from "next/link"
import Button from "../button/Button"
import { TransactionResponseItem } from "@/types/transaction-type"
import { dateFormatter } from "@/lib/general"

export const TableOrderItem = (
    { order, idx, onDelete, }: { order: TransactionResponseItem, idx: number, onDelete: () => void }
) => {
    console.log(order)
    return (
        <tr className='text-center border border-gold-500 w-full'>
            <td className='border-r-1 border-gold-500'>{idx}</td>
            <td className='border-r-1 border-gold-500'>{order.transaction.orderCode ?? "Belum ditentukan"}</td>
            <td className='border-r-1 border-gold-500 p-1'>
                <div className='w-full line-clamp-5'>
                    {order.user.name}
                </div>
            </td>
            <td className='border-r-1 border-gold-500'>{dateFormatter(order.reservationDate)}</td>
            <td className='border-r-1 border-gold-500'>{order?.employee?.name ?? "Belum ditentukan"}</td>
            <td className='w-[10rem] border-r-1 border-gold-500'>
                {{
                    IN_PROGRESS: "Sedang Berlangsung",
                    PENDING: "Ditunda",
                    SCHEDULED: "Terjadwal",
                    UNPAID: "Belum dibayar"
                }[order.serviceStatus]}
            </td>
            <td className='w-[10rem] p-2'>
                <div className='flex flex-col gap-y-1 px-3'>
                    <Link href={`/dashboard/order/${order._id}`} className="w-full">
                        <Button className='p-1 rounded-md bg-gray-300 hover:bg-gray-700 text-white w-full cursor-pointer'>Detail</Button>
                    </Link>
                    <Button className='w-full p-1 rounded-md bg-error-300 text-red-500 hover:bg-red-500 hover:text-red-300 cursor-pointer' onClick={onDelete}>Hapus</Button>
                </div>
            </td>
        </tr>
    )
}
