import { TransactionHistoryResponseItem } from "@/types/transaction-type"
import { TableTransactionItem } from "./TableTransactionItem"
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ModalConfirmDelete from "../modal/ModalConfirmDelete";
import { useDeleteTransaction } from "@/services/transactionService";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

export const TableTransaction = (
    { transactions, token, startIndex }: { transactions: TransactionHistoryResponseItem[], token: string, startIndex: number }
) => {
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionHistoryResponseItem | null>(null);
    const queryClient = useQueryClient();
    const closeModal = () => setSelectedTransaction(null);
    const openModal = (transaction: TransactionHistoryResponseItem) => setSelectedTransaction(transaction);

    const mutation = useDeleteTransaction({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Ok) {
                setSelectedTransaction(null);
                toast.error(data.message || data.message[0] || "Gagal menghapus data transaksi");
                return;
            }
            else {
                setSelectedTransaction(null);
                toast.success('Berhasil menghapus data transaksi', {
                    duration: 1500
                });
                queryClient.invalidateQueries({ queryKey: ['getTransactions'] })
                return;
            }
        },
        onError: (error) => {
            setSelectedTransaction(null);
            toast.error(error.message || "Gagal menghapus data transaksi");
            return;
        }
    })
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
                            <TableTransactionItem key={`${transaction._id} - ${startIndex + idx + 1}`} transaction={transaction} idx={startIndex + idx + 1} onDelete={() => openModal(transaction)} />
                        ))
                    }
                </tbody>
            </table>

            {
                selectedTransaction && (
                    <ModalConfirmDelete isOpen={!!selectedTransaction} onConfirm={() => mutation.mutate({ token, id: selectedTransaction._id, queryParams: { type: "transaction" } })} onCancel={closeModal} message={`Apakah anda yakin akan menghapus transaksi ini?`} />
                )
            }
        </div>
    )
}
