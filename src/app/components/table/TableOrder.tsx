'use client'

import { TransactionResponseItem } from "@/types/transaction-type"
import { TableOrderItem } from "./TableOrderItem"
import { useDeleteTransaction } from "@/services/transactionService";
import { useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import ModalConfirmDelete from "../modal/ModalConfirmDelete";

export const TableOrder = (
    { orders, token, startIndex }: { orders: TransactionResponseItem[], token: string, startIndex: number }
) => {

    const [selectedOrder, setSelectedOrder] = useState<TransactionResponseItem | null>(null);
    const queryClient = useQueryClient();
    const closeModal = () => setSelectedOrder(null);
    const openModal = (order: TransactionResponseItem) => setSelectedOrder(order);

    const mutation = useDeleteTransaction({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Ok) {
                setSelectedOrder(null);
                toast.error(data.message || data.message[0] || "Gagal menghapus data pesanan");
                return;
            }
            else {
                setSelectedOrder(null);
                toast.success('Berhasil menghapus data pesanan', {
                    duration: 1500
                });
                queryClient.invalidateQueries({ queryKey: ['getOrders'] })
                return;
            }
        },
        onError: (error) => {
            setSelectedOrder(null);
            toast.error(error.message || "Gagal menghapus data pesanan");
            return;
        }
    })

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
                        orders?.length === 0 && (
                            <tr>
                                <td colSpan={6} >
                                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                                        <p className="text-gray-400 text-lg">Data pesanan tidak dapat ditemukan</p>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    {
                        orders?.map((order: TransactionResponseItem, idx: number) => (
                            <TableOrderItem key={`${order._id} - ${startIndex + idx + 1}`} order={order} idx={startIndex + idx + 1} onDelete={() => openModal(order)} />
                        ))
                    }
                </tbody>
            </table>
            {
                selectedOrder && (
                    <ModalConfirmDelete isOpen={!!selectedOrder} onConfirm={() => mutation.mutate({ token, id: selectedOrder._id, queryParams: { type: "payment", transactionId: selectedOrder?.transactionId } })} onCancel={closeModal} message={`Apakah anda yakin akan menghapus transaksi ini?`} />
                )
            }
        </div>
    )
}
