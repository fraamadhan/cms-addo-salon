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

export const UserGeneralInformationSkeleton = () => {
    return (
        <section className="flex flex-col w-full gap-y-7">
            <div className="w-full flex flex-col p-7 border shadow-xl rounded-xl gap-y-3 animate-pulse">
                {/* Image Skeleton */}
                <div className="flex flex-col items-center justify-center w-full gap-y-4">
                    <div className="w-48 h-48 rounded-full bg-gray-300" />
                    <div className="w-32 h-10 rounded-md bg-gray-300" />
                </div>

                {/* Input Skeletons */}
                {Array(9).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-3">
                            <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                            <div className="w-[18rem] h-10 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}

                {/* Action Buttons Skeleton */}
                <div className="flex justify-end gap-2 mt-3 w-full">
                    <div className="w-[15rem] h-10 bg-gray-300 rounded" />
                    <div className="w-[15rem] h-10 bg-gray-300 rounded" />
                </div>
            </div>
        </section>
    );
};

export const PasswordSectionSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-4 p-7 border rounded-xl shadow-xl animate-pulse">
            {/* Password field */}
            <div className="flex items-center justify-between gap-x-3">
                <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                <div className="flex gap-x-2 items-center">
                    <div className="w-[18rem] h-10 bg-gray-200 rounded" />
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* Confirm password field */}
            <div className="flex items-center justify-between gap-x-3">
                <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                <div className="flex gap-x-2 items-center">
                    <div className="w-[18rem] h-10 bg-gray-200 rounded" />
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3 w-full">
                <div className="w-[15rem] h-10 bg-gray-300 rounded" />
                <div className="w-[15rem] h-10 bg-gray-300 rounded" />
            </div>
        </div>
    );
};