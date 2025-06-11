import { dateFormatter, rupiahFormatter } from "@/lib/general"
import { HistoryItem } from "@/types/transaction-type"

export const TableHistoryItem = (
    { item }: { item: HistoryItem }
) => {
    return (
        <tr className='text-center border border-gold-500 w-full'>
            <td className='border-r-1 border-gold-500 p-1'>{item?.product?.name}</td>
            <td className='border-r-1 border-gold-500 p-1'>{item?.note || "-"}</td>
            <td className='border-r-1 border-gold-500 p-1'>{rupiahFormatter(item?.price)}</td>
            <td className='border-r-1 border-gold-500 p-1'>
                {{
                    COMPLETED: "Selesai",
                    CANCELED: "Dibatalkan",
                    SCHEDULED: "Terjadwal",
                    EXPIRED: "Kedaluwarsa",
                    PAID: "Sudah dibayar",
                    IN_PROGRESS: "Sedang berlangsung"
                }[item?.serviceStatus]}
            </td>
            <td className='w-[10rem] border-r-1 border-gold-500 p-1'>{dateFormatter(item?.reservationDate)}</td>
            <td className='w-[10rem] border-r-1 border-gold-500 p-1'>{item?.employee?.name ?? "-"}</td>
        </tr>
    )
}
