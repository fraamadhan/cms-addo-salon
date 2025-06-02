export const DashboardContentSkeleton = () => {
    return (
        <>
            <div className="w-full grid grid-cols-3 gap-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="p-2 w-full bg-white shadow-md shadow-gray-600 rounded-lg border border-gold-500 ring-2 ring-gold-500 mt-7 animate-pulse"
                    >
                        <div className="w-full flex flex-col items-center justify-center gap-y-4">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full grid grid-cols-2 mt-8">
                <div className="w-full flex flex-col gap-y-4 border p-5 rounded-md border-gold-500 ring-1 ring-gold-500 animate-pulse">
                    {/* Simulated filter placeholder */}
                    <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
                    <div className="flex gap-x-3">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="h-8 w-20 bg-gray-300 rounded-md"></div>
                        ))}
                    </div>

                    <div className="p-2 w-full bg-white shadow-md shadow-gray-600 rounded-lg border border-gold-500 ring-2 ring-gold-500 mt-2">
                        <div className="w-full flex flex-col items-center justify-center gap-y-4">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
