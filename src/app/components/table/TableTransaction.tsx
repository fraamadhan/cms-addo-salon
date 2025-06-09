import { TransactionHistoryResponseItem } from "@/types/transaction-type"
import { TableTransactionItem } from "./TableTransactionItem"

export const TableTransaction = (
    { transactions, startIndex }: { transactions: TransactionHistoryResponseItem[], startIndex: number }
) => {
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <tr className='border border-gray-400 bg-gray-100'>
                        <th className='w-[1rem]'>No</th>
                        <th className='w-[15rem]'>Nama Pelanggan</th>
                        <th className='w-[15rem]'>Layanan</th>
                        <th className='w-[10rem]'>Tanggal Transaksi</th>
                        <th className='w-[1rem]'>Status</th>
                        <th className='w-[10rem]'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions?.length === 0 && (
                            <tr>
                                <td colSpan={6} >
                                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                                        <p className="text-gray-400 text-lg">Data transaksi tidak dapat ditemukan</p>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    {
                        transactions?.map((transaction: TransactionHistoryResponseItem, idx: number) => (
                            <TableTransactionItem key={`${transaction._id} - ${startIndex + idx + 1}`} transaction={transaction} idx={startIndex + idx + 1} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
