'use client'

import React, { useState } from 'react'
import { TableEmployeeItem } from './TableEmployeeItem'
import { EmployeeItemResponse } from '@/types/employee-type'
import ModalConfirmDelete from '../modal/ModalConfirmDelete'
import { useDeleteEmployee } from '@/services/employeeService'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

export const TableEmployee = ({ employees, token, startIndex }: { employees: EmployeeItemResponse[], token: string, startIndex: number }) => {

    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeItemResponse | null>(null);

    const closeModal = () => setSelectedEmployee(null);
    const openModal = (employee: EmployeeItemResponse) => setSelectedEmployee(employee);

    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useDeleteEmployee({
        onSuccess: (data) => {
            if (data?.status !== HttpStatusCode.Ok) {
                setSelectedEmployee(null)
                toast.error(data.message || "Gagal menghapus data pegawai")
            }
            else {
                setSelectedEmployee(null)
                toast.success("Berhasil menghapus data pegawai", {
                    duration: 1500,
                })
                router.push('/dashboard/employee?page=1')
                queryClient.invalidateQueries({ queryKey: ["getEmployees"] })
            }
        },
        onError: (error) => {
            setSelectedEmployee(null)
            toast.error(error.message || "Gagal menghapus data pegawai")
        }
    })

    return (
        <div className='w-full'>
            <>
                <table className='w-full'>
                    <thead>
                        <tr className='border border-gray-400 bg-gray-100'>
                            <th className='w-[1rem]'>No</th>
                            <th className='w-[15rem]'>Nama</th>
                            <th className='w-[15rem]'>Email</th>
                            <th className='w-[10rem]'>No. Telepon</th>
                            <th className='w-[1rem]'>Ketersediaan</th>
                            <th className='w-[10rem]'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees?.length === 0 && (
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
                            employees?.map((employee: EmployeeItemResponse, idx) => (
                                <TableEmployeeItem employee={employee} idx={startIndex + idx + 1} key={`${employee._id}-${idx}`} onDelete={() => openModal(employee)} />
                            ))
                        }
                    </tbody>
                </table>

                {
                    selectedEmployee && (
                        <ModalConfirmDelete isOpen={!!selectedEmployee} onConfirm={() => { mutation.mutate({ token, id: selectedEmployee._id ?? "" }) }} onCancel={closeModal} isLoading={mutation.isPending} message={`Apakah anda akan menghapus ${selectedEmployee.name} sebagai pegawai?`} />
                    )
                }
            </>
        </div>
    )
}
