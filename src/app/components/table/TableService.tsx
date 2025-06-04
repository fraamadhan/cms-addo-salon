'use client'

import { useDeleteService } from "@/services/serviceProductService";
import { ServiceResponseItem } from "@/types/service-type"
import { HttpStatusCode } from "axios";
import { useState } from "react"
import { toast } from "sonner";
import ModalConfirmDelete from "../modal/ModalConfirmDelete";
import { TableServiceItem } from "./TableServiceItem";
import { useQueryClient } from "@tanstack/react-query";

export const TableService = (
    { services, token, startIndex }: { services: ServiceResponseItem[], token: string, startIndex: number }
) => {
    const [selectedService, setSelectedService] = useState<ServiceResponseItem | null>(null);
    const queryClient = useQueryClient();
    const closeModal = () => setSelectedService(null);
    const openModal = (service: ServiceResponseItem) => setSelectedService(service);

    const mutation = useDeleteService({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Ok) {
                setSelectedService(null);
                toast.error(data.message || data.message[0] || "Gagal menghapus data layanan");
                return;
            }
            else {
                setSelectedService(null);
                toast.success('Berhasil menghapus data layanan', {
                    duration: 1500
                });
                queryClient.invalidateQueries({ queryKey: ['getServices'] })
                return;
            }
        },
        onError: (error) => {
            setSelectedService(null);
            toast.error(error.message || "Gagal menghapus data pengguna");
            return;
        }
    })

    return (
        <div className="w-full">
            <>
                <table className="w-full">
                    <thead>
                        <tr className='border border-gray-400 bg-gray-100'>
                            <th className='w-[1rem]'>No</th>
                            <th className='w-[15rem]'>Nama Layanan</th>
                            <th className='w-[15rem]'>Deskripsi</th>
                            <th className='w-[10rem]'>Harga</th>
                            <th className='w-[1rem]'>Estimasi</th>
                            <th className='w-[10rem]'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services?.map((service: ServiceResponseItem, idx: number) => (
                                <TableServiceItem key={`${service._id} - ${startIndex + idx + 1}`} onDelete={() => openModal(service)} service={service} idx={startIndex + idx + 1} />
                            ))
                        }
                    </tbody>
                </table>
                {
                    selectedService && (
                        <ModalConfirmDelete isOpen={!!selectedService} onConfirm={() => mutation.mutate({ token, id: selectedService._id })} onCancel={closeModal} message={`Apakah anda yakin akan menghapus layanan ${selectedService.name}?`} />
                    )
                }
            </>
        </div>
    )
}
