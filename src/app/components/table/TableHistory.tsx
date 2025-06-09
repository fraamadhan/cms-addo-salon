import { HistoryItem } from "@/types/transaction-type"
import { TableHistoryItem } from "./TableHistoryItem"

export const TableHistory = (
    { items }: { items: HistoryItem[] }
) => {
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <tr className='border border-gray-400 bg-gray-100'>
                        <th className='w-[15rem]'>Nama Layanan</th>
                        <th className='w-[15rem]'>Catatan</th>
                        <th className='w-[8rem]'>Harga</th>
                        <th className='w-[10rem]'>Status</th>
                        <th className='w-[15rem]'>Jadwal Pesanan</th>
                        <th className='w-[15rem]'>Pegawai</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items?.length === 0 && (
                            <tr>
                                <td colSpan={6} >
                                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                                        <p className="text-gray-400 text-lg">Data item tidak dapat ditemukan</p>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    {
                        items?.map((item: HistoryItem) => (
                            <TableHistoryItem key={`${item._id} `} item={item} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
