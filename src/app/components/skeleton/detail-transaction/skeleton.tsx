export const TransactionDetailSkeleton = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Status */}
            <section className="w-full p-3 bg-white shadow-lg rounded-xl ring-2 ring-gold-500">
                <div className="p-2 w-[20rem] h-8 bg-gray-200 animate-pulse rounded-xl" />
            </section>

            {/* Form section */}
            <section className="w-full p-3 bg-white shadow-lg rounded-xl ring-2 ring-gold-500 flex flex-col gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="flex items-center max-w-[30rem] gap-4 animate-pulse"
                    >
                        <div className="w-[9rem] h-6 bg-gray-200 rounded-md" />
                        <div className="w-[20rem] h-10 bg-gray-200 rounded-lg" />
                    </div>
                ))}
            </section>

            {/* Table skeleton */}
            <div className="w-full bg-white shadow-lg rounded-xl ring-2 ring-gold-500 p-4">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="border border-gray-400 bg-gray-100">
                            {['Nama Layanan', 'Catatan', 'Harga', 'Status', 'Jadwal Pesanan'].map((header, idx) => (
                                <th key={idx} className="p-2">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <tr key={idx} className="text-center border border-gold-500 animate-pulse">
                                {Array.from({ length: 5 }).map((__, colIdx) => (
                                    <td key={colIdx} className="border-r-1 border-gold-500 p-1">
                                        <div className="h-4 w-full bg-gray-200 rounded" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Price */}
            <section className="w-full flex flex-col gap-4 items-start">
                <div className="w-full flex items-center justify-between font-semibold animate-pulse">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="w-full flex items-center justify-between text-sm animate-pulse">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
                <div className="w-full flex items-center justify-between text-xl font-bold animate-pulse">
                    <div className="h-6 w-40 bg-gray-300 rounded" />
                    <div className="h-6 w-24 bg-gray-300 rounded" />
                </div>
            </section>
        </div>
    );
};
