export const TableEmployeeSkeleton = () => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
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
                    Array.from({ length: 5 }).map((_, idx) => (
                        <tr key={idx} className='text-center border border-gold-500 animate-pulse'>
                            <td className='border-r-1 border-gold-500'>
                                <div className="h-4 w-4 mx-auto bg-gray-300 rounded" />
                            </td>
                            <td className='border-r-1 border-gold-500'>
                                <div className="h-4 w-24 mx-auto bg-gray-300 rounded" />
                            </td>
                            <td className='border-r-1 border-gold-500'>
                                <div className="h-4 w-32 mx-auto bg-gray-300 rounded" />
                            </td>
                            <td className='border-r-1 border-gold-500'>
                                <div className="h-4 w-24 mx-auto bg-gray-300 rounded" />
                            </td>
                            <td className='border-r-1 border-gold-500'>
                                <div className="h-4 w-24 mx-auto bg-gray-300 rounded" />
                            </td>
                            <td className='p-2'>
                                <div className='flex flex-col gap-y-2 items-center'>
                                    <div className="h-6 w-16 bg-gray-300 rounded" />
                                    <div className="h-6 w-16 bg-gray-300 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
