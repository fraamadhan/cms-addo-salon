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

export const TableUserSkeleton = () => {
    return (
        <div className="w-full">
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
                        Array.from({ length: 5 }).map((_, idx) => (
                            <tr key={idx} className="animate-pulse text-center border border-gold-500 w-full">
                                <td className='border-r-1 border-gold-500'>{idx + 1}</td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-24 bg-gray-300 rounded"></div>
                                </td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-32 bg-gray-300 rounded"></div>
                                </td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-24 bg-gray-300 rounded"></div>
                                </td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-16 bg-gray-300 rounded"></div>
                                </td>
                                <td className='p-2'>
                                    <div className="flex flex-col gap-y-1 px-3">
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export const TableServiceSkeleton = () => {
    return (
        <div className="w-full">
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
                        Array.from({ length: 5 }).map((_, idx) => (
                            <tr key={idx} className="animate-pulse text-center border border-gold-500 w-full">
                                <td className='border-r-1 border-gold-500'>{idx + 1}</td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-24 bg-gray-300 rounded"></div>
                                </td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-32 bg-gray-300 rounded"></div>
                                </td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-24 bg-gray-300 rounded"></div>
                                </td>
                                <td className='border-r-1 border-gold-500'>
                                    <div className="mx-auto h-4 w-16 bg-gray-300 rounded"></div>
                                </td>
                                <td className='p-2'>
                                    <div className="flex flex-col gap-y-1 px-3">
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export const SkeletonTableOrder = ({ rows = 5 }: { rows?: number }) => {
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
                    {Array.from({ length: rows }).map((_, index) => (
                        <tr key={index} className="text-center border border-gold-300 w-full animate-pulse">
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-4 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-24 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-32 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-24 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-16 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-8 w-20 bg-gray-300 mx-auto rounded" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const SkeletonTableTransaction = ({ rows = 5 }: { rows?: number }) => {
    return (
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <tr className='border border-gray-400 bg-gray-100'>
                        <th className='w-[1rem]'>No</th>
                        <th className='w-[15rem]'>Nama Pelanggan</th>
                        <th className='w-[15rem]'>Layanan</th>
                        <th className='w-[10rem]'>Jadwal Pesanan</th>
                        <th className='w-[1rem]'>Status</th>
                        <th className='w-[10rem]'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <tr key={index} className="text-center border border-gold-300 w-full animate-pulse">
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-4 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-24 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-32 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-24 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-4 w-16 bg-gray-300 mx-auto rounded" />
                            </td>
                            <td className="border-r border-gold-300">
                                <div className="h-8 w-20 bg-gray-300 mx-auto rounded" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
