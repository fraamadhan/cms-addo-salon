export const FormEmployeeSkeleton = () => {
    return (
        <div className="max-w-[30rem] flex flex-col gap-y-5 animate-pulse">
            {[...Array(3)].map((_, i) => (
                <div className="flex flex-col" key={i}>
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
                    <div className="h-10 bg-gray-200 rounded" />
                </div>
            ))}

            <div className="flex flex-col w-full md:w-[16rem] lg:w-[18rem] rounded-xl">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
                <div className="h-10 bg-gray-200 rounded" />
            </div>

            <div className="flex justify-end gap-2 mt-3 w-full">
                <div className="w-[15rem] h-10 bg-gray-300 rounded" />
                <div className="w-[15rem] h-10 bg-gray-400 rounded" />
            </div>
        </div>
    );
};