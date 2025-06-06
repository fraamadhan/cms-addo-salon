import { TransactionResponseItem } from "@/types/transaction-type"
import { TableOrderItem } from "./TableOrderItem"

export const TableOrder = (
    { orders, startIndex }: { orders: TransactionResponseItem[], startIndex: number }
) => {
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <tr className='border border-gray-400 bg-gray-100'>
                        <th className='w-[1rem]'>No</th>
                        <th className='w-[15rem]'>Kode Pesanan</th>
                        <th className='w-[15rem]'>Nama Pelanggan</th>
                        <th className='w-[10rem]'>Jadwal Pesanan</th>
                        <th className='w-[1rem]'>Status</th>
                        <th className='w-[10rem]'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map((order: TransactionResponseItem, idx: number) => (
                            <TableOrderItem key={`${order._id} - ${startIndex + idx + 1}`} order={order} idx={startIndex + idx + 1} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
