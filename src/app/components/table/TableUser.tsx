'use client'

import { UserItemResponse } from "@/types/user-type";
import { TableUserItem } from "./TableUserItem";
import { useState } from "react";
import ModalConfirmDelete from "../modal/ModalConfirmDelete";
import { useDeleteUser } from "@/services/userService";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const TableUser = (
    { users, token, startIndex }: { users: UserItemResponse[], token: string, startIndex: number }
) => {

    const [selectedUser, setSelectedUser] = useState<UserItemResponse | null>(null);
    const queryClient = useQueryClient();
    const router = useRouter();

    const closeModal = () => setSelectedUser(null);
    const openModal = (user: UserItemResponse) => setSelectedUser(user);

    const mutation = useDeleteUser({
        onSuccess: (data) => {
            if (data?.status !== HttpStatusCode.Ok) {
                setSelectedUser(null)
                toast.error(data.message || "Gagal menghapus data pengguna")
            }
            else {
                setSelectedUser(null)
                toast.success("Berhasil menghapus data pengguna", {
                    duration: 1500,
                })
                router.push('/dashboard/user?page=1')
                queryClient.invalidateQueries({ queryKey: ["getUsers"] })
            }
        },
        onError: (error) => {
            setSelectedUser(null)
            toast.error(error.message || "Gagal menghapus data pengguna")
        }
    })
    return (
        <div className="w-full">
            <>
                <table className="w-full">
                    <thead>
                        <tr className='border border-gray-400 bg-gray-100'>
                            <th className='w-[1rem]'>No</th>
                            <th className='w-[15rem]'>Nama</th>
                            <th className='w-[15rem]'>Email</th>
                            <th className='w-[10rem]'>No. Telepon</th>
                            <th className='w-[1rem]'>Role</th>
                            <th className='w-[10rem]'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.length === 0 && (
                                <tr>
                                    <td colSpan={6} >
                                        <div className="flex items-center justify-center w-full min-h-[20rem]">
                                            <p className="text-gray-400 text-lg">Data pegawai tidak dapat ditemukan</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        {
                            users?.map((user: UserItemResponse, idx) => (
                                <TableUserItem
                                    key={`${user._id} - ${idx}`}
                                    idx={startIndex + idx + 1}
                                    user={user}
                                    onDelete={() => openModal(user)}
                                />
                            ))
                        }
                    </tbody>
                </table>
                {
                    selectedUser && (
                        <ModalConfirmDelete isOpen={!!selectedUser} onConfirm={
                            () => {
                                mutation.mutate({ token, id: selectedUser._id ?? "" })
                            }
                        } onCancel={closeModal} message={`Apakah Anda yakin ingin menghapus ${selectedUser.name} sebagai pengguna`} />
                    )
                }
            </>
        </div>
    )
}