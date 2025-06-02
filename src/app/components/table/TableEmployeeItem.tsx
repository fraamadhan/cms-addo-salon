'use client'

import Link from "next/link"
import Button from "../button/Button"
import { EmployeeItemResponse } from "@/types/employee-type"

export const TableEmployeeItem = ({ employee, idx, onDelete }: { employee: EmployeeItemResponse, idx: number, onDelete: () => void }) => {

    return (
        <tr className='text-center border border-gold-500 w-full'>
            <td className='border-r-1 border-gold-500'>{idx}</td>
            <td className='border-r-1 border-gold-500'>{employee?.name}</td>
            <td className='border-r-1 border-gold-500'>{employee?.email}</td>
            <td className='border-r-1 border-gold-500'>{employee?.phoneNumber}</td>
            <td className='w-[10rem] border-r-1 border-gold-500'>{employee?.availability === 0 ? "Tidak tersedia" : "Tersedia"} </td>
            <td className='w-[10rem] p-2'>
                <div className='flex flex-col gap-y-1 px-3'>
                    <Link href={`/dashboard/employee/${employee._id}`} className="w-full">
                        <Button className='p-1 rounded-md bg-blue-300 text-blue-500 hover:bg-blue-500 hover:text-blue-300 w-full cursor-pointer'>Ubah</Button></Link>
                    <Button className='w-full p-1 rounded-md bg-error-300 text-red-500 hover:bg-red-500 hover:text-red-300 cursor-pointer' onClick={onDelete}>Hapus</Button>
                </div>
            </td>
        </tr>
    )
}
