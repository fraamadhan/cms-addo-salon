import { UserItemResponse } from "@/types/user-type";
import Link from "next/link";
import Button from "../button/Button";

export const TableUserItem = (
    { user, idx, onDelete }: { user: UserItemResponse | null, idx: number, onDelete: () => void }
) => {
    return (
        <tr className='text-center border border-gold-500 w-full'>
            <td className='border-r-1 border-gold-500'>{idx}</td>
            <td className='border-r-1 border-gold-500'>{user?.name}</td>
            <td className='border-r-1 border-gold-500'>{user?.email}</td>
            <td className='border-r-1 border-gold-500'>{user?.phone_number}</td>
            <td className='w-[10rem] border-r-1 border-gold-500'>{user?.role}</td>
            <td className='w-[10rem] p-2'>
                <div className='flex flex-col gap-y-1 px-3'>
                    <Link href={`/dashboard/user/${user?._id}`} className="w-full">
                        <Button className='p-1 rounded-md bg-blue-300 text-blue-500 hover:bg-blue-500 hover:text-blue-300 w-full cursor-pointer'>Ubah</Button></Link>
                    <Button className='w-full p-1 rounded-md bg-error-300 text-red-500 hover:bg-red-500 hover:text-red-300 cursor-pointer' onClick={onDelete}>Hapus</Button>
                </div>
            </td>
        </tr>
    )
}